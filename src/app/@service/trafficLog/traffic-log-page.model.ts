export interface StatCard {
    number: string;
    label: string;
}

export interface DataItem {
    label: string;
    value: string;
    isHighlight?: boolean;
}

export interface FaqCategory {
    name: string;
    questionCount: number;
    usageRate: number;
}

export interface SuccessRate {
    type: string;
    rate: string;
    status: 'success' | 'warning' | 'error';
}

export interface UnknownQuestion {
    msg: string;
    count: number;
}

export interface VisitorStat {
    identity: string;
    usageCount: number;
    averageDuration: string;
}