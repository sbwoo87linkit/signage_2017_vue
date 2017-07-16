<template>
  <header>
    <div class="w3-bar w3-white w3-card w3-margin-bottom">
      <span class="w3-bar-item w3-yellow">Signage Manager</span>
      <router-link to="/schedule" class="w3-bar-item w3-button w3-hide-small">Schedule</router-link>
      <router-link to="/content" class="w3-bar-item w3-button w3-hide-small">Content</router-link>
      <router-link to="/user" class="w3-bar-item w3-button w3-hide-small">User</router-link>
      <router-link to="/customer" class="w3-bar-item w3-button w3-hide-small">Customer</router-link>
      <a ng-if="!isAuthenticated()" ui-sref="login" class="w3-bar-item w3-button w3-hide-small w3-right">Login</a>
      <!--// DO NOT DELETE-->
      <a ng-if="!isAuthenticated()" ui-sref="signup" class="w3-bar-item w3-button w3-hide-small w3-right">Sign up</a>
      <a href="#/logout" class="w3-bar-item w3-button w3-hide-small w3-right">Logout</a>
      <a href="#/profile" class="w3-bar-item w3-button w3-hide-small w3-right">Profile</a>


      <a href="javascript:void(0)" class="w3-bar-item w3-button w3-right w3-hide-large w3-hide-medium"
         onclick="myFunction()">&#9776;</a>
    </div>

    <div id="demo" class="w3-bar-block w3-black w3-hide w3-hide-large w3-hide-medium"
         style="position: absolute; left:20px; right: 20px">

      <!--<a href="#/schedule" class="w3-bar-item w3-button">Schedulaaa</a>-->
      <!--<a ui-sref="content" ui-sref-active="w3-green" class="w3-bar-item w3-button">Contents</a>-->
      <!--<a href="/customer" class="w3-bar-item w3-button">Customers</a>-->
      <!--<a ui-sref="user" ui-sref-active="w3-green" class="w3-bar-item w3-button">Users</a>-->
      <!--<a ui-sref="login" ui-sref-active="w3-green" class="w3-bar-item w3-button">Login</a>-->
    </div>





  </header>

</template>

<script>
  import SelectCustomer from './SelectCustomer.vue'

  export default {
    data() {
      return {
        title: 'vue ninjas'
      }
    },
    components : {
      SelectCustomer,
      'select-customer' : SelectCustomer
    }
  }
</script>

<style scoped>
  @import '../assets/css/w3.css';
  h1 {
    background: red;
  }
  .router-link-active{
    background: #000 !important;
    color: #fff;
  }
</style>
