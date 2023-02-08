import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import UserlistView from '@/views/UserlistView.vue';
import UserprofileView from '@/views/UserprofileView.vue';
import RegisterView from '@/views/RegisterView.vue';
import LoginView from '@/views/LoginView.vue';
import NotfoundView from '@/views/NotfoundView.vue'; 

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/userlist/',
    name: 'userlist',
    component: UserlistView
  },
  {
    path: '/userprofile/:userId/',
    name: 'userprofile',
    component: UserprofileView
  },
  {
    path: '/register/',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/login/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/404/',
    name: '404',
    component: NotfoundView
  },
  {
    // 点表示可以匹配任意字符，*表示可以匹配任意长度
    // 这样写就相当于switch中的default
    path: '/:catchAll(.*)',
    redirect: "/404/"
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
