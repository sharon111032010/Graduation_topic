import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { delay, filter, fromEvent, of, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ChatBotService } from '../service/chat-bot.service';
import { IChatBor } from '../@interface/IchatBor';
import { Router } from '@angular/router';
import { GetIdService } from '../service/get-id.service';
import { MenuService } from '../@service/menu.service';
import { ICreateMenuReq, IGetMenuReq } from '../@InterfaceAPI/IMenu';
import { DeleteAccountService } from '../@service/delete-account.service';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { UserInfoDialogComponent } from '../componetDialog/user-info-dialog/user-info-dialog.component';
import { LogService } from '../@service/log.service';
import { IGetMsgReq, ISaveMsgDataRes, ISaveMsgReq } from '../@InterfaceAPI/IMsg';
import { ChatTestLocalService } from '../service/chat-test-local.service';
import { IChatMessage, IHistoryItem } from '../@interface/chatPageInterface/IChatPage';
import { GetUUidService } from '../@service/get-uuid.service';
import { BotAPIService } from '../@service/bot-api.service';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss'
})
export class ChatPageComponent {
  [x: string]: any;
  // account: string | null = null;

  // @ViewChild('chatMessages') chatMessagesRef!: ElementRef<HTMLDivElement>;
  @ViewChild('sidebar') sidebarRef!: ElementRef<HTMLDivElement>;

  menuId = '';


  historyItems: IHistoryItem[] = [
  ];
  title = "";

  selectedHistoryIndex = 0;


  chatMessagesLists: IChatMessage[] = [
  ];
  userInput = '';
  chatRequest: IChatBor = {
    ID: 'A12345', // 這裡應該填入真實的使用者 ID
    msg: this.userInput
  };

  constructor(
    private chatBotService: ChatBotService,
    private router: Router,
    public getIdService: GetIdService, // 假設有一個 UserService 用於獲取用戶信息
    public MenuService: MenuService,
    public DeleteService: DeleteAccountService,// 假設有一個 DeleteService 用於刪除操作
    public getMsgService: LogService, // 假設有一個 GetMsgService 用於獲取對話紀錄
    public createMsgService: LogService,
    public CreateMenuIdService: GetUUidService,
    private BotService: BotAPIService, // 假設有一個 ChatBotService 用於聊天機器人功能
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,



    private chatTestlocalService: ChatTestLocalService // 假設有一個 ChatTestLocalService 用於測試聊天功能
  ) {
  }

  ngOnInit(): void {
    const user = this.getIdService.getUser();
    console.log('menuId:', this.menuId);

    if (user) {
      this.onInitMenuClick();
    } else {
      console.warn('User ID is not available yet.');
    }
  }
  userId: IGetMenuReq = { userId: this.getIdService.getUserId() ?? undefined };

  ngAfterViewInit(): void {
    // 可以在這裡做一些初始化或監聽
  }

  toggleSidebar(): void {
    this.sidebarRef.nativeElement.classList.toggle('active');
  }

  closeSidebar(): void {
    this.sidebarRef.nativeElement.classList.remove('active');
  }

  onQuickAskClick(question: string): void {
    this.userInput = question;
  }

