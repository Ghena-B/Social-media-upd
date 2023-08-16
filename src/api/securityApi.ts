import {ApiResponseType, instance, ResultCodes} from "./api";

type CaptchaResponseType = {
    url: string
}
export const securityApi = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`).then((response: { data: ApiResponseType<ResultCodes, CaptchaResponseType> }) => {
            return response.data as ApiResponseType<ResultCodes, CaptchaResponseType>
        })
    },
};