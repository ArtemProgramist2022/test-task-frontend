import axios from "axios"

export const userAPI = {
    getUsers(page = 0, limit=5) {
        return axios.get(`https://test.relabs.ru/api/users/list?limit=${limit}&offset=${limit*page}`);
    },
}