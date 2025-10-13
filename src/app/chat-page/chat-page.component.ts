import { ChangeDetectorRef, Component, ElementRef, ViewChild, OnInit, OnDestroy, inject, DestroyRef } from '@angular/core';
import { Subject, takeUntil, finalize, of, concatMap, Observable, firstValueFrom, async, delay } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
// Services
import { ChatBotService } from '../service/chat-bot.service';
import { GetIdService } from '../service/get-id.service';
import { MenuService } from '../@service/menu.service';
import { DeleteAccountService } from '../@service/delete-account.service';
import { LogService } from '../@service/log.service';
import { GetUUidService } from '../@service/get-uuid.service';
import { BotAPIService } from '../@service/bot-api.service';
// Interfaces
import { IChatBor } from '../@interface/IchatBor';
import { ICreateMenuReq, IGetMenuReq } from '../@InterfaceAPI/IMenu';
import { IGetMsgReq, ISaveMsgReq } from '../@InterfaceAPI/IMsg';
import { IChatMessage, IHistoryItem } from '../@interface/chatPageInterface/IChatPage';
// Components
import { UserInfoDialogComponent } from '../componetDialog/user-info-dialog/user-info-dialog.component';
import { UserInfoService } from '../service/user-info.service';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss'
})
export class ChatPageComponent implements OnInit {
  @ViewChild('sidebar') sidebarRef!: ElementRef<HTMLDivElement>;

  // State management
  private destroy$ = new Subject<void>();
  private userId: string | null | undefined = null;
  private isNewChatInProgress = false;
  private hasUpdatedTitle = false;//標題更新
  private offlineMode = true; // 無後端時啟用離線模式，放寬驗證並建立本地 menuId

  // Public properties
  menuId = '';
  title = '';
  selectedHistoryIndex = -1;
  userInput = '';
  historyItems: IHistoryItem[] = [];
  chatMessagesLists: IChatMessage[] = [];
  isLoading = false;
  isAddButtonDisabled = false; // 控制新增聊天按鈕的禁用狀態
  showAddChatButton = true;

  userName = '';

  constructor(
  ) { }
  private getIdService = inject(GetIdService);
  private menuService = inject(MenuService);
  private logService = inject(LogService);
  private botService = inject(BotAPIService);
  private userInfoService = inject(UserInfoService);
  private dialog = inject(MatDialog);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private deleteService = inject(DeleteAccountService);
  private uuidService = inject(GetUUidService);

  ngOnInit(): void {
    this.initializeComponent();
    this.onGetUserName(); // 獲取使用者名稱
  }

  // Initialization
  private initializeComponent(): void {
    //初始化時可按
    this.isAddButtonDisabled = false;
    const user = this.getIdService.getUser();
    this.userId = this.getIdService.getUserId();

    if (user && this.userId) {
      this.loadMenuHistory();
    } else {
      console.warn('User ID is not available yet.');
    }
  }

  // UI Controls
  toggleSidebar(): void {
    // 行動裝置沿用 active；桌面採用 collapsed 寬度 0 方案
    this.sidebarRef.nativeElement.classList.toggle('active');
    this.sidebarRef.nativeElement.classList.toggle('collapsed');
  }

  closeSidebar(): void {
    this.sidebarRef.nativeElement.classList.remove('active');
  }

  onQuickAskClick(question: string): void {
    this.userInput = question;
  }

  onChatKeyDown(event: KeyboardEvent): void {
    // Shift + Enter 送出
    if (event.key === 'Enter' && event.shiftKey) {
      event.preventDefault();
      this.onSendClick();
    }
  }

  autoResize(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    const maxRows = 4;
    const lineHeight = 20; // 對應 font-size 14px 約略行高
    textarea.style.height = 'auto';
    const maxHeight = maxRows * lineHeight;
    textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + 'px';
    textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden';
  }