  newMenuIdIsTrue = false;
  onCreateNewChat(): void {
    if (!this.newMenuIdIsTrue) {
      this.chatMessagesLists = [];
      // this.menuId = ''; // 清除當前的 menuId
      this.selectedHistoryIndex = -1; // 重置選擇的歷史紀錄索引
      const createMenuReq: ICreateMenuReq = {
        userId: this.userId.userId,
        title: this.title || '新聊天',
        createTime: new Date().toISOString()
      };
      this.MenuService.createMenuAPI(createMenuReq).subscribe({
        next: (res) => {
          console.log('createMenuAPI 回應:', res);
          if (res?.isSuccess) {
            this.menuId = res.data.menuId; //API 回傳的資料包含 menuId
            this.newMenuIdIsTrue = true;
            this.selectedHistoryIndex = this.historyItems.length; // 選擇新創建的聊天

            // 新創建的聊天插入歷史紀錄最上面
            this.historyItems.push({
              menuId: res.data.menuId,
              title: this.title || '新聊天',
              createtime: new Date(createMenuReq.createTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });

            console.log('新聊天的 menuId:', this.menuId);
            console.log('新聊天的 title:', this.title);
            console.log('新聊天的 createTime:', createMenuReq.createTime);
            console.log('新聊天已成功創建');
            // 更新 title 
            //呼叫 getMenuId 來獲取新創建
            // 如果有用 unshift，就可以不用再 call onInitMenuClick()
            // this.onInitMenuClick();

          } else {
            console.warn('createMenuAPI 回傳資料格式錯誤或無資料');
          }
        },
        error: (err) => {
          console.error('createMenuAPI 錯誤:', err);
        }
      });
      return; // 如果有新聊天正在進行，則不再創建新聊天
    }
    //this.newMenuIdIsTrue = false; // 重置新聊天創建狀態




    /*
    this.CreateMenuIdService.getMenuId().subscribe({
      next: res => {
        if (res.isSuccess) {
          this.newMenuId = res.data.uuId;
        }
        console.log("get uuid", this.newMenuId);
      },
      error: err => {
        console.error('Failed to get UUID:', err);
      }
    })
    */

  }

  // 要接 menu API
  onHistoryClick(index: number): void {
    this.selectedHistoryIndex = index;
    this.title = this.historyItems[index].title;
    const selectedMessage = this.historyItems[index];
    this.menuId = selectedMessage.menuId;
    const userId = this.getIdService.getUserId();
    const getMsgReq: IGetMsgReq = { userId: userId, menuId: this.menuId };
    this.getMsgService.getLogAPI(getMsgReq).subscribe({
      next: (res) => {
        console.log('getMsgAPI 回應:', res);
        console.log('data:', res.data);
        if (res?.isSuccess && Array.isArray(res.data)) {
          this.chatMessagesLists = res.data.map(item => ({
            type: item.msgType ? '1' : '0',  // true 為使用者, false 為系統
            msg: item.msg,
            createTime: this.formatTime(item.createTime)  // 選擇格式化時間
          }));
        } else {
          console.warn('getMsgAPI 回傳資料格式錯誤或無資料');
        }
      },
      error: (err) => {
        console.error('getMsgAPI 錯誤:', err);
      }
    }
    );
  }
  private formatTime(isoString: string): string {
    const date = new Date(isoString);
    return date.toTimeString().slice(0, 5);  // e.g. "15:41"
  }

  onInitMenuClick(): void {
    console.log('onInitMenuClick 被呼叫');
    console.log('userId:', this.userId);

    if (!this.userId) {
      console.error('userId 為 null，無法呼叫 getMentAPI');
      return;
    }

    this.MenuService.getMentAPI(this.userId).subscribe(
      res => {
        console.log('Menu API 回應', res);
        if (res?.isSuccess && Array.isArray(res.data)) {
          // 重點：每次都先清空
          this.historyItems = [];
          this.historyItems.push(
            ...res.data.map((item: any) => {
              const time = new Date(item.createTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              return {
                menuId: item.menuId,
                title: item.title,
                createtime: time
              };
            })
          );
          console.log('歷史紀錄:', this.historyItems);

        } else {
          console.warn('Menu 回傳資料格式錯誤或無資料');
        }
      },
      error => {
        console.error('Menu API 錯誤:', error);
      }
    )
  }

  onSendClick(): void {

    console.log('onSendClick 被呼叫');
    console.log('menuId:', this.menuId);
    if (!this.userInput.trim()) return;

    if (this.selectedHistoryIndex !== -1 && this.historyItems[this.selectedHistoryIndex]) {
      const selectedItem = this.historyItems[this.selectedHistoryIndex];
      this.menuId = selectedItem.menuId;
      this.title = selectedItem.title;
    } else if (this.historyItems.length > 0) {
      // 使用最後一個（最新的）menu
      const lastItem = this.historyItems[this.historyItems.length - 1];
      this.menuId = lastItem.menuId;
      this.title = lastItem.title;
    } else {
      console.error('❌ 找不到可用的 menuId，請確認是否已建立聊天');
      return;
    }

    this.newMenuIdIsTrue = false; // 確保新聊天狀態為 true
    let botMessage: string = ''; //AI 回應
    this.BotService.chatBot({ msg: this.userInput }).subscribe({
      next: (res) => {
        console.log('chatBot 回應:', res);
        botMessage = res.answer;
        const timestampISO2 = new Date().toISOString();
        const saveBotMsgReq: ISaveMsgReq = { userId: this.userId.userId, menuId: this.menuId, createTime: timestampISO2, msg: botMessage, msgType: false };

        this.createMsgService.saveLogAPI(saveBotMsgReq).subscribe({
          next: (res) => {
            console.log('saveLogAPI 回應:', res);
            if (res?.isSuccess) {
              console.log('訊息已成功儲存');
            } else {
              console.warn('saveLogAPI 回傳資料格式錯誤或無資料');
            }
          },
          error: (err) => {
            console.error('saveLogAPI 錯誤:', err);
          }
        });
        const timestamp2 = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        this.chatMessagesLists.push({ type: '0', msg: botMessage, createTime: timestamp2 });

      }
    });

    const timestampISO1 = new Date().toISOString();
    const saveUserMsgReq: ISaveMsgReq = { userId: this.userId.userId, menuId: this.menuId, createTime: timestampISO1, msg: this.userInput, msgType: true };

    this.createMsgService.saveLogAPI(saveUserMsgReq).subscribe({
      next: (res) => {
        console.log('saveLogAPI 回應:', res);
        if (res?.isSuccess) {
          console.log('訊息已成功儲存');
        } else {
          console.warn('saveLogAPI 回傳資料格式錯誤或無資料');
        }
      },
      error: (err) => {
        console.error('saveLogAPI 錯誤:', err);
      }
    });

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.chatMessagesLists.push({ type: '1', msg: this.userInput, createTime: timestamp });



    // 這裡之後還需要調用實際的聊天機器這裡之後還需要調用實際的聊天機器人 API










    this.chatRequest.msg = this.userInput;
    console.log(this.chatRequest);

    /*
    this.chatTestlocalService.getChatTest({ msg: this.chatRequest.msg }).subscribe({
      next: (res) => {
        console.log('ChatTestLocalService 回應:', res);
        if (res?.answer) {
          this.chatMessagesList.push({
            type: 'bot',
            text: res.answer,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
          );
          console.log('test', this.chatMessagesList);
          console.log('AI 回應:', res.answer);
        } else {
          console.warn('ChatTestLocalService 回傳資料格式錯誤或無資料');
        }
      },
      error: (err) => {
        console.error('ChatTestLocalService 錯誤:', err);
      }
    });
    */
    // 呼叫聊天機器人服務
    this.userInput = '';
    // 模擬 AI 回應

  }

  createMenuApi() {
    alert("createMeunApi");
  }
  createLogApi() {
    alert("createLogApi");
  }
  chatApi(req: IChatBor) {
  }


  onTestDelete(): void {
    // 打開一個 對話框或其他方式來確認刪除帳號

    this.dialog.open(UserInfoDialogComponent, {});
  }
}
