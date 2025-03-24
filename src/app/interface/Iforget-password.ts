
// 定義 API 回應的通用介面，泛型 T 代表資料類型
export interface IApiResult<T> {
    isSuccess: boolean; // 是否成功
    message: string;    // 回應訊息
    data: T;            // 回應的資料，類型由泛型決定
}

export interface IsendEmaiReq{
    email: string|null;
    account: string|null;
}

export interface IresetPasswordReq{
    newPassword: string;
    email: string;
    token: string;
} 