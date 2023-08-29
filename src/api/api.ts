import {UsersType} from "../redux/users-reducer";
import {default as axios} from "axios";

export enum ResultCodes {
    Success = 0,
    Error = 1
}

export enum ResultCodesWithCaptcha {
    CaptchaIsRequired = 10
}

export type ApiResponseType<RC, D = {}> = {
    data: D
    messages: Array<string>
    resultCode: RC
}
export type GetItemsType = {
    items: Array<UsersType>
    totalCount: number
    error: string | null
}
export const instance = axios.create({
    withCredentials: true,
    headers: {"API-KEY": "Headers: {API_KEY: aaa062f9-3ee2-456c-be0d-291eec7c2ba2}"},
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})

