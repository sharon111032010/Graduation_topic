// 存對話紀錄 的 請求值 
export interface ISaveMsgReq {
    userId: string | undefined;
    menuId: string;
    createTime: string;
    msg: string;
    msgType: boolean;
}
// 儲存對話紀錄 的 回傳資料 
export interface ISaveMsgDataRes {
    userId: string|undefined;
    menuId: string;
    createTime: string;
    msg: string;
    msgType: string;
}
// 取得對話紀錄 的 請求值
export interface IGetMsgReq {
    userId: string| undefined;
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