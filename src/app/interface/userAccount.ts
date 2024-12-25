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

export interface IUser {
    userId: number;
    userName: string;
    userAccount: string;
    createTime: Date;
}
export interface ILoginUserForm {
    account?: string | null;
    password?: string | null;
}

export interface IApiResult<T> {
    isSuccess: boolean;
    message: string;
    data: T;
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

