import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login'
import Perros from '../components/Perros'
import Duenos from '../components/Duenos'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Login
  },
  {
    path: '/perros',
    name: 'Perros',
    component: Perros
  },
  {
    path: '/duenos',
    name: 'Duenos',
    component: Duenos
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
