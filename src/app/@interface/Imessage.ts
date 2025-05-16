export interface IMessageLog {
    MessageId: number; // 訊息 ID
    UserId: string; // 使用者 ID
    MessageType: number; // 訊息類型 (0: 使用者, 1: 機器人)
    MessageText: string; // 訊息內容
    CreatedTime: string; // 訊息創建時間 (ISO 格式)
    MenuId: number; // 菜單 ID (如果有的話)
}
export interface IApiResult<T> {
    isSuccess: boolean; // 是否成功
    message: string;    // 回應訊息
    data: T;            // 回應的資料，類型由泛型決定
}

/*
create table msg 
(
	msg nvarchar(max),
	userId uniqueidentifier,
	creatTime dateTime default (getdate()),
	menuId uniqueidentifier,
	msgTpye bit
);

create table menu  
(
	title nvarchar(max),
	userId uniqueidentifier,
	creatTime dateTime default getDate(),
	menuId uniqueidentifier
);

*/