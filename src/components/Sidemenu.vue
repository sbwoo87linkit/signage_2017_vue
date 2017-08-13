<template>
  <div>
    <select-customer @changed="customerChanged"></select-customer>

    {{customerId}}
    <app-group v-bind:customer-id="customerId" @changed="groupChanged" class="w3-margin-top"></app-group>
  </div>

</template>

<script>

  //  import Customer from './Customer.vue'

  import SelectCustomer from './SelectCustomer.vue'
  import Group from './Group.vue'


  export default {
    components: {
      'app-group': Group,
      'select-customer' : SelectCustomer
    },
    data() {
      return {
        customerId: localStorage.getItem('customerId'),
      }
    },
    methods: {
      groupChanged: function () {
      },
      customerChanged: function (customerId) {
//        console.log(event);
        this.customerId = customerId;
      }

    }
  }
</script>

<style>
  @import '../styles/w3.css';

</style>
