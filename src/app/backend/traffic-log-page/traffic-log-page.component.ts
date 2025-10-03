import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { DataItem, FaqCategory, StatCard, SuccessRate, UnknownQuestion, VisitorStat } from 'src/app/@service/trafficLog/traffic-log-page.model';
import { CommonModule } from '@angular/common';
import { TrafficLogBackService } from 'src/app/@service/trafficLog/trafficLogService/traffic-log-back.service';

// import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

// 註冊要用到的組件
echarts.use([PieChart, TitleComponent, TooltipComponent, LegendComponent, CanvasRenderer]);

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
  activeTab: string = 'hourly';
  currentDate: string = '2025/08/20';
  adminName: string = 'superadmin';

  trafficService = inject(TrafficLogBackService);

  private updateInterval: any;
  //圖表
  private myChart!: echarts.ECharts;
  private visterChart!: echarts.ECharts;

  private dailyChart!: echarts.ECharts;
// private visterChart!: echarts.ECharts;

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
    { login_date: '2025-09-10', login_count: '2,847' },
    { login_date: '2025-09-11', login_count: '2,634' },
    { login_date: '2025-09-12', login_count: '2,912' }
  ];

  @ViewChild('chartVister', { static: true }) chartVister!: ElementRef;
  getVisterEChart(){
    // const chartDom = document.getElementById('chartVister')!;
    // this.visterChart = echarts.init(chartDom);

    const option : echarts.EChartsCoreOption  = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            scale: true,       // 啟用縮放
            scaleSize: -5,     // 負數就是縮小（例如 -5 表示縮小 5px）
            label: {
              show: true,
              fontSize: 25,
              fontWeight: 'lighter'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 708, name: '訪客用戶' },
            { value: 1048, name: '登入用戶' }
          ]
        }
      ]
    };
    this.visterChart.setOption(option);

  }



  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;
  ngAfterViewInit(): void {
    this.getEchartData();
    this.getVisterEChart();
    this.getMeetingChart();
    setTimeout(() => {
    this.showDailyTabHourly();
    }, 0.5);
  }

  showDailyTab() {
    this.activeTab = 'daily';
    setTimeout(() => {
      this.getEchartData();
    });
  }

  getEchartData() {
    // const chartDom = document.getElementById('chartContainer')!;
    // this.myChart = echarts.init(chartDom);
  
    // 轉換資料
    const xData = this.dailyData.map(item => item.login_date); // x 軸用日期
    const yData = this.dailyData.map(item => Number(item.login_count.replace(/,/g, ''))); // y 軸數字
  
    const option: echarts.EChartsCoreOption = {
      xAxis: {
        type: 'category',
        data: xData
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: yData,
          type: 'line'
        }
      ]
    };
  
    this.myChart.setOption(option);
  }




  // -------------------------------------------------------------------
  @ViewChild('chartContainer2', { static: true }) chartContainer2!: ElementRef;

  hourlyData: DataItem[] = [
    { login_date: '2025-09-10', login_count: '458' },
    { login_date: '2025-09-11', login_count: '392' },
    { login_date: '2025-09-12', login_count: '367' }
  ];
  // <<<<<<< HEAD
  // getHistory() {
  //   this.trafficService.getHistory().subscribe({
  //     next: (res) => {
  //       if (res.isSuccess) {
  //         this.hourlyData = res.data.map((item: any) => ({
  //           ...item,
  //           // 只保留日期部分 YYYY-MM-DD
  //           login_date: item.login_date.split('T')[0]
  //           // 如果只要 MM-DD 可以改成 slice(5)
  //           // login_date: item.login_date.split('T')[0].slice(5)
  //         }));
  //       } else {
  //         console.error('API 回傳失敗:', res.message);
  //       }
  //     },
  //     error: (err) => {
  //       console.error('API 請求錯誤:', err);
  //     }
  //   });
  // }

  // 歷史紀錄完整資料（後端 API 回來的）
// hourlyData: DataItem[] = [];

// 畫面上要顯示的資料（控制分批顯示）
hourlyDataDisplay: DataItem[] = [];

