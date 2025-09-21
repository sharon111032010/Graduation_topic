export interface ILoginReq {
    account : string;
    password: string;
}
export interface ILoginDataRes{
    userId: string;
    account: string;
}
export interface IRegisterReq {
    name: string;
    stuId : string;
    email: string;
    password: string;
    account: string;
}
export interface IDeleteReq{
    account: string; 
    password: string;
    email: string;
}
