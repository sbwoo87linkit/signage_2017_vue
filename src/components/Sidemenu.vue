<template>
  <div>
    {{ 'side-menu' }}
    <!--<select-customer @changed="customerChanged"></select-customer>-->

    <!--&lt;!&ndash;{{$route.params.id}}&ndash;&gt;-->
    <group v-bind:customer-id="customerId" @changed="groupChanged" class="w3-margin-top"></group>
  </div>

</template>

<script>

  //  import Customer from './Customer.vue'

  import SelectCustomer from './SelectCustomer.vue'
  import Group from './group/Group.vue'


  export default {
    components: {
      'group': Group,
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

    },
    watch: {
//      'customerId': function (val) {
//        this.get();
//      },
//      '$route' (to, from) {
////        this.groupId = to.params.id;
//        console.log('side-menu $route')
//      }
    },
  }
</script>

<style>
  @import '../styles/w3.css';

</style>
