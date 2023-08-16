import {GetItemsType, instance} from "./api";

export const usersApi = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then((response: { data: GetItemsType }) => {
            return response.data as GetItemsType
        })
    }
}