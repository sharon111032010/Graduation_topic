export interface IApiResult<T>{
    isSuccess :boolean;
    message :string;
    data: T;
}
export interface IChatPageUserInfo{
    userId:string;
    menuId:string;
    name:string;
    //剩下的再補充
}