// 限制筆數
hourlyLimit: number = 5; // 預設先顯示 10 筆

getHourlyData() {
    this.trafficService.getHistory().subscribe({
    next: (res) => {
      if (res.isSuccess) {
        this.hourlyData = res.data;
        this.hourlyDataDisplay = this.hourlyData.slice(0, this.hourlyLimit);
      } else {
        console.error('API 回傳失敗:', res.message);
      }
    },
    error: (err) => {
      console.error('API 請求錯誤:', err);
    }
  });
}

showMoreHourly() {
  this.hourlyLimit += 5; // 每次多顯示 10 筆
  this.hourlyDataDisplay = this.hourlyData.slice(0, this.hourlyLimit);
}


  showDailyTabHourly() {
    this.activeTab = 'hourly';
    setTimeout(() => {
      this.getEchartHistory();
    }, 500); // 1000 = 1 秒
  }

  // xDatao = this.dailyData.map(item => item.login_date.split('T')[0]);
  getEchartHistory() {
    // const chartDom = document.getElementById('chartContainer2')!;
    // this.myChart = echarts.init(chartDom);
  
    // 轉換資料
    const xData = this.hourlyData.map(item => item.login_date); // x 軸用日期
    // const xData = this.xDatao // x 軸用日期
    const yData = this.hourlyData.map(item => {
      // item.login_count 已經是 number，就直接用
      return typeof item.login_count === 'number' ? item.login_count : Number(String(item.login_count).replace(/\D/g, ''));
    });
  
    const option: echarts.EChartsCoreOption = {
      xAxis: {
        type: 'category',
        data: xData
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: yData,
          type: 'line'
        }
      ]
    };
  
    this.myChart.setOption(option);
  }

  // FAQ分類數據
  faqCategories: FaqCategory[] = [
    { categoryName: '課程相關', itemCount: 45, usageRate: 85 },
    { categoryName: '宿舍生活', itemCount: 30, usageRate: 72 },
    { categoryName: '交通資訊', itemCount: 12, usageRate: 45 }
  ];


faqLimit: number = 5; // 初始只顯示 5 筆 FAQ
faqCategoriesDisplay: FaqCategory[] = []; // 畫面上顯示的資料

getFaqCategory() {
  this.trafficService.getFaqCategory().subscribe({
    next: (res) => {
      if (res.isSuccess) {
        this.faqCategories = res.data;
        this.faqCategoriesDisplay = this.faqCategories.slice(0, this.faqLimit);
      }else {
        console.error('API 回傳失敗:', res.message);
      }
    },
    error: (err) => {
      console.error('API 請求錯誤:', err);
    }
  });
}

showMoreFaq() {
  this.faqLimit += 5;
  this.faqCategoriesDisplay = this.faqCategories.slice(0, this.faqLimit);
}


  // 成功率數據
  successRates: SuccessRate[] = [
    { type: '課程查詢', rate: '94.5%', status: 'success' },
    { type: '校園導航', rate: '87.3%', status: 'warning' },
    { type: '活動資訊', rate: '78.9%', status: 'error' }
  ];


  getMeetingChart() {
    // const chartDom = document.getElementById('meetingChart')!;
    // const myChart = echarts.init(chartDom);
  
    const option: echarts.EChartsCoreOption = {
      title: {
        text: '94%',            // 中心大字
        subtext: '整體遇時率',
        left: 'center',
        top: 'center',
        textStyle: {
          fontSize: 40,
          fontWeight: 'bold'
        },
        subtextStyle: {
          fontSize: 16,
          color: '#666'
        }
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        bottom: '0',
        left: 'center'
      },
      series: [
        {
          name: '遇時次數',
          type: 'pie',
          radius: ['50%', '70%'],   // 圓環
          avoidLabelOverlap: false,
          label: {
            show: false
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 18,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 40, name: '上午' },
            { value: 25, name: '下午' },
            { value: 20, name: '晚上' },
            { value: 15, name: '其他' }
          ]
        }
      ]
    };
  
    this.myChart.setOption(option);
  }

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
    this.getHourlyData();
    this.getMeetingChart();
    this.getVisterEChart();
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
