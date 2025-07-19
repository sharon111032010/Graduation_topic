
// import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
// import { delay, filter, fromEvent, of, tap } from 'rxjs';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { MatIconModule } from '@angular/material/icon';
// import { ChatBotService } from '../service/chat-bot.service';
// import { IChatBor } from '../@interface/IchatBor';
// import { Router } from '@angular/router';
// import { GetIdService } from '../service/get-id.service';
// import { MenuService } from '../@service/menu.service';
// import { ICreateMenuReq, IGetMenuReq } from '../@InterfaceAPI/IMenu';
// import { DeleteAccountService } from '../@service/delete-account.service';
// import { Dialog } from '@angular/cdk/dialog';
// import { MatDialog } from '@angular/material/dialog';
// import { UserInfoDialogComponent } from '../componetDialog/user-info-dialog/user-info-dialog.component';
// import { LogService } from '../@service/log.service';
// import { IGetMsgReq, ISaveMsgDataRes, ISaveMsgReq } from '../@InterfaceAPI/IMsg';
// import { ChatTestLocalService } from '../service/chat-test-local.service';
// import { IChatMessage, IHistoryItem } from '../@interface/chatPageInterface/IChatPage';
// import { GetUUidService } from '../@service/get-uuid.service';
// import { BotAPIService } from '../@service/bot-api.service';

// @Component({
//   selector: 'app-chat-page',
//   standalone: true,
//   imports: [CommonModule, FormsModule, MatIconModule],
//   templateUrl: './chat-page.component.html',
//   styleUrl: './chat-page.component.scss'
// })
// export class ChatPageComponent {
//   [x: string]: any;
//   // account: string | null = null;

//   // @ViewChild('chatMessages') chatMessagesRef!: ElementRef<HTMLDivElement>;
//   @ViewChild('sidebar') sidebarRef!: ElementRef<HTMLDivElement>;

//   menuId = '';


//   historyItems: IHistoryItem[] = [
//   ];
//   title = "";

//   selectedHistoryIndex = 0;


//   chatMessagesLists: IChatMessage[] = [
//   ];
//   userInput = '';
//   chatRequest: IChatBor = {
//     ID: 'A12345', // 這裡應該填入真實的使用者 ID
//     msg: this.userInput
//   };

//   constructor(
//     private chatBotService: ChatBotService,
//     private router: Router,
//     public getIdService: GetIdService, // 假設有一個 UserService 用於獲取用戶信息
//     public MenuService: MenuService,
//     public DeleteService: DeleteAccountService,// 假設有一個 DeleteService 用於刪除操作
//     public getMsgService: LogService, // 假設有一個 GetMsgService 用於獲取對話紀錄
//     public createMsgService: LogService,
//     public CreateMenuIdService: GetUUidService,
//     private BotService: BotAPIService, // 假設有一個 ChatBotService 用於聊天機器人功能
//     public dialog: MatDialog,
//     private cdr: ChangeDetectorRef,



//     private chatTestlocalService: ChatTestLocalService // 假設有一個 ChatTestLocalService 用於測試聊天功能
//   ) {
//   }

//   ngOnInit(): void {
//     const user = this.getIdService.getUser();
//     console.log('menuId:', this.menuId);

//     if (user) {
//       this.onInitMenuClick();
//     } else {
//       console.warn('User ID is not available yet.');
//     }
//   }
//   userId: IGetMenuReq = { userId: this.getIdService.getUserId() ?? undefined };

//   ngAfterViewInit(): void {
//     // 可以在這裡做一些初始化或監聽
//   }

//   toggleSidebar(): void {
//     this.sidebarRef.nativeElement.classList.toggle('active');
//   }

//   closeSidebar(): void {
//     this.sidebarRef.nativeElement.classList.remove('active');
//   }

//   onQuickAskClick(question: string): void {
//     this.userInput = question;
//   }

