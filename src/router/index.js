import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Schedule from '../components/Schedule.vue'
import Content from '../components/Content.vue'
import User from '../components/User.vue'
import Customer from '../components/Customer.vue'
Vue.use(Router)

export default new Router({
  history: true,
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/schedule',
      name: 'Schedule',
      component: Schedule
    },
    {
      path: '/content',
      name: 'Content',
      component: Content
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/customer',
      name: 'Customer',
      component: Customer
    },
  ]
})
