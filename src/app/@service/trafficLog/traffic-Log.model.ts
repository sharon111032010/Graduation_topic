export interface StatisticCard {
    number: string;
    label: string;
}

export interface CategoryData {
    name: string;
    questionCount: number;
    usage: number;
}

export interface SuccessRateData {
    type: string;
    rate: number;
    likes: number;
    dislikes: number;
    status: 'success' | 'warning' | 'error';
    statusText: string;
}

export interface UnhandledQuestion {
    question: string;
    time: string;
    count: number;
    status: 'pending' | 'processed';
    statusText: string;
}

export interface UserStatistic {
    type: string;
    icon: string;
    usage: number;
    percentage: number;
    avgDuration: string;
}