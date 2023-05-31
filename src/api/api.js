const {default: axios} = require("axios");

const instance = axios.create({
    withCredentials: true,
    headers: {"API-KEY": "Headers: {API_KEY: aaa062f9-3ee2-456c-be0d-291eec7c2ba2}"},
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})

export const usersApi = {
    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then((response) => {
            return response.data
        })
    }
}

export const followApi = {
    unfollowUser(userID) {
       return instance.delete(`follow/${userID}`).then((response) => {
           return response.data
       })
    },
    followUser(userID) {
        return instance.post(`follow/${userID}`).then((response) => {
            return response.data
        })
    }
}

export const authApi = {
    authMe() {
        return instance.get(`auth/me`).then((response) => {
            return response.data
        })
    }
}

export const profileApi = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`).then((response) => {
            return response.data
        })
    }
}