export interface IHistoryItem {
    menuId: string,
    title: string,
    createtime: string,
} 
export interface IChatMessage {
    type: string; // '1' 為使用者, '0' 為系統   
    msg: string;
    createTime: string; // 格式化後的時間字串
}