// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import VueResource from 'vue-resource'
import Axios from 'axios'
import * as Filter from './assets/js/filter.js'



Vue.config.productionTip = false
// Vue.use(VueResource)
var instance = Axios.create({
  baseURL: process.env.API_HOST,
});
var comApi = Axios.create({
  baseURL: process.env.COM_hOST,
});
Vue.prototype.$axios = instance;
Vue.prototype.$comAxios = comApi;
Object.keys(Filter).forEach(key => {
    Vue.filter(key, Filter[key])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

router.beforeEach((to, from, next) => {
 if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
 	next('/login'); 
 }else{
 	next();
 }
})
