import {ApiResponseType, instance, ResultCodes, ResultCodesWithCaptcha} from "./api";

export const authApi = {
    authMe() {
        return instance.get(`auth/me`).then((response: {
            data: ApiResponseType<ResultCodes, AuthMeApiResponseType>
        }) => {
            return response.data as ApiResponseType<ResultCodes, AuthMeApiResponseType>
        })
    },
    login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha}).then((response: {
            data: ApiResponseType<ResultCodes | ResultCodesWithCaptcha, LoginApiResponseType>
        }) => {
            return response.data as ApiResponseType<ResultCodes | ResultCodesWithCaptcha, LoginApiResponseType>
        })
    },
    logout() {
        return instance.delete(`auth/login`).then((response: {
            data: ApiResponseType<{}, ResultCodes>;
        }) => {
            return response.data as ApiResponseType<{}, ResultCodes>
        })
    }
}

type AuthMeApiResponseType = {
    id: number
    email: string
    login: string
}
type LoginApiResponseType = {
    email: string
    password: string
    rememberMe: boolean
}