export interface IResponseBody{
    success: boolean,
    data: any,
    message: string,
    code: string,
}

export interface IDialogData {
    title: string,
    message: string,
    buttons: Array<{ 'title': string, 'result': string, 'class': string }>
}
export interface ICacheContent {
    email: string;
    password: string
}