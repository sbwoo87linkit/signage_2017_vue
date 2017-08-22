// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRsource  from 'vue-resource'
import store from './store/store'
import lodash from 'lodash';
import auth from './auth'
import Vue2Filters from 'vue2-filters'


Vue.use(Vue2Filters)
// import VueTimepicker from 'vue2-timepicker'

Object.defineProperty(Vue.prototype, '$lodash', { value: lodash });

Vue.use(VueRsource);
// Vue.use(VueTimepicker)
Vue.config.productionTip = false;

console.clear();
auth.checkAuth();


Vue.http.interceptors.push((request, next)  => {
  request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
  next((response) => {
    if(response.status == 401 ) {
      auth.signout();
      router.go('/login');
    }
  });
});

router.beforeEach((to, from, next) => {
  // if (to.name !== 'Login' && localStorage.getItem('id_token') === null) {
  //   router.push({name:'Login'});
  // } else {
  //   next();
  // }

  next();
})

export const bus = new Vue();

/* eslint-disable no-new */
window.vue = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App,
  }
})
