<template>
  <div id="main-container" class="w3-margin-bottom">
    <app-header></app-header>

    <div class="w3-row w3-container">
      <div class="w3-col m3">
        <router-view class="" name="side"></router-view>
        <!--<side-menu></side-menu>-->
      </div>
      <div class="w3-col m9">
        <transition name="fade" mode="out-in">
          <router-view class="w3-container"></router-view>
        </transition>
      </div>
    </div>


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
  import Sidemenu from './components/Sidemenu.vue'

  export default {
    //name: 'app'
    components: {
      "app-header": Header,
      "side-menu" : Sidemenu
    },
    created() {
    }
  }

</script>

<style>
  @import './assets/css/w3.css';

  li.link {
    cursor: pointer
  }

  [v-cloak] .v-cloak--hidden {
    display: none;
  }

  /*#main-container {*/
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 0px;*/
  /*}*/

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s ease;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
  }


</style>
