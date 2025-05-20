// 存對話紀錄 的 請求值 
export interface ISaveMsgRes {
    userId: string;
    menuId: string;
    createTime: string;
    msg: string;
    msgType: string;
}
// 儲存對話紀錄 的 回傳資料 
export interface ISaveMsgDataReq {
    userId: string;
    menuId: string;
    createTime: string;
    msg: string;
    msgType: string;
}
// 取得對話紀錄 的 請求值
export interface IGetMsgRes {
    userId: string;
    menuId: string;
}
// 取得對話紀錄 的 回傳資料
export interface IGetMsgDataReq {
    userId: string;
    menuId: string;
    createTime: string;
    msg: string;
    msgType: string;
}