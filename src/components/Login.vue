<template>
  <div>
    <h1>Login</h1>
    <p>email</p>
    <input type="text" v-model="user.email" />
    <p>password</p>
    <input type="text" v-model="user.password" />
    <button @click="login">Login</button>
  </div>
</template>

<script>

  import auth from '../auth'

  export default {
    name : 'login',
    data() {
      return {
        showConfirm: false,
        user : {
          email: 'sbwoo87@gmail.com',
          password: 'password'
        }

      }
    },
    methods: {
      login: function () {
//        this.$http.post('http://localhost:3000/auth/login', this.user)
//          .then(function (response) {
//            //this.get();
//            console.log(response)
//          });

        auth.signin(this, this.user.email, this.user.password);

      }
    }
  }

</script>

<style>
  @import '../assets/css/w3.css';

</style>
