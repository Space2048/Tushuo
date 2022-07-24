import axios from "axios";

// // 环境的切换
// if (process.env.NODE_ENV == 'development') {
//     axios.defaults.baseURL = 'http://loaclhost:80';
// } else if (process.env.NODE_ENV == 'debug') {
//     axios.defaults.baseURL = 'https://www.ceshi.com';
// } else if (process.env.NODE_ENV == 'production') {
//     axios.defaults.baseURL = 'https://www.production.com';
// }

const instance = axios.create({
    baseURL: '/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    },
})

//发送验证码
export function sendEmail(email, uuid) {

    return instance.post("system/code", {
        "code": uuid,
        "email": email,
    })
}

//注册
export function register(identityType, account, password, uuid, verCode) {

    return instance.post("system/registe", {
        "identityType": identityType,
        "identifier": account,
        "credential": password,
        "uuid": uuid,
        "verCode": verCode,
    })
}
//验证用户登陆

//登陆
export function login(identifier, credential) {
    let data = { 'identifier': identifier, 'credential': credential, 'identityType': 1 }
    return instance.post("system/login", data)
}

export function checktoken() {
    return instance.get("/system/islogin")
}

//主页个人信息获取
export function getinfo() {
    return instance.get("system/info")
}

//获取登录用户信息
export function getLoginInfo() {
    return instance.get("system/getLogininfo")
}

//退出登录
export function logout() {
    return instance.get("system/logout")
}

//修改用户信息
export function edit(nickName, collage, major, content) {
    let data = {
        'nickName': nickName,
        'college': collage,
        'major': major,
        'content': content
    }
    return instance.put("system/edit", data)
}