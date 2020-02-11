import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/trips',
    name: 'trips',
    component: () => import(/* webpackChunkName: "about" */ '../views/TripsHome.vue')
  },
  {
    path: '/my-trip/:id',
    name: 'my-trip',
    component: () => import(/* webpackChunkName: "about" */ '../views/MyTrip.vue')
  },
    {
      path: '/my-trip/:tripId/request/:id',
      name: 'my-trips-request',
      component: () => import(/* webpackChunkName: "about" */ '../views/MyTripsRequest.vue')
    },
  {
    path: '/requests',
    name: 'requests',
    component: () => import(/* webpackChunkName: "about" */ '../views/RequestsHome.vue')
  },
  {
    path: '/my-request/:id',
    name: 'my-request',
    component: () => import(/* webpackChunkName: "about" */ '../views/MyRequest.vue')
  }
  // {
  //   path: '/myRequest/:id',
  //   name: 'myRequest',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/MyRequest.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
