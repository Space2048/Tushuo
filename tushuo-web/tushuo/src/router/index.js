import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import selfIndex from '@/page/selfPage/index'
import logpg from '@/page/login/login'
import register from '@/page/register/register'
import axios from "axios";
Vue.use(Router)
export var checktoken = (token) => axios.get("/users/checktoken", { params: { token } })
    // 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

//公共路由
// export const constantRoutes = [{
//         path: '/login',
//         name: 'logpg',
//         component: logpg
//     },
//     {
//         path: '/registe',
//         name: 'registePage',
//         component: register
//     },
//     {
//         path: '/',
//         component: selfIndex,
// children: [{
//         path: 'index',
//         component: () =>
//             import ("@/page/block/hot"),
//     },

// ],
//     },
// ]

// export default new Router({
//     mode: 'history', // 去掉url中的#
//     scrollBehavior: () => ({ y: 0 }),
//     routes: constantRoutes
// })


export default new Router({
    // mode: 'history',
    routes: [{
            path: '/registe',
            name: 'registePage',
            component: register,
            meta: {
                title: '注册'
            }
        },
        {
            path: '',
            redirect: '/p1',
            component: selfIndex,
        },
        {
            path: '/p1',
            component: selfIndex,
            children: [{
                    path: '',
                    component: () =>
                        import ("@/page/block/hot"),
                    meta: {
                        title: '首页',
                        requireAuth: false
                    }
                },
                {
                    path: 'recomd',
                    component: () =>
                        import ("@/page/block/recommend"),
                    meta: {
                        title: '推荐',
                        requireAuth: true
                    }
                },
                {
                    path: 'home',
                    component: () =>
                        import ("@/page/leftpage/home"),
                    meta: {
                        title: '个人中心',
                        requireAuth: true
                    }
                },
                {
                    path: 'love',
                    component: () =>
                        import ("@/page/leftpage/love"),
                    meta: {
                        title: '我的喜欢',
                        requireAuth: true
                    }
                },
                {
                    path: 'attention',
                    component: () =>
                        import ("@/page/leftpage/attention"),
                    meta: {
                        title: '我的关注',
                        requireAuth: true
                    }
                },
                {
                    path: 'message',
                    component: () =>
                        import ("@/page/leftpage/message"),
                    meta: {
                        title: '消息中心',
                        requireAuth: true
                    }
                },
                {
                    path: 'myworks',
                    component: () =>
                        import ("@/page/leftpage/myworks"),
                    meta: {
                        title: '作品列表',
                        requireAuth: true
                    }
                },
                {
                    path: 'upwork',
                    component: () =>
                        import ("@/page/block/workupload"),
                    meta: {
                        title: '上传页面',
                        requireAuth: true
                    }
                },
                {
                    path: 'edit',
                    component: () =>
                        import ("@/page/block/edit"),
                    meta: {
                        title: '作品编辑',
                        requireAuth: true
                    }
                },
                {
                    path: 'workdetail/:id',
                    component: () =>
                        import ("@/page/block/workdetail"),
                    meta: {
                        title: '作品详情页',
                    }
                },
                {
                    path: 'userdetail/:id',
                    component: () =>
                        import ("@/page/block/userdetail"),
                    meta: {
                        title: '用户详情页详情页',
                    }
                }
                // {
                //     path: '*',
                //     redirect: '/404'
                // }
            ]
        },

        {
            path: '/recomd',
            component: selfIndex,
            children: [{
                path: 'index',
                component: () =>
                    import ("@/page/block/recommend"),
            }]
        },
        {
            path: '*',
            component: () =>
                import ("@/page/error/404"),
            meta: {
                title: '页面走丢了！'
            }
        }

        //sdjaskdjaksjdaskdasliofeow
        //阿ssss

    ]
})