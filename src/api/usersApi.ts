import {GetItemsType, instance} from "./api";

export const usersApi = {
    getUsers(currentPage: number, pageSize: number, term: string = '', friend: boolean | null = null) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}&term=${term}&friend=${friend}`).then((response: {
            data: GetItemsType
        }) => {
            return response.data as GetItemsType
        })
    }
}