import {ApiResponseType, instance, ResultCodes} from "./api";
import {PhotosType, ProfileType} from "../APItypes/APItypes";

export const profileApi = {
    getProfile(userId: number) {
        return instance.get(`profile/${userId}`).then((response: { data: ProfileType; }) => {
            return response.data as ProfileType
        })
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/${userId}`).then((response: { data: string; }) => {
            return response.data as string
        })
    },
    updateStatus(status: string) {
        return instance.put(`profile/status/`, {status: status}).then((response: { data: ApiResponseType<{}, ResultCodes>; }) => {
            return response.data as ApiResponseType<{}, ResultCodes>
        })
    },
    updatePhoto(file: File) {
        const formData = new FormData();
        formData.append("selectedFile", file)
        return instance.put(`profile/photo/`, formData, {headers: {"Content-Type": "multipart/form-data"}}).then((response: { data: ApiResponseType<ResultCodes, UpdatePhotoApiResponseType> }) => {
            return response.data as ApiResponseType<ResultCodes, UpdatePhotoApiResponseType>
        })
    },
    updateUserInfo(data: ProfileType) {
        return instance.put(`profile`, data).then((response: { data: ApiResponseType<{}, ResultCodes>; }) => {
            return response.data as ApiResponseType<{}, ResultCodes>
        })
    }
};

type UpdatePhotoApiResponseType = {
    photos: PhotosType
}