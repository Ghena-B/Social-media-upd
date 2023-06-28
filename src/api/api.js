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
    },
    login(email, password, rememberMe = false, captcha = null) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha}).then((response) => {
            return response.data
        })
    },
    logout() {
        return instance.delete(`auth/login` ).then((response) => {
            return response.data
        })
    }
}

export const profileApi = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`).then((response) => {
            return response.data
        })
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`).then((response) => {
            return response.data
        })
    },
    updateStatus(status) {
        return instance.put(`profile/status/`, {status: status}).then((response) => {
            return response.data
        })
    },
    updatePhoto(file) {
        const formData = new FormData();
        formData.append("selectedFile", file)
        return instance.put(`profile/photo/`, formData, {headers: { "Content-Type": "multipart/form-data"}}).then((response) => {
            return response.data
        })
    },
    updateUserInfo(data) {
        return instance.put(`profile`, data).then((response) => {
            return response.data
        })
    }
};
export const securityApi = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`).then((response) => {
            return response.data
        })
    },
};