<template>
  <div>
    <select-customer></select-customer>
    <h1>Schedule</h1>
    <app-group></app-group>
  </div>
</template>

<script>
  import Group from './Group.vue'
  import SelectCustomer from './SelectCustomer.vue'
  //import { bus } from '../main'

  export default {
    name: 'hello',
    data () {
      return {
//        isCustomerMenu:  false,
        msg: 'Welcome to Your Vue.js App.'
      }
    },
    components: {
      'app-group': Group,
      'select-customer': SelectCustomer
    },
    methods: {
    },
    created: function () {
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
