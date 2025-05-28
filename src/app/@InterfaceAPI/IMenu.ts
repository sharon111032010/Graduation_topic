// 創建 目錄 請求值
export interface ICreateMenuRes{
    title :string;
    userId :string;
    createTime :string;
}
// 創建 目錄 回傳資料
export interface IcreateMenuDataReq{
    userId :string;
}
// 取得目錄 請求值
export interface IGetMenuRes{
    userId :string|undefined;
}
// 取得目錄 回傳資料
export interface IgetMenuDataReq{
    title :string;
    userId :string;
    createTime :string;
    menuId :string;
}