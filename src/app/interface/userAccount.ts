export interface ICreateUserReq {
    userName: string;
    userAccount: string;
    userGender: string;
}

export interface IApiRes<T> {
    isSuccess: boolean;
    msg: string;
    data: T;
}

export interface ICreateUserRes {
    userId: string;
    userName: string;
    userAccount: string;
    userGender: string;
    createTime: string;
}

export interface IUpdateUserRes {
    userId: string;
    userName: string;
    userAccount: string;
    userGender: string;
    updateTime: string;
    createTime: string;
}

export interface IUserItem {
    userId: number;
    userName: string;
    userAccount: string;
    userGender: string;
    createTime: string;
}


export interface IUserInfo{
    userId: number;
    userName: string;
    userAccount: string;
    userGender: string;
    createTime: string;
    updateTime: string;
    department: string;
    studentId: string;
    email: string;
    phone: string;
    password: string;

} 

export interface IUser {
    userId: number;
    userName: string;
    userAccount: string;
    createTime: Date;
}
export interface ILoginUserForm {
    stuId?: string | null;
    password?: string | null;
}

export interface IRegisterUserForm {
    name?: string | null;          // 使用者姓名
    department?: number | null;    // 部門
    stuId?: number | null;         // 學號
    password?: string | null;      // 密碼
    email?: string | null;         // 電子郵件
    phone?: string | null;         // 電話
    account?: string | null;       // 帳戶名稱
}

export interface IForgetPasswordUserForm {
    stuId?: string | null;         // 學號
    //stuId?: number | null;         // 學號
    email?: string | null;         // 電子郵件
}

export interface IApiResult<T> {
    isSuccess: boolean;
    message: string;
    data: T;
}
export interface IApiResultToken<T> {
    isSuccess: boolean;
    message: string;
    data: T;
    token: string;  // 新增 token 屬性
}

export interface userDBResult {
    id: string,
    name: string,
    department: string,
    studentId: string,
    password: string,
    email: string,
    phone: string
}

