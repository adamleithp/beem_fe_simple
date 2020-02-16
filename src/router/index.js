import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/HomeView.vue'

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
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/trips',
    name: 'trips',
    component: () => import(/* webpackChunkName: "about" */ '../views/TripsHomeView.vue')
  },
  {
    path: '/my-trip/:id',
    name: 'my-trip',
    component: () => import(/* webpackChunkName: "about" */ '../views/MyTripView.vue')
  },
    {
      path: '/my-trip/:tripId/request/:id',
      name: 'my-trips-request',
      component: () => import(/* webpackChunkName: "about" */ '../views/MyTripsRequestView.vue')
    },
  {
    path: '/requests',
    name: 'requests',
    component: () => import(/* webpackChunkName: "about" */ '../views/RequestsHomeView.vue')
  },
  {
    path: '/my-request/:id',
    name: 'my-request',
    component: () => import(/* webpackChunkName: "about" */ '../views/MyRequestView.vue')
  }
  // {
  //   path: '/myRequest/:id',
  //   name: 'myRequest',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/MyRequestView.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
