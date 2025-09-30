import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { DataItem, FaqCategory, StatCard, SuccessRate, UnknownQuestion, VisitorStat } from 'src/app/@service/trafficLog/traffic-log-page.model';
import { CommonModule } from '@angular/common';
import { TrafficLogBackService } from 'src/app/@service/trafficLog/trafficLogService/traffic-log-back.service';

// import * as echarts from 'echarts/core';
// import { LineChart } from 'echarts/charts';
// import { TitleComponent, TooltipComponent, GridComponent } from 'echarts/components';
// import { CanvasRenderer } from 'echarts/renderers';
// echarts.use([TitleComponent, TooltipComponent, GridComponent, LineChart, CanvasRenderer]);
// >>>>>>> abac0f0b6d1bb0117219fdcd1ef31a08ef5bf7f6
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([TitleComponent, TooltipComponent, GridComponent, LineChart, CanvasRenderer]);
type EChartsOption = echarts.EChartsCoreOption;
@Component({
  selector: 'app-traffic-log-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './traffic-log-page.component.html',
  styleUrl: './traffic-log-page.component.scss'
})
export class TrafficLogPageComponent {

  // @ViewChild('myChart') myChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('chart') chartElement!: ElementRef;
  // @ViewChild('chartContainer', { static: false }) chartElement!: ElementRef;
  activeSection: string = 'traffic';
  activeTab: string = 'daily';
  currentDate: string = '2025/08/20';
  adminName: string = 'superadmin';

  trafficService = inject(TrafficLogBackService);

  private updateInterval: any;

  // 統計卡片數據
  statsCards: StatCard[] = [
    { number: '47', label: '今日使用次數' },
    // { number: '87%', label: '回答成功率' },
    { number: '4156', label: '目前總共次數' },
    { number: '23', label: '待處理問題' }
  ];
  getCount() {
    this.trafficService.getCount().subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.statsCards[0].number = res.data.todayCount;
          this.statsCards[1].number = res.data.msgType1Count;
          this.statsCards[2].number = (res.data.category20Count / 2).toString();
        } else {
          console.error('API 回傳失敗:', res.message);
        }
      },
      error: (err) => {
        console.error('API 請求錯誤:', err);
      }
    });

  }

  // 每日使用數據
  dailyData: DataItem[] = [
    { login_date: '今日 (8/17)', login_count: '2,847 次', isHighlight: true },
    { login_date: '昨日 (8/16)', login_count: '2,634 次' },
    { login_date: '8/15', login_count: '2,912 次' }
  ];





  private myChart!: echarts.ECharts;

  ngAfterViewInit(): void {
  // getEchart(){
    const chartDom = document.getElementById('chartContainer')!;
    this.myChart = echarts.init(chartDom);

    const option: echarts.EChartsCoreOption = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }
      ]
    };

    this.myChart.setOption(option);
  }

  


// -------------------------------------------------------------------
@ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  hourlyData: DataItem[] = [
    { login_date: '14:00-16:00', login_count: '458 次', isHighlight: true },
    { login_date: '10:00-12:00', login_count: '392 次' },
    { login_date: '20:00-22:00', login_count: '367 次' }
  ];
// <<<<<<< HEAD
  getHistory(){
    this.trafficService.getHistory().subscribe({
      next: (res) => {
        if(res.isSuccess){
          this.hourlyData = res.data;
        } else {
          console.error('API 回傳失敗:', res.message);
        }
      },
      error: (err) => {
        console.error('API 請求錯誤:', err);
      }
    });
  }
