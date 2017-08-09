<template>
  <div id="main-container" class="w3-margin-bottom">
    <app-header></app-header>

    <transition name="fade" mode="out-in">
      <router-view class="w3-container"></router-view>
    </transition>

    <div id="alert" class="w3-modal">
      <div class="w3-modal-content w3-animate-top">
        <div class="w3-container">
          <span onclick="document.getElementById('alert').style.display='none'" class="w3-button w3-display-topright">&times;</span>
          <p id="alert-message">message</p>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
  //  import Header from './components/Header.vue'
  import Header from './components/Header.vue'

  export default {
    //name: 'app'
    components: {
      "app-header": Header
    },
    created() {
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

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s ease;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
  }


</style>
