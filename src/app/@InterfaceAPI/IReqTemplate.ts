export interface IApiReq<T>{
    isSuccess : boolean;
    message : string ;
    data :T;
}