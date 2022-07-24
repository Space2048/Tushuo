// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'
import axios from 'axios'
import { VueMasonryPlugin } from 'vue-masonry'
import { checktoken } from "@/api/api"

Vue.use(VueMasonryPlugin)
Vue.use(Vuetify)
import "vuetify/dist/vuetify.min.css"
import colors from 'vuetify/lib/util/colors'
/* eslint-disable no-new */

// 切换路由之前 导航守卫  路由拦截
router.beforeEach((to, from, next) => {
    //只要不是默认登录 都开启路由验证
    if (to.meta.requireAuth == true) {
        //验证用户是否登录 token
        checktoken().then(
            res => {
                if (res.data == 1) {
                    next()
                } else
                    next('/registe')
            }
        )
    } else {
        next()
    }
    // to 要跳转的路由 from 来自于哪里  next 下一步
    // 如果用户未能验证身份，则 `next` 会被调用两次
    // next() //执行下一步
    // console.log(to)
    // console.log(from)

})

new Vue({
    vuetify: new Vuetify({

    }),
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
}).$mount('#app')