//   newMenuIdIsTrue = false;
//   onCreateNewChat(): void {
//     if (!this.newMenuIdIsTrue) {
//       this.chatMessagesLists = [];
//       // this.menuId = ''; // 清除當前的 menuId
//       this.selectedHistoryIndex = -1; // 重置選擇的歷史紀錄索引
//       const createMenuReq: ICreateMenuReq = {
//         userId: this.userId.userId,
//         title: this.title || '新聊天',
//         createTime: new Date().toISOString()
//       };
//       this.MenuService.createMenuAPI(createMenuReq).subscribe({
//         next: (res) => {
//           console.log('createMenuAPI 回應:', res);
//           if (res?.isSuccess) {
//             this.menuId = res.data.menuId; //API 回傳的資料包含 menuId
//             this.newMenuIdIsTrue = true;
//             this.selectedHistoryIndex = this.historyItems.length; // 選擇新創建的聊天

//             // 新創建的聊天插入歷史紀錄最上面
//             this.historyItems.push({
//               menuId: res.data.menuId,
//               title: this.title || '新聊天',
//               createtime: new Date(createMenuReq.createTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//             });

//             console.log('新聊天的 menuId:', this.menuId);
//             console.log('新聊天的 title:', this.title);
//             console.log('新聊天的 createTime:', createMenuReq.createTime);
//             console.log('新聊天已成功創建');
//             // 更新 title 
//             //呼叫 getMenuId 來獲取新創建
//             // 如果有用 unshift，就可以不用再 call onInitMenuClick()
//             // this.onInitMenuClick();

//           } else {
//             console.warn('createMenuAPI 回傳資料格式錯誤或無資料');
//           }
//         },
//         error: (err) => {
//           console.error('createMenuAPI 錯誤:', err);
//         }
//       });
//       return; // 如果有新聊天正在進行，則不再創建新聊天
//     }
//     //this.newMenuIdIsTrue = false; // 重置新聊天創建狀態




//     /*
//     this.CreateMenuIdService.getMenuId().subscribe({
//       next: res => {
//         if (res.isSuccess) {
//           this.newMenuId = res.data.uuId;
//         }
//         console.log("get uuid", this.newMenuId);
//       },
//       error: err => {
//         console.error('Failed to get UUID:', err);
//       }
//     })
//     */

//   }

//   // 要接 menu API
//   onHistoryClick(index: number): void {
//     this.selectedHistoryIndex = index;
//     this.title = this.historyItems[index].title;
//     const selectedMessage = this.historyItems[index];
//     this.menuId = selectedMessage.menuId;
//     const userId = this.getIdService.getUserId();
//     const getMsgReq: IGetMsgReq = { userId: userId, menuId: this.menuId };
//     this.getMsgService.getLogAPI(getMsgReq).subscribe({
//       next: (res) => {
//         console.log('getMsgAPI 回應:', res);
//         console.log('data:', res.data);
//         if (res?.isSuccess && Array.isArray(res.data)) {
//           this.chatMessagesLists = res.data.map(item => ({
//             type: item.msgType ? '1' : '0',  // true 為使用者, false 為系統
//             msg: item.msg,
//             createTime: this.formatTime(item.createTime)  // 選擇格式化時間
//           }));
//         } else {
//           console.warn('getMsgAPI 回傳資料格式錯誤或無資料');
//         }
//       },
//       error: (err) => {
//         console.error('getMsgAPI 錯誤:', err);
//       }
//     }
//     );
//   }
//   private formatTime(isoString: string): string {
//     const date = new Date(isoString);
//     return date.toTimeString().slice(0, 5);  // e.g. "15:41"
//   }

//   onInitMenuClick(): void {
//     console.log('onInitMenuClick 被呼叫');
//     console.log('userId:', this.userId);

//     if (!this.userId) {
//       console.error('userId 為 null，無法呼叫 getMentAPI');
//       return;
//     }

//     this.MenuService.getMentAPI(this.userId).subscribe(
//       res => {
//         console.log('Menu API 回應', res);
//         if (res?.isSuccess && Array.isArray(res.data)) {
//           // 重點：每次都先清空
//           this.historyItems = [];
//           this.historyItems.push(
//             ...res.data.map((item: any) => {
//               const time = new Date(item.createTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//               return {
//                 menuId: item.menuId,
//                 title: item.title,
//                 createtime: time
//               };
//             })
//           );
//           console.log('歷史紀錄:', this.historyItems);