// =======

  // private myChart!: echarts.ECharts;

  // ngOnInit(): void {}

  // ngAfterViewInit(): void {
  //   this.initChart();
  // }

  // initChart(): void {
  //   this.myChart = echarts.init(this.chartContainer.nativeElement);

  //   const option = {
  //     title: {
  //       text: '各時段登入次數'
  //     },
  //     tooltip: {},
  //     xAxis: {
  //       type: 'category',
  //       data: this.hourlyData.map(item => item.login_date)
  //     },
  //     yAxis: {
  //       type: 'value'
  //     },
  //     series: [
  //       {
  //         name: '登入次數',
  //         type: 'bar',
  //         data: this.hourlyData.map(item => parseInt(item.login_count)),
  //         itemStyle: {
  //           color: (params: any) => {
  //             return this.hourlyData[params.dataIndex].isHighlight ? '#ff7f50' : '#3398DB';
  //           }
  //         }
  //       }
  //     ]
  //   };

  //   this.myChart.setOption(option);
  // }

  // 時段數據
  // hourlyData: DataItem[] = [
  //   { login_date: '14:00-16:00', login_count: '458 次', isHighlight: true },
  //   { login_date: '10:00-12:00', login_count: '392 次' },
  //   { login_date: '20:00-22:00', login_count: '367 次' }
  // ];

  // getHistory(){
  //   this.trafficService.getHistory().subscribe({
  //     next: (res) => {
  //       if(res.isSuccess){
  //         this.hourlyData = res.data;
  //       } else {
  //         console.error('API 回傳失敗:', res.message);
  //       }
  //     },
  //     error: (err) => {
  //       console.error('API 請求錯誤:', err);
  //     }
  //   });
  // }

  ngAfteriewInit() {
    // this.getHistory();
    // this.getEchart();
  }

  // getHistory() {
  //   this.trafficService.getHistory().subscribe({
  //     next: (res) => {
  //       if (res.isSuccess) {
  //         this.hourlyData = res.data;
  //         this.renderChart();
  //       } else {
  //         console.error('API 回傳失敗:', res.message);
  //       }
  //     },
  //     error: (err) => {
  //       console.error('API 請求錯誤:', err);
  //     }
  //   });
  // }

  // renderChart() {
  //   if (!this.chartElement) {
  //     console.error('chartElement 尚未初始化');
  //     return;
  //   }
  //   const chart = echarts.init(this.chartElement.nativeElement);
  //   chart.setOption({
  //     title: { text: '時段登入次數' },
  //     tooltip: { trigger: 'axis' },
  //     xAxis: { type: 'category', data: this.hourlyData.map(d => d.login_date) },
  //     yAxis: { type: 'value' },
  //     series: [
  //       {
  //         type: 'line',
  //         data: this.hourlyData.map(d => parseInt(d.login_count.replace(/\D/g, ''), 10))
  //       }
  //     ]
  //   });
  // }

  // FAQ分類數據
  faqCategories: FaqCategory[] = [
    { categoryName: '課程相關', itemCount: 45, usageRate: 85 },
    { categoryName: '宿舍生活', itemCount: 30, usageRate: 72 },
    { categoryName: '交通資訊', itemCount: 12, usageRate: 45 }
  ];

  getFaqCategory() {
    this.trafficService.getFaqCategory().subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.faqCategories = res.data;
        } else {
          console.error('API 回傳失敗:', res.message);
        }
      },
      error: (err) => {
        console.error('API 請求錯誤:', err);
      }
    });
  }

  // 成功率數據
  successRates: SuccessRate[] = [
    { type: '課程查詢', rate: '94.5%', status: 'success' },
    { type: '校園導航', rate: '87.3%', status: 'warning' },
    { type: '活動資訊', rate: '78.9%', status: 'error' }
  ];

  // 未知問題數據
  unknownQuestions: UnknownQuestion[] = [
    { msg: '請問畢業典禮時間？', count: 5 },
    { msg: '圖書館週末是否開放？', count: 3 },
    { msg: '校園 Wi-Fi 如何申請？', count: 8 },
    { msg: '社團招生資訊？', count: 4 }
  ];

  getNuneQA() {
    this.trafficService.getNuneQA().subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.unknownQuestions = res.data;
        } else {
          console.error('API 回傳失敗:', res.message);
        }
      },
      error: (err) => {
        console.error('API 請求錯誤:', err);
      }
    });
  }

  // 訪客統計數據
  visitorStats: VisitorStat[] = [
    { identity: '🎓 在校學生', usageCount: 1892, averageDuration: '5分23秒' },
    { identity: '🆕 新生', usageCount: 645, averageDuration: '8分15秒' },
    { identity: '👤 訪客', usageCount: 234, averageDuration: '3分41秒' },
    { identity: '👨‍🏫 教職員', usageCount: 76, averageDuration: '4分08秒' }
  ];

  ngOnInit(): void {
    // 模擬數據更新
    this.startDataUpdate();
    this.getCount();
    this.getNuneQA();
    this.getFaqCategory();
    // this.getHistory();

  }

  ngOnDestroy(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
     if (this.myChart) {
      this.myChart.dispose(); // 銷毀，避免 memory leak
    }
  }

  // 導航切換
  showSection(sectionName: string): void {
    this.activeSection = sectionName;
    console.log('切換到：' + sectionName);
  }

  // 標籤頁切換
  showTab(tabName: string): void {
    this.activeTab = tabName;
  }

  // 按鈕點擊事件
  onButtonClick(action: string): void {
    alert(`${action} 功能開發中`);
  }

  // 獲取狀態徽章的CSS類別
  getStatusBadgeClass(status: string): string {
    return `status-badge status-${status}`;
  }

  // 獲取狀態文字
  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'success': '優秀',
      'warning': '良好',
      'error': '待改善'
    };
    return statusMap[status] || status;
  }

  // 獲取問題計數的背景色類別
  getCountBadgeClass(count: number): string {
    return count >= 8 ? 'count-high' : 'count-normal';
  }

  // 開始數據更新
  private startDataUpdate(): void {
    this.updateInterval = setInterval(() => {
      const currentCount = parseInt(this.statsCards[0].number.replace(',', ''));
      const newCount = currentCount + Math.floor(Math.random() * 5);
      this.statsCards[0].number = newCount.toLocaleString();
    }, 30000);
  }
}
