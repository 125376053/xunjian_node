import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios";
Vue.prototype.$http = axios;
//Vue.prototype.baseUrl = "http://waterapi.qijiatech.com";
//Vue.prototype.baseUrl = process.env.API_ROOT
//Vue.prototype.baseUrl = ''
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(Mint);
Vue.prototype.busEvent = new Vue();
import * as utils from "./utils";
Vue.use(utils);

import store from "./store";
Vue.use(store);

//全局指令
import * as direct from './directive';
Object.keys(direct).forEach(key => {
    Vue.directive(key,direct[key])
});


router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next()
    } else {
        if (!to.meta.requiresAuth && !localStorage.getItem('user')) {
            next({
                path: '/login'
            })
        } else {
            next()
        }
    }
    next()
})

axios.interceptors.request.use(function(config) {
    console.log('请求拦截');
    if (localStorage.getItem("user")) {
        config.headers['token'] = JSON.parse(localStorage.getItem("user")).token;
    }
    return config
}, function(error) {
    console.log('请求错误拦截');
    return error
});

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use(res => {
    console.log('响应拦截');
    if(res.status==200){
        // 响应成功
        console.log(res);
        if(res.data.code==400){
            router.push('/login')
            console.log('登录失效')
        }
    }else{

    }
    return res;
}, (error) => {
    console.log('响应错误拦截');
    return error;
});


let vm=new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
});