//         } else {
//           console.warn('Menu 回傳資料格式錯誤或無資料');
//         }
//       },
//       error => {
//         console.error('Menu API 錯誤:', error);
//       }
//     )
//   }

//   onSendClick(): void {

//     console.log('onSendClick 被呼叫');
//     console.log('menuId:', this.menuId);
//     if (!this.userInput.trim()) return;

//     if (this.selectedHistoryIndex !== -1 && this.historyItems[this.selectedHistoryIndex]) {
//       const selectedItem = this.historyItems[this.selectedHistoryIndex];
//       this.menuId = selectedItem.menuId;
//       this.title = selectedItem.title;
//     } else if (this.historyItems.length > 0) {
//       // 使用最後一個（最新的）menu
//       const lastItem = this.historyItems[this.historyItems.length - 1];
//       this.menuId = lastItem.menuId;
//       this.title = lastItem.title;
//     } else {
//       console.error('❌ 找不到可用的 menuId，請確認是否已建立聊天');
//       return;
//     }

//     this.newMenuIdIsTrue = false; // 確保新聊天狀態為 true
//     let botMessage: string = ''; //AI 回應
//     this.BotService.chatBot({ msg: this.userInput }).subscribe({
//       next: (res) => {
//         console.log('chatBot 回應:', res);
//         botMessage = res.answer;
//         const timestampISO2 = new Date().toISOString();
//         const saveBotMsgReq: ISaveMsgReq = { userId: this.userId.userId, menuId: this.menuId, createTime: timestampISO2, msg: botMessage, msgType: false };

//         this.createMsgService.saveLogAPI(saveBotMsgReq).subscribe({
//           next: (res) => {
//             console.log('saveLogAPI 回應:', res);
//             if (res?.isSuccess) {
//               console.log('訊息已成功儲存');
//             } else {
//               console.warn('saveLogAPI 回傳資料格式錯誤或無資料');
//             }
//           },
//           error: (err) => {
//             console.error('saveLogAPI 錯誤:', err);
//           }
//         });
//         const timestamp2 = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//         this.chatMessagesLists.push({ type: '0', msg: botMessage, createTime: timestamp2 });

//       }
//     });

//     const timestampISO1 = new Date().toISOString();
//     const saveUserMsgReq: ISaveMsgReq = { userId: this.userId.userId, menuId: this.menuId, createTime: timestampISO1, msg: this.userInput, msgType: true };

//     this.createMsgService.saveLogAPI(saveUserMsgReq).subscribe({
//       next: (res) => {
//         console.log('saveLogAPI 回應:', res);
//         if (res?.isSuccess) {
//           console.log('訊息已成功儲存');
//         } else {
//           console.warn('saveLogAPI 回傳資料格式錯誤或無資料');
//         }
//       },
//       error: (err) => {
//         console.error('saveLogAPI 錯誤:', err);
//       }
//     });

//     const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     this.chatMessagesLists.push({ type: '1', msg: this.userInput, createTime: timestamp });



//     // 這裡之後還需要調用實際的聊天機器這裡之後還需要調用實際的聊天機器人 API










//     this.chatRequest.msg = this.userInput;
//     console.log(this.chatRequest);

//     /*
//     this.chatTestlocalService.getChatTest({ msg: this.chatRequest.msg }).subscribe({
//       next: (res) => {
//         console.log('ChatTestLocalService 回應:', res);
//         if (res?.answer) {
//           this.chatMessagesList.push({
//             type: 'bot',
//             text: res.answer,
//             timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//           }
//           );
//           console.log('test', this.chatMessagesList);
//           console.log('AI 回應:', res.answer);
//         } else {
//           console.warn('ChatTestLocalService 回傳資料格式錯誤或無資料');
//         }
//       },
//       error: (err) => {
//         console.error('ChatTestLocalService 錯誤:', err);
//       }
//     });
//     */
//     // 呼叫聊天機器人服務
//     this.userInput = '';
//     // 模擬 AI 回應

//   }

//   createMenuApi() {
//     alert("createMeunApi");
//   }
//   createLogApi() {
//     alert("createLogApi");
//   }
//   chatApi(req: IChatBor) {
//   }


//   onTestDelete(): void {
//     // 打開一個 對話框或其他方式來確認刪除帳號

