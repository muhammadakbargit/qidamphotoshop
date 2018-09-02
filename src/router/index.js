import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import Home from '@/components/Home'
import PricesList from '@/components/PricesList'
import Products from '@/components/products/Products'
import Orders from '@/components/orders/Orders'
import Dashboard from '@/components/Dashboard'
import SignUp from '@/components/SignUp'
import SignIn from '@/components/SignIn'
import NotFound from '@/components/NotFound'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        guest: true
      }
    },
    {
      path: '/priceslist',
      name: 'PricesList',
      component: PricesList,
      meta: {
        guest: true
      }
    },
    {
      path: '/products',
      name: 'Products',
      component: Products,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/orders',
      name: 'Orders',
      component: Orders,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
      meta: {
        guest: true
      }
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn,
      meta: {
        guest: true
      }
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = firebase.auth().currentUser 
  if(to.matched.some(record => record.meta.requireAuth)){
    isAuthenticated ? next() : next('/signin')
  } else if(to.matched.some(record => record.meta.guest)) {
    isAuthenticated ? next('/dashboard') : next()
  } else {
    next()
  }
})

export default router