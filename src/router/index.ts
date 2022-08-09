import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import http from '@/axios';
import NavbarAdmin from '../components/NavbarAdmin.vue'
import NavbarUser from '../components/NavbarUser.vue'
import NavbarMenu from '../components/NavbarMenu.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import LivresView from '../views/LivresView.vue'
import LivreAdd from '../views/LivreAdd.vue'
import LivreItem from '../views/LivreItem.vue'
import LivreEdit from '../views/LivreEdit.vue'
import BookUser from '../views/BookUser.vue'
import MembresView from '../views/MembresView.vue'
import MembresEdit from '../views/MembresEdit.vue'
import ProfilView from '../views/ProfilView.vue'
import CategoryAdd from '../views/CategoryAdd.vue'
import CategoryView from '../views/CategoryView.vue'
import CategoryEdit from '../views/CategoryEdit.vue'

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
      if(localStorage.getItem('role') != 'admin'){
        router.go(-1)
      }
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
        path: 'profil',
        name: 'profilAdmin',
        component: ProfilView
      },
      {
        path: 'livres',
        name: 'livre',
        component: LivresView
      },
      {
        path: 'livres/ajout',
        name: 'livreajout',
        component: LivreAdd
      },
      {
        path: 'livres/:id',
        name: 'livreItem',
        component: LivreItem,
        props: true,
      },
      {
        path: 'livres/:id/edit',
        name: 'livreEdit',
        component: LivreEdit,
        props: true,
      },
      {
        path: 'membres',
        name: 'membres',
        component: MembresView
      },
      {
        path: 'membres/:id/edit',
        name: 'membresEdit',
        component: MembresEdit,
        props: true,
      },
      {
        path: 'categories/ajout',
        name: 'categoryadd',
        component: CategoryAdd
      },
      {
        path: 'categories',
        name: 'category',
        component: CategoryView
      },
      {
        path: 'categories/:id/edit',
        name: 'categoriesedit',
        component: CategoryEdit,
        props: true,
      },
    ]
  },
  {
    path: '/user/',
    component: NavbarUser,
    beforeEnter: async () => {
      if(localStorage.getItem('role') != 'user'){
        router.go(-1)
      }
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
        name: 'books',
        component: BookUser
      },
      {
        path: 'livres/:id',
        name: 'bookItemUser',
        component: LivreItem,
        props: true,
      },
    ]
  }
]



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router
