export interface ILoginRes {
    acccount : string;
    password: string;
}
export interface IRegisterRes {
    name: string;
    stuId : string;
    email: string;
    password: string;
    account: string;
}
export interface IDeleteRes {
    account: string; 
    password: string;
    email: string;
}
