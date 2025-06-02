// 創建 目錄 請求值
export interface ICreateMenuReq{
    title :string;
    userId :string;
    createTime :string;
}
// 創建 目錄 回傳資料
export interface IcreateMenuDataRes{
    userId :string;
}
// 取得目錄 請求值
export interface IGetMenuReq{
    userId :string|undefined;
}
// 取得目錄 回傳資料
export interface IgetMenuDataRes{
    title :string;
    userId :string;
    createTime :string;
    menuId :string;
}