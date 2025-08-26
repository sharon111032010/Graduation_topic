import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryData, StatisticCard, SuccessRateData, UnhandledQuestion, UserStatistic } from 'src/app/@service/trafficLog/traffic-Log.model';

@Component({
  selector: 'app-traffic-log',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './traffic-log.component.html',
  styleUrl: './traffic-log.component.scss'
})
export class TrafficLogComponent {
// 統計卡片數據
  statisticsCards: StatisticCard[] = [
    { number: '2,847', label: '今日總使用次數' },
    { number: '89.2%', label: '回答成功率' },
    { number: '156', label: '活躍用戶數' },
    { number: '23', label: '未命中問題' }
  ];

  // 管理員資訊
  adminInfo = {
    name: '張教授'
  };

  // 流量數據
  activeTrafficTab = 'traffic-daily';
  weeklyData = [
    { day: '週一', count: 2134 },
    { day: '週二', count: 2567 },
    { day: '週三', count: 2847, isToday: true },
    { day: '週四', count: 2234 },
    { day: '週五', count: 3012 }
  ];

  popularHours = [
    { time: '14:00-16:00', count: 458 },
    { time: '10:00-12:00', count: 392 },
    { time: '20:00-22:00', count: 367 },
    { time: '16:00-18:00', count: 298 }
  ];

  // 問題分類數據
  categories: CategoryData[] = [
    { name: '課程資訊', questionCount: 45, usage: 85 },
    { name: '註冊流程', questionCount: 32, usage: 72 },
    { name: '校園生活', questionCount: 28, usage: 63 },
    { name: '成績查詢', questionCount: 21, usage: 45 }
  ];

  // 回答成功率數據
  overallSuccessRate = 89.2;
  successRateData: SuccessRateData[] = [
    { type: '課程查詢', rate: 94.5, likes: 127, dislikes: 8, status: 'success', statusText: '良好' },
    { type: '成績查詢', rate: 91.2, likes: 98, dislikes: 12, status: 'success', statusText: '良好' },
    { type: '校園導航', rate: 87.3, likes: 76, dislikes: 15, status: 'warning', statusText: '待優化' },
    { type: '活動資訊', rate: 78.9, likes: 45, dislikes: 23, status: 'error', statusText: '需改善' }
  ];

  // 未命中問題數據
  unhandledQuestions: UnhandledQuestion[] = [
    { question: '如何申請停車證？', time: '2025/08/13 14:23', count: 5, status: 'pending', statusText: '待處理' },
    { question: '圖書館24小時開放嗎？', time: '2025/08/13 13:45', count: 3, status: 'pending', statusText: '待處理' },
    { question: '宿舍網路如何設定？', time: '2025/08/13 12:10', count: 8, status: 'processed', statusText: '已處理' },
    { question: '社團招生時間？', time: '2025/08/13 11:30', count: 6, status: 'pending', statusText: '待處理' }
  ];

  // 用戶統計數據
  userStatistics: UserStatistic[] = [
    { type: '在校學生', icon: '🎓', usage: 1892, percentage: 66.4, avgDuration: '5分23秒' },
    { type: '新生', icon: '🆕', usage: 645, percentage: 22.7, avgDuration: '8分15秒' },
    { type: '訪客', icon: '👤', usage: 234, percentage: 8.2, avgDuration: '3分41秒' },
    { type: '教職員', icon: '👨‍🏫', usage: 76, percentage: 2.7, avgDuration: '4分08秒' }
  ];

  // 用戶登入比例
  loginUserPercentage = 67;
  guestUserPercentage = 33;

  // 定時器
  private statisticsUpdateTimer: any;

  ngOnInit(): void {
    console.log('AI 校園助手後台管理系統已載入');
    this.startStatisticsUpdates();
  }

  ngOnDestroy(): void {
    if (this.statisticsUpdateTimer) {
      clearInterval(this.statisticsUpdateTimer);
    }
  }

  // 切換流量標籤頁
  showTrafficTab(tabId: string): void {
    this.activeTrafficTab = tabId;
  }

  // 登出功能
  logout(): void {
    if (confirm('確定要登出嗎？')) {
      alert('登出成功！');
      // 在實際應用中，這裡會導向登入頁面或調用認證服務
    }
  }

  // 編輯分類
  editCategory(category: CategoryData): void {
    alert(`編輯分類功能開發中，將在後續版本中實現`);
  }

  // 新增分類
  addCategory(): void {
    alert(`新增分類功能開發中，將在後續版本中實現`);
  }

  // 匯出清單
  exportList(): void {
    alert(`匯出清單功能開發中，將在後續版本中實現`);
  }

  // 批次處理
  batchProcess(): void {
    alert(`批次處理功能開發中，將在後續版本中實現`);
  }

  // 加入FAQ
  addToFAQ(question: UnhandledQuestion): void {
    alert(`加入FAQ功能開發中，將在後續版本中實現`);
  }

  // 檢視問題
  viewQuestion(question: UnhandledQuestion): void {
    alert(`檢視功能開發中，將在後續版本中實現`);
  }

  // 獲取狀態樣式類別
  getStatusClass(status: string): string {
    switch (status) {
      case 'success':
        return 'status-success';
      case 'warning':
        return 'status-warning';
      case 'error':
        return 'status-error';
      case 'pending':
        return 'status-warning';
      case 'processed':
        return 'status-success';
      default:
        return '';
    }
  }

  // 開始統計數據更新
  private startStatisticsUpdates(): void {
    this.statisticsUpdateTimer = setInterval(() => {
      this.updateStatistics();
    }, 30000); // 每30秒更新一次
  }

  // 更新統計數據（模擬）
  private updateStatistics(): void {
    const currentUsage = parseInt(this.statisticsCards[0].number.replace(',', ''));
    const newUsage = currentUsage + Math.floor(Math.random() * 10);
    this.statisticsCards[0].number = newUsage.toLocaleString();
  }
}
