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
import { IGetMenuReq } from '../@InterfaceAPI/IMenu';
import { DeleteAccountService } from '../@service/delete-account.service';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { UserInfoDialogComponent } from '../componetDialog/user-info-dialog/user-info-dialog.component';
import { LogService } from '../@service/log.service';
import { IGetMsgReq, ISaveMsgDataRes, ISaveMsgReq } from '../@InterfaceAPI/IMsg';
import { ChatTestLocalService } from '../service/chat-test-local.service';
import { IChatMessage, IHistoryItem } from '../@interface/chatPageInterface/IChatPage';

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

  historyItems :IHistoryItem[] = [
  ];
  title ="";

  selectedHistoryIndex = 0;

  chatMessagesList = [
    { type: 'user', text: '請問怎麼查課表?', timestamp: '10:00' },
    { type: 'bot', text: '您可以透過以下幾種方式查詢個人課表:...', timestamp: '10:01' },
  ];
  chatMessagesLists :IChatMessage[] =  [
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
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,



    private chatTestlocalService: ChatTestLocalService // 假設有一個 ChatTestLocalService 用於測試聊天功能
  ) {
  }

  ngOnInit(): void {
    const user = this.getIdService.getUser();

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

    if (!this.userInput.trim()) return;

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

    this.chatMessagesList.push({ type: 'user', text: this.userInput, timestamp });

    const BotMsg = this.chatApi(this.chatRequest);

    // 這裡之後還需要調用實際的聊天機器這裡之後還需要調用實際的聊天機器人 API



    const timestampISO2 = new Date().toISOString();
    const saveBotMsgReq: ISaveMsgReq = { userId: this.userId.userId, menuId: this.menuId, createTime: timestampISO2, msg: this.userInput, msgType: false };

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
    this.chatMessagesLists.push({ type: '0', msg: this.userInput, createTime: timestamp2 });







    this.chatRequest.msg = this.userInput;
    console.log(this.chatRequest);

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
          console.log('AI 回應:', res.answer);
        } else {
          console.warn('ChatTestLocalService 回傳資料格式錯誤或無資料');
        }
      },
      error: (err) => {   
        console.error('ChatTestLocalService 錯誤:', err);
      }
    });
    // 呼叫聊天機器人服務
    this.userInput = '';
    // 模擬 AI 回應

    of(null)
      .pipe(
        delay(1000),
        tap(() => this.chatMessagesList.push({
          type: 'bot',
          text: '這是AI的回覆。',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }))
      )
      .subscribe();
  }

  createMenuApi() {
    alert("createMeunApi");
  }
  createLogApi() {
    alert("createLogApi");
  }
  chatApi(req: IChatBor) {
    alert("call chatApi");
  }


  onTestDelete(): void {
    // 打開一個 對話框或其他方式來確認刪除帳號

    this.dialog.open(UserInfoDialogComponent, {});
  }
}
