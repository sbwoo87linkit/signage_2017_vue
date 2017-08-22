import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Schedule from '../components/schedule/Schedule.vue'
import Content from '../components/content/Content.vue'
import User from '../components/User.vue'
import Customer from '../components/Customer.vue'
import Login from '../components/Login.vue'
import Signup from '../components/Signup.vue'

import Group from '../components/group/Group.vue'
import GroupAdd from '../components/group/GroupAdd.vue'
import GroupDelete from '../components/group/GroupDelete.vue'
import GroupEdit from '../components/group/GroupEdit.vue'



import Sidemenu from '../components/Sidemenu.vue'
import CustomerList from '../components/cutomer/CustomerList.vue'
import CustomerAdd from '../components/cutomer/CustomerAdd.vue'
import CustomerEdit from '../components/cutomer/CustomerEdit.vue'
import CustomerDelete from '../components/cutomer/CustomerDelete.vue'



const Side = { template: '<div>side</div>' }
// const CustomerList = { template: `
// <div>
// <button>+ Customer</button>
// <div>customer list</div>
// <ul>
// <li>aaa</li>
// <li>aaa</li>
// </ul>
// </div>
// ` }


Vue.use(Router)


export default new Router({
  // history: true,
  mode: 'history',
  routes: [
    // {
    //   path: '*',
    //   redirect: '/schedule'
    // },
    /*

    {path: '/', component: List},
		{path: '/product/:product_id', component: Product, name: 'product'},
		{path: '/add-product', component: AddProduct},
		{path: '/product/:product_id/edit', component: ProductEdit, name: 'product-edit'},
		{path: '/product/:product_id/delete', component: ProductDelete, name: 'product-delete'}



     */

    //{path: '/group', component: List},
    // {path: '/group/:group_id', component: Product, name: 'group'},

    // {path: '/', components: { default: CustomerList, sidemenu: { template: `<div>&nbsp;</div>` } }, name: 'customer-list'},
    // {path: '/', components: { default: CustomerList }, name: 'customer-list'},

    // {
    //   path: '/customer',
    //   name: 'Customer',
    //   component: Customer
    // },

    {path: '/customer/list', components : { default: CustomerList, sidemenu:Sidemenu}, name: 'customer-list'},
    {path: '/customer/add', components : { default: CustomerAdd, sidemenu:Sidemenu}, name: 'customer-add'},
    {path: '/customer/:id/delete', components : { default: CustomerDelete, sidemenu:Sidemenu}, name: 'customer-delete' },
    {path: '/customer/:id/edit', components : { default: CustomerEdit, sidemenu:Sidemenu}, name: 'customer-edit' },

    // {path: '/group/add', components: { default: GroupAdd, sidemenu: Sidemenu }, name: 'group-add'},
    // {path: '/group/:group_id/edit', component: GroupEdit, name: 'group-edit'},
    // {path: '/group/:group_id/delete', component: GroupDelete, name: 'group-delete'},

    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    // {
    //   path: '/schedule/',
    //   name: 'Groups',
    //   components : {
    //     sidemenu : Sidemenu,
    //     default : Group,
    //   }
    // },
    {
      path: '/schedule/:id',
      name: 'Schedule',
      component: Schedule,
    },

    {
      path: '/content/:id',
      name: 'Content',
      component: Content
    },


    {
      path: '/group/add',
      component: GroupAdd,
      // components : {
      //   sidemenu : Sidemenu,
      //   default : GroupAdd,
      // }
    },
    {
      path: '/group/:id/delete',
      component: GroupDelete,
      // components : {
      //   sidemenu : Sidemenu,
      //   default : GroupDelete,
      // }
    },
    {
      path: '/group/:id/edit',
      component: GroupEdit,
      // components : {
      //   sidemenu : Sidemenu,
      //   default : GroupEdit,
      // }
    },

    {
      path: '/user',
      name: 'User',
      component: User
    },
  ]
})
