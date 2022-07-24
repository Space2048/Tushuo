import axios from 'axios';



// 登录方法
export function login(identifier, credential) {
    let data = { 'identifier': identifier, 'credential': credential }
    return axios.post(`http://localhost/test/login/`, data)
}

// export function login(ideantifier,credential){
//     return request('http::/localhost/text/login/')
// }

//注册方法