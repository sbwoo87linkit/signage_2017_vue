<template>
  <div>
    <select-customer @changed="customerChanged"></select-customer>


    <h1>User</h1>

  </div>
</template>

<script>

  import {mapGetters, mapActions} from 'vuex'
  import SelectCustomer from './SelectCustomer.vue'
  import { bus } from '../main'
  export default {
    name: 'user',
    components: {
      SelectCustomer,
      'select-customer': SelectCustomer
    },
    data () {
      return {
          customerId: ''
      }
    },
    computed: mapGetters([
      'evenOrOdd'
    ]),
    methods: {
      ...mapActions([
        'increment',
        'decrement',
        'incrementIfOdd',
        'incrementAsync'
      ]),

      customerChanged: function (data) {
//        console.log('Schedule.vue :: customerChanged.....', data)
        localStorage.setItem('customerId', data);
        this.customerId = data;
      },


      add: function () {
        this.$http.post('http://localhost:3000/api/customers', this.item)
          .then(function (response) {
            this.get();
          });
      },
      get: function () {
        this.$http.get('http://localhost:3000/api/customers')
          .then(function (response) {
            this.items = response.data;
          });
      },
      update: function (id, item) {
        this.$http.put('http://localhost:3000/api/customers/' + id, item)
          .then(function (response) {
            this.get();
          });
      },
      del: function (id) {
        this.$http.delete('http://localhost:3000/api/customers/' + id)
          .then(function (response) {
            this.get();
          });
      },
    },
    created: function () {
//      bus.$on('customerChanged',  (data) => {
//        console.log('bus.$on', data)
//      })

    }
  }
</script>

<style scoped>
</style>
