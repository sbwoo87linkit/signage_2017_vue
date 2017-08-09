import Vue from 'vue';
//import {router} from './app.js';
import router from './router'
import config from './config'

export default {
  user: {
    authenticated: false,
    profile: null
  },
 /* check() {
    let token = localStorage.getItem('id_token')
    if (token !== null) {
      Vue.http.get(
        'api/user?token=' + token,
      ).then(response => {
        this.user.authenticated = true
        this.user.profile = response.data.data
      })
    }
  },*/

  checkAuth() {
    var jwt = localStorage.getItem('id_token')
    if(jwt) {
      this.user.authenticated = true;
      this.user.profile = JSON.parse(localStorage.getItem('profile'))
    }
    else {
      this.user.authenticated = false
    }
  },


/*
  register(context, name, email, password) {
    Vue.http.post(
      'api/register',
      {
        name: name,
        email: email,
        password: password
      }
    ).then(response => {
      context.success = true
    }, response => {
      context.response = response.data
      context.error = true
    })
  },
*/

  register(context, user) {
    Vue.http.post(
      config.url + '/users/signup',
      user
    ).then(response => {
      context.success = true
    }, response => {
      context.response = response.data
      context.error = true
    })
  },



  signin(context, email, password) {
    Vue.http.post(
      config.url + '/users/login',
      {
        email: email,
        password: password
      }
    ).then(response => {
      context.error = false;
      localStorage.setItem('id_token', response.data.token);
      localStorage.setItem('profile', JSON.stringify(response.data.user));

      Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token')
      //
      this.user.authenticated = true
      this.user.profile = response.data.user
      //
      router.push({
        name: 'Schedule'
      })
    }, response => {
      context.error = true
    })
  },
  signout() {
    localStorage.removeItem('id_token')
    localStorage.removeItem('profile')
    this.user.authenticated = false
    this.user.profile = null
    console.log(this.user)

    router.push({
      name: 'Login'
    })

  }
}
