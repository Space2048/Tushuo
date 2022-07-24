import axios from "axios";
const instance = axios.create({
    baseURL: '/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    },
})

export function getFriendList() {
    let url = "/message/listFriend"
    return instance.get(url)
}