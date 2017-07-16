<template>
  <div>

    <div class="container">
      <select class="w3-select w3-border" v-model="customerId" v-on:change="customerChanged">
        <!--<option>select</option>-->
        <option v-for="item in items" v-bind:value="item._id">{{item.name}} | {{item._id}}</option>
        <!--<option v-for="item in items">{{item.name}}</option>-->
      </select>
    </div>


  </div>
</template>

<script>

  import { bus } from '../main'

  export default {
    name: 'selectCustomer',
    data () {
      return {
        isCustomerMenu: false,
        customerId: null,
        items: [],
        item: {
          name: 'customer-1',
          address: 'add-1',
          description: 'desc',
          nLimit: 10

        }
      }
    },
//    watch: {
////        customer: function (val, oldVal) {
////          console.log(val, oldVal)
////        },
//      customer: {
//        handler: function (val, oldVal) {
//          console.log('a thing changed', val, oldVal)
//        },
//        deep: false
//      }
//    },
    methods: {
      get: function () {
        this.$http.get('http://localhost:3000/api/customers')
          .then(function (response) {
            this.items = response.data;
            this.customerId = this.items[0]._id
          });
      },
      customerChanged: function () {
        console.log('cust omer changed...bbbcc ', this.customerId)
        bus.$emit('customerChanged', this.customerId)
      }
    },

    created: function () {
      this.get();
    },

  }

</script>

<style scoped>
  @import '../assets/css/w3.css';

</style>
