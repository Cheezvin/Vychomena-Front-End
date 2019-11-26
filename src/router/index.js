import Vue from 'vue'
import Router from 'vue-router'

const DashboardLayout = () => import(/*webpackChunkName:"dashboard"*/'../components/dashboardLayout.vue')
const UserDashboardLayout = () => import(/*webpackChunkName:"dashboard"*/'../components/userDashboardLayout.vue')
const landingPage = () => import(/*webpackChunkName:"dashboard"*/'../components/landingPage.vue')
const loginLayout = () => import(/*webpackChunkName:"dashboard"*/'../components/loginLayout.vue')
const logoutLayout = () => import(/*webpackChunkName:"dashboard"*/'../components/logoutLayout.vue')
const registerLayout = () => import(/*webpackChunkName:"dashboard"*/'../components/registerLayout.vue')

function loadView(view){
    return()=>import(/*webpackChunkName:"view-[request]"*/`../components/dashboardContents/${view}.vue`)
}

function userLoadView(view){
    return()=>import(/*webpackChunkName:"view-[request]"*/`../components/userDashboardContents/${view}.vue`)
}

const routes = [
    {
        path:'/',
        component: UserDashboardLayout,
        children: [
            {
                name: 'Home',
                path: '/',
                component: userLoadView('home')
            },
            {
                name: 'detail',
                path: '/detail',
                component: userLoadView('shopDetail')
            },
            {
                name: 'cart',
                path: '/cart',
                component: userLoadView('cart')
            },
            {
                name: 'Home',
                path: '/home',
                component: userLoadView('home')
            },
            {
                name: 'Shop',
                path: '/shop',
                component: userLoadView('shop')
            },
            {
                name: 'Contact',
                path: '/contact',
                component: userLoadView('contact')
            },
            {
                name: 'About',
                path: '/about',
                component: userLoadView('about')
            },
            {
                name: 'Profile',
                path: '/profile',
                component: userLoadView('profile')
            },
            {
                name: 'Edit Profile',
                path: '/editprofile',
                component: userLoadView('editProfile')
            }
        ],
    },
    {
        path:'/admin',
        component: DashboardLayout,
        children: [
            {
                name: 'Item',
                path: '/item',
                component: loadView('item')
            },
            {
                name: 'Voucher',
                path: '/voucher',
                component: loadView('voucher')
            },
            {
                name: 'User',
                path: '/user',
                component: loadView('user')
            },
        ],
        beforeEnter: (to, from, next) => {
            if(localStorage.getItem('token'))
            {
                next();
            }
            else{
                next('/login');
            }
        }
    },
    {
        path: '/landing',
        component: landingPage,
        name: 'Landing'
    },
    {
        name: 'Login',
        path: '/login',
        component: loginLayout
    },
    {
        name: 'Logout',
        path: '/logout',
        component: logoutLayout
    },
    {
        name: 'Register',
        path: '/register',
        component: registerLayout
    }
]
Vue.use(Router)

const router = new Router({mode: 'history', routes: routes})

export default router