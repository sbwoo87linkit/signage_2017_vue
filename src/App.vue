<template>
  <div id="main-container">
    <app-header></app-header>
    <!--<img src="./assets/logo.png">-->
    <router-view></router-view>
  </div>
</template>

<script>
//  import Header from './components/Header.vue'
import Header from './components/Header.vue'

export default {
    //name: 'app'
    components: {
      "app-header" : Header
    }
  }

</script>

<style>
  @import './assets/css/w3.css';
  #main-container {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 0px;
  }

</style>
