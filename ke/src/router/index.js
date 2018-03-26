import Vue from 'vue'
import Router from 'vue-router'
import Index from '../view/index'
import Cate from '../view/page/cate'
import Plan from '../view/page/plan'
import Login from '../view/page/login'
import CourseDetail from '../view/page/courseDetail'
import CourseList from '../view/page/courseList'
    
Vue.use(Router)

export default new Router({ 
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/Cate',
            name: 'Cate',
            component: Cate
        },
        {
            path: '/Plan',
            name: 'Plan',
                meta: {
                requireAuth: true
            },
            component: Plan
        },
        {
            path: '/Login',
            name: 'Login',
            meta: {
                requireAuth: false
            },
            component: Login
        },
        {
            path: '/CourseDetail/:id',
            name: 'CourseDetail',
            component: CourseDetail
        },
        {
            path: '/CourseList',
            name: 'CourseList',
            component: CourseList
        }
    ]
})
