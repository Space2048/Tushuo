import axios from "axios";
const instance = axios.create({
    baseURL: '/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    },
})

/**
 * 获取热门图片列表
 * @param {} pageNum 
 * @param {*} pageSize 
 * @returns 
 */
export function getHotWork(pageNum, pageSize) {
    let url = "image/hotlist?pageNum=" + pageNum + "&pageSize=" + pageSize;
    return instance.get(url)
}

export function getRecommendWork(pageSize) {
    let url = "image/recommendlist?number=" + pageSize;
    return instance.get(url)
}

// 作品点赞
export function upLike(workId) {
    let url = "image/like?workId=" + workId
    return instance.get(url)
}

//获取相关标签
export function searchTags(value) {
    let url = "tags/search?value=" + value
    return instance.get(url)
}

//上传作品
export function upwork(val) {
    return instance.post("/work/upload", val)
}

//翻译标签
export function tranTag(value) {
    let url = "tags/translate?value=" + value
    return instance.get(url)
}

//上传标签
export function upTags(val) {
    return instance.post("/tags/save", val)
}

//获取稿件全部列表
export function getAll(pageNum, status) {
    let url = "/work/manuAll?pageNum=" + pageNum + "&status=" + status;
    return instance.get(url)
}

//获取喜欢的作品
export function getLoveWork() {
    return instance.get("/image/getLoveWork")
}

//根据分类获取作品
export function getType(type) {
    return instance.get("/image/getType?type=" + type)
}