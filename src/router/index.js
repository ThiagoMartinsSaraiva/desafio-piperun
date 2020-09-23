import Vue from 'vue'
import Router from 'vue-router'
import Login from '..//pages/Login.vue'
import Activities from '../pages/Activities.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/activities',
      name: 'Activities',
      component: Activities
    },
    {
      path: '/activity/:id?',
      name: 'Activity',
      component: () => import('../pages/ActivityForm.vue')
    }
  ]
})
