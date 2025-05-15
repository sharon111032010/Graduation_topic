import { Component, ElementRef, ViewChild } from '@angular/core';
import { delay, filter, fromEvent, of, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ChatBotService } from '../service/chat-bot.service';
import { IChatBor } from '../@interface/IchatBor';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss'
})
export class ChatPageComponent {

  // @ViewChild('chatMessages') chatMessagesRef!: ElementRef<HTMLDivElement>;
  @ViewChild('sidebar') sidebarRef!: ElementRef<HTMLDivElement>;

  historyItems = [
    '5/5 10:00:課表怎麼查',
    '5/4 16:30:圖書館開放時間',
    '5/4 13:00:怎麼借教室',
    '5/3 15:45:學生證遺失',
    '5/3 11:20:選課系統使用方式',
    '5/2 14:10:成績查詢',
    '5/1 09:30:獎學金申請',
    '4/30 16:00:宿舍申請流程'
  ];
  selectedHistoryIndex = 0;

  chatMessagesList = [
    { type: 'user', text: '請問怎麼查課表?', timestamp: '10:00' },
    { type: 'bot', text: '您可以透過以下幾種方式查詢個人課表:...', timestamp: '10:01' },
    // { type: 'user', text: '謝謝,那我在校務系統上看到的課表和實際的是否會有差異?', timestamp: '10:02' },
    // { type: 'bot', text: '校務系統上的課表是官方資料,但在某些情況下可能與實際有所差異:...', timestamp: '10:03' }
  ];

  userInput = '';
  chatRequest: IChatBor = {
    ID: 'A12345', // 這裡應該填入真實的使用者 ID
    msg: this.userInput
  };



  constructor(
    private chatBotService: ChatBotService
  ) { }

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
  }

  onSendClick(): void {
    if (!this.userInput.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.chatMessagesList.push({ type: 'user', text: this.userInput, timestamp });



    this.chatRequest.msg=this.userInput;
    console.log(this.chatRequest);
    this.chatBotService.chatBotResponse(this.chatRequest).subscribe(res => {
      // 處理 AI 回應

      
      // 打chat api 
      const response = res;
      this.chatMessagesList.push({
        type: 'bot',
        text: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    });
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


}