  onGetUserName() {
    this.userInfoService.getUserInfo({ userId: this.userId })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          if (res?.isSuccess) {
            console.log('User Name:', res.data.name);
            this.userName = res.data.name || '未設定';
          } else {
            console.warn('Failed to get user name');
          }
        },
        error: (err) => this.handleError('Failed to get user name', err)
      });
  }

  // Chat Management
  onCreateNewChat(): void {
    if (this.isNewChatInProgress || this.isAddButtonDisabled) {
      return;
    }

    this.isAddButtonDisabled = true; // 禁用新增按鈕
    this.showAddChatButton = false; // 點擊後讓按鈕消失
    this.resetChatState();
    this.createNewChatMenu();
  }

  private resetChatState(): void {
    this.chatMessagesLists = [];
    this.selectedHistoryIndex = -1;
    this.title = '';
  }

  private createNewChatMenu(): void {
    // 離線模式：先本地建立 menuId 與歷史項目，允許後續傳送訊息
    if (this.offlineMode) {
      const localMenuId = `local-${Date.now()}`;
      this.menuId = localMenuId;
      this.selectedHistoryIndex = this.historyItems.length;
      this.historyItems.push({
        menuId: localMenuId,
        title: this.title || '新聊天',
        createtime: this.formatTime(new Date().toISOString())
      });
      return;
    }

    if (!this.userId) {
      console.error('User ID is required to create new chat');
      return;
    }

    this.isNewChatInProgress = true;
    const createMenuReq: ICreateMenuReq = {
      userId: this.userId,
      title: '新聊天',
      createTime: new Date().toISOString()
    };
    this.title = createMenuReq.title;

    this.menuService.createMenuAPI(createMenuReq)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.isNewChatInProgress = false)
      )
      .subscribe({
        next: (res) => this.handleCreateMenuSuccess(res, createMenuReq),
        error: (err) => this.handleError('創建新聊天失敗', err)
      });
  }

  private handleCreateMenuSuccess(res: any, createMenuReq: ICreateMenuReq): void {
    if (res?.isSuccess) {
      this.menuId = res.data.menuId;
      this.selectedHistoryIndex = this.historyItems.length;

      this.historyItems.push({
        menuId: res.data.menuId,
        title: this.title || '新聊天',
        createtime: this.formatTime(createMenuReq.createTime)
      });

      console.log('新聊天已成功創建:', this.menuId);
    } else {
      console.warn('創建聊天失敗: 回傳資料格式錯誤');
    }
  }

  // History Management
  onHistoryClick(index: number): void {
    if (index < 0 || index >= this.historyItems.length) {
      return;
    }

    this.selectedHistoryIndex = index;
    const selectedItem = this.historyItems[index];
    this.title = selectedItem.title;
    this.menuId = selectedItem.menuId;

    this.loadChatMessages(selectedItem.menuId);
    //點選歷史紀錄後允許再次新增聊天
    this.isAddButtonDisabled = false;
    // 點擊後讓大按鈕消失
    this.showAddChatButton = false;
    console.log('選擇的歷史紀錄:', this.isAddButtonDisabled);
  }

  private loadChatMessages(menuId: string): void {
    if (!this.userId) {
      console.error('User ID is required to load messages');
      return;
    }

    const getMsgReq: IGetMsgReq = { userId: this.userId, menuId };

    this.logService.getLogAPI(getMsgReq)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => this.handleLoadMessagesSuccess(res),
        error: (err) => this.handleError('載入聊天記錄失敗', err)
      });
  }

  private handleLoadMessagesSuccess(res: any): void {
    if (res?.isSuccess && Array.isArray(res.data)) {
      this.chatMessagesLists = res.data.map((item: { msgType: any; msg: any; createTime: string; }) => ({
        type: item.msgType ? '1' : '0',
        msg: item.msg,
        createTime: this.formatTime(item.createTime)
      }));
    } else {
      console.warn('載入聊天記錄失敗: 回傳資料格式錯誤');
    }
  }

  private loadMenuHistory(): void {
    if (!this.userId) {
      console.error('User ID is required to load menu history');
      return;
    }

    const userId: IGetMenuReq = { userId: this.userId };

    this.menuService.getMentAPI(userId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => this.handleLoadMenuHistorySuccess(res),
        error: (err) => this.handleError('載入選單歷史失敗', err)
      });
  }

  private handleLoadMenuHistorySuccess(res: any): void {
    if (res?.isSuccess && Array.isArray(res.data)) {
      this.historyItems = res.data.map((item: any) => ({
        menuId: item.menuId,
        title: item.title,
        createtime: this.formatTime(item.createTime)
      }));

      console.log('歷史紀錄已載入:', this.historyItems);
    } else {
      console.warn('載入選單歷史失敗: 回傳資料格式錯誤');
    }
  }

  // Message Handling
  onSendClick(): void {
    if (!this.userInput.trim() || this.isLoading) {
      return;
    }

    if (!this.validateChatState()) {
      return;
    }

    this.isLoading = true;
    const isFirstMessage = !this.hasUpdatedTitle;// 是否為第一次發送訊息
    this.sendMessage(isFirstMessage);
  }

  private validateChatState(): boolean {
    if (this.offlineMode) {
      return true;
    }
    if (!this.userId) {
      console.error('User ID is required to send message');
      return false;
    }

    if (!this.menuId) {
      this.setMenuIdFromHistory();

      if (!this.menuId) {
        console.error('找不到可用的 menuId，請確認是否已建立聊天');
        return false;
      }
    }

    return true;
  }

  private setMenuIdFromHistory(): void {
    if (this.selectedHistoryIndex >= 0 && this.historyItems[this.selectedHistoryIndex]) {
      const selectedItem = this.historyItems[this.selectedHistoryIndex];
      this.menuId = selectedItem.menuId;
      this.title = selectedItem.title;
    } else if (this.historyItems.length > 0) {
      const lastItem = this.historyItems[this.historyItems.length - 1];
      this.menuId = lastItem.menuId;
      this.title = lastItem.title;
    }
  }

  private sendMessage(isFirstMessage: boolean): void {
    if (!this.menuId) {
      console.error('尚未完成建立聊天，請稍候再試');
      this.isLoading = false;
      return;
    }
    const userMessage = this.userInput.trim();
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Add user message to chat immediately
    this.chatMessagesLists.push({
      type: '1',
      msg: userMessage,
      createTime: timestamp
    });

    // Save user message

    if (isFirstMessage) {
      this.botService.chatTitle({ msg: userMessage })
        .pipe(
          timeout(10000), // 10 秒逾時
          catchError(() => of({ isSuccess: true, data: { title: '新聊天' }, isFallback: true })),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe({
          next: (res) => {
            if (res?.isSuccess) {
              this.title = res.data.title; // 更新標題
              //this.hasUpdatedTitle = true; // 標記已更新標題
              // this.hasUpdatedTitle = false;

              this.updateMenuTitle(this.title, this.menuId);

              const index = this.selectedHistoryIndex;
              if (index >= 0 && index < this.historyItems.length) {
                this.historyItems[index].title = res.data.title; // 更新歷史紀錄中的標題
              }
              this.getBotResponse(userMessage); // 獲取機器人回應
            }

          },
          error: (err) => {
            this.handleError('更新標題失敗', err);
            this.getBotResponse(userMessage); // 即使更新標題失敗，也繼續獲取機器人回應
          }
        });
    } else {
      // Get bot response
      this.getBotResponse(userMessage);
    }


    // Clear input
    this.userInput = '';

    //啟用新增按鈕
    this.isAddButtonDisabled = false;
  }

  private updateMenuTitle(title: string, menuId: string): void {
    const updateReq = { title, menuId };
    this.menuService.updateMenuTitle(updateReq)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          if (res?.isSuccess) {
            console.log('標題已成功更新:', title);
          } else {
            console.warn('更新標題失敗: 回傳資料格式錯誤');
          }
        },
        error: (err) => this.handleError('更新標題失敗', err)
      });
  }

  // private async getBotResponse(userMessage: string):Promise< void> {
  //   this.botService.chatBot({ msg: userMessage })
  //     .pipe(
  //       finalize(() => this.isLoading = false),
  //       takeUntilDestroyed(this.destroyRef)
  //     )
  //     .subscribe({
  //       next: (res) => {
  //         console.log('機器人回應:', res);
  //         if (res?.isSuccess) {
  //           this.handleBotResponse(res);

  //         // 使用 concatMap 保證先後順序
  //         await firstValueFrom(this.saveMessage(userMessage, true));

  //     // 儲存機器人回覆（會再生成新的前端時間）
  //     await firstValueFrom(this.saveMessage(res.data.answer, false));

  //         // of(userMessage).pipe(
  //         //   concatMap(async (msg) => this.saveMessage(msg, true)),  // 儲存使用者訊息
  //         //   concatMap(async () => this.saveMessage(res.data.answer, false)) // 儲存機器人回覆
  //         // ).subscribe({
  //         //   next: () => console.log('訊息儲存完成'),
  //         //   error: err => console.error('儲存訊息失敗', err)
  //         // });
  //         } else {
  //           console.warn('機器人回應格式錯誤');
  //         }
  //       },
  //       error: (err) => this.handleError('獲取機器人回應失敗', err)
  //     });
  // }
  private async getBotResponse(userMessage: string): Promise<void> {
    this.isLoading = true;
    try {
      const TIMEOUT_MS = 15000; // 15 秒逾時
      const FALLBACK_RESPONSE = '目前系統繁忙，已提供暫時回覆。請稍後再試。';

      const res = await firstValueFrom(
        this.botService.chatBot({ msg: userMessage }).pipe(
          timeout(TIMEOUT_MS),
          catchError((err) => {
            // 逾時或網路異常時回傳預設回覆
            return of({ isSuccess: true, data: { answer: FALLBACK_RESPONSE }, isFallback: true });
          }),
          takeUntilDestroyed(this.destroyRef)
        )
      );

      console.log('機器人回應:', res);

      if (res?.isSuccess) {
        this.handleBotResponse(res);

        // 儲存使用者訊息
        await firstValueFrom(this.saveMessage(userMessage, true));
        delay(1000);
        // 儲存機器人訊息
        await firstValueFrom(this.saveMessage(res.data.answer, false));

        console.log('訊息儲存完成');
      } else {
        console.warn('機器人回應格式錯誤');
      }

    } catch (err) {
      this.handleError('獲取機器人回應失敗', err);
    } finally {
      this.isLoading = false;
    }
  }


  private handleBotResponse(res: any): void {
    if (res.isSuccess) {
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      this.chatMessagesLists.push({
        type: '0',
        msg: res.data.answer,
        createTime: timestamp
      });

      // Save bot message
    } else {
      console.warn('機器人回應格式錯誤');
    }
  }

  private saveMessage(message: string, isUser: boolean) {
    // 離線模式或沒有 userId 時，不儲存到後端
    if (this.offlineMode || !this.userId) {
      console.log('離線模式：訊息不儲存到後端', { message, isUser });
      return of({ isSuccess: true, message: '離線模式，訊息未儲存' });
    }

    const saveMsgReq: ISaveMsgReq = {
      userId: this.userId,
      menuId: this.menuId,
      createTime: new Date().toISOString(),
      msg: message,
      msgType: isUser
    };

    return this.logService.saveLogAPI(saveMsgReq)
      .pipe(takeUntilDestroyed(this.destroyRef)
      );
  }

  // Utility Methods
  private formatTime(isoString: string): string {
    const date = new Date(isoString);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    return `${y}/${m}/${d} ${hh}:${mm}`;
  }

  private handleError(message: string, error: any): void {
    console.error(`${message}:`, error);
    // Here you could add user-friendly error handling like toast notifications
  }

  // Dialog Methods
  onTestDelete(): void {
    this.dialog.open(UserInfoDialogComponent, {
      width: '400px',
      disableClose: true
    });
  }
  toISOString2Digits(date: Date): string {
    const iso = date.toISOString(); // 例如 "2025-09-02T12:53:09.920Z"
    return iso.replace(/\.(\d{2})\dZ$/, '.$1'); // 保留小數點後 2 位
  }
}

