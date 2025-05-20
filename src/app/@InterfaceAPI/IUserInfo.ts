// chatPage 會用到 資料
export interface IChatPageUserInfo{
    userId:string;
    menuId:string;
    name:string;
    //剩下的再補充
}
// 這是前端給後端的資料
export interface IUserInfoRes{
    userId:string;
}
// 這是後端給前端的資料
export interface IUserInfoDataReq{
    userId:string;
    name:string;
    // 不知道為啥要加時間
    createTime:string;
    email:string;
}
