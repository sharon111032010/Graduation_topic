// 定義用於創建使用者請求的介面
export interface ICreateUserReq {
    userName: string;   // 使用者名稱
    userAccount: string; // 使用者帳號
    userGender: string; // 使用者性別
}

// 定義 API 回應的通用介面，泛型 T 代表資料類型
export interface IApiRes<T> {
    isSuccess: boolean; // 是否成功
    msg: string;        // 回應訊息
    data: T;            // 回應的資料，類型由泛型決定
}

// 定義創建使用者後的回應介面
export interface ICreateUserRes {
    userId: string;      // 使用者 ID
    userName: string;    // 使用者名稱
    userAccount: string; // 使用者帳號
    userGender: string;  // 使用者性別
    createTime: string;  // 創建時間
}

// 定義更新使用者後的回應介面
export interface IUpdateUserRes {
    userId: string;      // 使用者 ID
    userName: string;    // 使用者名稱
    userAccount: string; // 使用者帳號
    userGender: string;  // 使用者性別
    updateTime: string;  // 更新時間
    createTime: string;  // 創建時間
}

// 定義單個使用者項目的介面，可能用於列表顯示
export interface IUserItem {
    userId: number;      // 使用者 ID
    userName: string;    // 使用者名稱
    userAccount: string; // 使用者帳號
    userGender: string;  // 使用者性別
    createTime: string;  // 創建時間
}

// 定義完整的使用者資訊介面，包含更多詳細資訊
export interface IUserInfo {
    userId: number;      // 使用者 ID
    userName: string;    // 使用者名稱
    userAccount: string; // 使用者帳號
    userGender: string;  // 使用者性別
    createTime: string;  // 創建時間
    updateTime: string;  // 更新時間
    department: string;  // 所屬部門
    studentId: string;   // 學號
    email: string;       // 電子郵件
    phone: string;       // 電話
    password: string;    // 密碼
}

// 定義基本使用者資訊的介面，可能用於簡化顯示
export interface IUser {
    userId: number;      // 使用者 ID
    userName: string;    // 使用者名稱
    userAccount: string; // 使用者帳號
    createTime: Date;    // 創建時間
}

// 定義登入表單的介面
export interface ILoginUserForm {
    stuId?: string | null;  // 學號（可選）
    password?: string | null; // 密碼（可選）
}

// 定義註冊使用者表單的介面
export interface IRegisterUserForm {
    name?: string | null;       // 使用者姓名（可選）
    department?: number | null; // 部門（可選）
    stuId?: number | null;      // 學號（可選）
    password?: string | null;   // 密碼（可選）
    email?: string | null;      // 電子郵件（可選）
    phone?: string | null;      // 電話（可選）
    account?: string | null;    // 帳戶名稱（可選）
}

// 定義忘記密碼表單的介面
export interface IForgetPasswordUserForm {
    stuId?: string | null;  // 學號（可選）
    email?: string | null;  // 電子郵件（可選）
}

// 定義 API 回應的通用介面（類似 IApiRes）
export interface IApiResult<T> {
    isSuccess: boolean; // 是否成功
    message: string;    // 回應訊息
    data: T;            // 回應的資料，類型由泛型決定
}

// 定義包含 Token 的 API 回應介面
export interface IApiResultToken<T> {
    isSuccess: boolean; // 是否成功
    message: string;    // 回應訊息
    data: T;            // 回應的資料
    token: string;      // 用戶驗證 Token
}

// 定義從資料庫查詢使用者時的結果結構
export interface userDBResult {
    id: string;         // 使用者 ID
    name: string;       // 使用者名稱
    department: string; // 部門
    studentId: string;  // 學號
    password: string;   // 密碼
    email: string;      // 電子郵件
    phone: string;      // 電話
}
