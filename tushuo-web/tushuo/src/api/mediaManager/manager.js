import axios from "axios";
const instance = axios.create({
    baseURL: '/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    },
})

export function getHotWork(pageNum, pageSize) {
    let url = "image/hotlist?pageNum=" + pageNum + "&pageSize=" + pageSize;
    return instance.get(url)
}