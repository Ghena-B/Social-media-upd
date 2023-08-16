import {instance} from "./api";

export const followApi = {
    unfollowUser(userID: number) {
        return instance.delete(`follow/${userID}`).then((response: any) => {
            return response.data
        })
    },
    followUser(userID: number) {
        return instance.post(`follow/${userID}`).then((response: any) => {
            return response.data
        })
    }
}