// 存對話紀錄 的 請求值 
export interface ISaveMsgReq {
    userId: string;
    menuId: string;
    createTime: string;
    msg: string;
    msgType: string;
}
// 儲存對話紀錄 的 回傳資料 
export interface ISaveMsgDataRes {
    userId: string;
    menuId: string;
    createTime: string;
    msg: string;
    msgType: string;
}
// 取得對話紀錄 的 請求值
export interface IGetMsgReq {
    userId: string;
    menuId: string;
}
// 取得對話紀錄 的 回傳資料
export interface IGetMsgDataRes {
    userId: string;
    menuId: string;
    createTime: string;
    msg: string;
    msgType: string;
}