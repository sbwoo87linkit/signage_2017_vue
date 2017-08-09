<template>
  <div>

<!--
    <div class="w3-dropdown-click" style="width: 100%">
      <button  class="w3-btn w3-block w3-black" @click="isOpen = !isOpen">Click Me!- {{isOpen}} </button>
      <div id="Demo" class="w3-dropdown-content w3-bar-block w3-border" v-bind:class="{'w3-show': isOpen}" style="width:100%">
        <a v-for="item in items" class="w3-bar-item w3-button " @click="customerId=item._id; isOpen=false" :class="{'w3-blue' : customerId === item._id}">{{item.name}}</a>
      </div>
    </div>
-->


    <div class="container">
      <select class="w3-select w3-border w3-border-blue" v-model="customerId" v-on:change="$emit('changed', customerId)">
        <option v-for="item in items" v-bind:value="item._id" >{{item.name}} | {{item._id}}</option>
      </select>
    </div>


  </div>
</template>

<script>

  import { bus } from '../main'
  import config from '../config'

  export default {
    name: 'selectCustomer',
    data () {
      return {
        isOpen: false,
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

    methods: {
      get: function () {
        this.$http.get(config.url + '/customers')
          .then(function (response) {

            this.items = response.data;

            var item = this.$lodash.find(response.data, {_id: localStorage.getItem('customerId')});

            if (response.data.length > 0) {
              if (item === undefined) {
                this.customerId = response.data[0]._id;
                //localStorage.setItem('customerId', this.customerId);
              } else {
                this.customerId = item._id;
              }
              this.$emit('changed', this.customerId);
            }

          });
      },
//      customerChanged: function () {
//        localStorage.setItem('customerId', this.customerId);
//        bus.$emit('customerChanged', this.customerId);
//      }
    },

    created: function () {
      this.get();
    },

  }

</script>

<style scoped>
  @import '../assets/css/w3.css';

</style>
