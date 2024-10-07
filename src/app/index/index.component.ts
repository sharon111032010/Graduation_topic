import { Component } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {

  isMenuVisible: boolean = true;

  isChatBarVisible: boolean = false;  // 控制 chat_bar 是否顯示
  userInput: string = '';  // 保存當前的輸入內容

  currentIndex: number = 0;
  conversation: { user: string; response: string; }[] = [];
  announcements = [
    { title: '教務處公告', content: '113學年度第一學期開學及選課相關事宜', date: '2024-09-12' },
    { title: '圖書館公告', content: '圖書館將於本周五進行系統維護，暫停開放', date: '2024-09-15' },
    { title: '校園活動', content: '10月校慶運動會報名現已開始', date: '2024-09-20' }
  ];
menuItems: string[] = [
  '學校停車場在哪',
  '記號可以進宿舍',
  '學校停車場在哪',
  '學校停車場在哪',
  '學校停車場在哪',
  '學校停車場在哪',
  '學校停車場在哪',
  '學校停車場在哪',
  '學校停車場在哪',
  '學校停車場在哪',
  '學校停車場在哪',
  '學校停車場在哪',
  '記號可以進宿舍'
];


  constructor() { }

  // 點擊 menu icon 後，切換 menu 的顯示/隱藏狀態
  on_click_menu() {
    this.isMenuVisible = !this.isMenuVisible;  // 切換布林值
  }
  on_click_arrow_right() {
    if (this.currentIndex < this.announcements.length - 1) {
      this.currentIndex++;
    }
  }
  on_click_arrow_lift() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
  on_click_enter_btn() {

    // 切換 chat_header 為 chat_bar

  //輸出使用者輸入的輸出
    console.log(this.userInput);
    //限制使用者輸入為必填
    // if (this.userInput === '') {
    //   return;
    // }
    // 將使用者輸入和回應新增到 conversation 陣列中
      this.isChatBarVisible = true;
      this.conversation.push({
        user: this.userInput,
        response: '這是一個自動回覆'  // 假資料作為回應
      });

      // 清空輸入框
      this.userInput = '';

  }
}
