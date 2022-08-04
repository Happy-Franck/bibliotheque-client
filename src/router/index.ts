import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import http from '@/axios';
import NavbarAdmin from '../components/NavbarAdmin.vue'
import NavbarMenu from '../components/NavbarMenu.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import LivresView from '../views/LivresView.vue'
import LivreItem from '../views/LivreItem.vue'
import MembresView from '../views/MembresView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/',
    component: NavbarMenu,
    children: [
      {
        path: 'login',
        name: 'login',
        component: LoginView
      },
      {
        path: 'register',
        name: 'register',
        component: RegisterView
      },
    ]
  },
  {
    path: '/admin/',
    component: NavbarAdmin,
    beforeEnter: async () => {
      await http.interceptors.response.use(
        (response) => {
          return response
        },
        (error) => {
          if(error.response.status == 401){
            router.push('/login');
          }
          return error;
        }
      )
    },
    children: [
      {
        path: 'livres',
        name: 'livres',
        component: LivresView
      },
      {
        path: 'livres/:id',
        name: 'livreItem',
        component: LivreItem,
        props: true,
      },
      {
        path: 'membres',
        name: 'membres',
        component: MembresView
      },
    ]
  },
]



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router
