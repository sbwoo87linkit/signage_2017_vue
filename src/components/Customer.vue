<template>
  <div>

    <table class="w3-table-all">
      <tr class="w3-blue">
        <th>name</th>
        <th>description</th>
        <th>address</th>
        <th>limit</th>
        <th>
        </th>
      </tr>
      <tr class="w3-dark-gray">
        <td><input class="w3-input w3-border" v-model="item.name" type="text"></td>
        <td><input class="w3-input w3-border" v-model="item.description" type="text"></td>
        <td><input class="w3-input w3-border" v-model="item.address" type="text"></td>
        <td><input class="w3-input w3-border" v-model="item.nLimit" type="text"></td>
        <td>
          <a class="w3-button w3-black" type="text" v-on:click="add()">Add</a>
        </td>
      </tr>

      <tr v-for="item in items" class="w3-light-blue">
        <td><input class="w3-input w3-border" v-model="item.name" type="text"></td>
        <td><input class="w3-input w3-border" v-model="item.description" type="text"></td>
        <td><input class="w3-input w3-border" v-model="item.address" type="text"></td>
        <td><input class="w3-input w3-border" v-model="item.nLimit" type="text"></td>
        <td>
          <a class="w3-button w3-green" type="text" v-on:click="update(item._id, item)">Update</a>
          <a class="w3-button w3-pink" type="text" v-on:click="del(item._id)">Delete</a>
        </td>
      </tr>


    </table>
  </div>
</template>

<script>

  export default {
    name: 'customer',
    data () {
      return {
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
        this.$http.delete('http://localhost:3000/api/customers/'+ id)
          .then(function (response) {
            this.get();
          });
      },
    },

    created: function () {
      this.get();

    },
  }

</script>

<style scoped>
  @import '../assets/css/w3.css';

</style>