//     this.dialog.open(UserInfoDialogComponent, {});
//   }
// }


import { ChangeDetectorRef, Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil, finalize } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

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

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss'
})
export class ChatPageComponent implements OnInit, OnDestroy {
  @ViewChild('sidebar') sidebarRef!: ElementRef<HTMLDivElement>;

  // State management
  private destroy$ = new Subject<void>();
  private userId: string | null | undefined = null;
  private isNewChatInProgress = false;
  private hasUpdatedTitle = false;//標題更新

  // Public properties
  menuId = '';
  title = '';
  selectedHistoryIndex = -1;
  userInput = '';
  historyItems: IHistoryItem[] = [];
  chatMessagesLists: IChatMessage[] = [];
  isLoading = false;
  isAddButtonDisabled = false; // 控制新增聊天按鈕的禁用狀態


  constructor(
    private chatBotService: ChatBotService,
    private router: Router,
    private getIdService: GetIdService,
    private menuService: MenuService,
    private deleteService: DeleteAccountService,
    private logService: LogService,
    private uuidService: GetUUidService,
    private botService: BotAPIService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.initializeComponent();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
    this.sidebarRef.nativeElement.classList.toggle('active');
  }

  closeSidebar(): void {
    this.sidebarRef.nativeElement.classList.remove('active');
  }

  onQuickAskClick(question: string): void {
    this.userInput = question;
  }

  // Chat Management
  onCreateNewChat(): void {
    if (this.isNewChatInProgress || this.isAddButtonDisabled) {
      return;
    }

    this.isAddButtonDisabled = true; // 禁用新增按鈕
    this.resetChatState();
    this.createNewChatMenu();
  }

  private resetChatState(): void {
    this.chatMessagesLists = [];
    this.selectedHistoryIndex = -1;
    this.title = '';
  }

  private createNewChatMenu(): void {
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
        takeUntil(this.destroy$),
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
    console.log('選擇的歷史紀錄:', this.isAddButtonDisabled);
  }

  private loadChatMessages(menuId: string): void {
    if (!this.userId) {
      console.error('User ID is required to load messages');
      return;
    }

    const getMsgReq: IGetMsgReq = { userId: this.userId, menuId };

    this.logService.getLogAPI(getMsgReq)
      .pipe(takeUntil(this.destroy$))
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
      .pipe(takeUntil(this.destroy$))
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
    const userMessage = this.userInput.trim();
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Add user message to chat immediately
    this.chatMessagesLists.push({
      type: '1',
      msg: userMessage,
      createTime: timestamp
    });

    // Save user message
    this.saveMessage(userMessage, true);

    if (isFirstMessage) {
      this.botService.chatTitle({ msg: this.title })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            if (res?.title) {
              this.title = res.title;
              this.hasUpdatedTitle = true; // 標記已更新標題

              const index = this.selectedHistoryIndex;
              if (index >= 0 && index < this.historyItems.length) {
                this.historyItems[index].title = res.title; // 更新歷史紀錄中的標題
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

  private getBotResponse(userMessage: string): void {
    this.botService.chatBot({ msg: userMessage })
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (res) => this.handleBotResponse(res),
        error: (err) => this.handleError('獲取機器人回應失敗', err)
      });
  }

  private handleBotResponse(res: any): void {
    if (res?.answer) {
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      this.chatMessagesLists.push({
        type: '0',
        msg: res.answer,
        createTime: timestamp
      });

      // Save bot message
      this.saveMessage(res.answer, false);
    } else {
      console.warn('機器人回應格式錯誤');
    }
  }

  private saveMessage(message: string, isUser: boolean): void {
    if (!this.userId) {
      return;
    }

    const saveMsgReq: ISaveMsgReq = {
      userId: this.userId,
      menuId: this.menuId,
      createTime: new Date().toISOString(),
      msg: message,
      msgType: isUser
    };

    this.logService.saveLogAPI(saveMsgReq)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (res?.isSuccess) {
            console.log('訊息已成功儲存');
          } else {
            console.warn('訊息儲存失敗: 回傳資料格式錯誤');
          }
        },
        error: (err) => this.handleError('儲存訊息失敗', err)
      });
  }

  // Utility Methods
  private formatTime(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
}