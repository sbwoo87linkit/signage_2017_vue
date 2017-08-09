<template>
  <div>

    <h1>ContentList</h1>

    <table class="w3-table-all w3-margin-top w3-margin-bottom">
      <tr class="w3-blue">
        <th></th>
        <th>name</th>
        <th>description</th>
        <th>address</th>
        <th>limit</th>
        <th>
        </th>
      </tr>

      <tr class="w3-dark-gray">
        <td></td>
        <td>
          <input class="w3-input w3-border" v-model="item.name" type="text">
        </td>
        <td><input class="w3-input w3-border" v-model="item.description" type="text"></td>
        <td><input class="w3-input w3-border" v-model="item.address" type="text"></td>
        <td><input class="w3-input w3-border" v-model="item.nLimit" type="text"></td>
        <td>
          <a class="w3-button w3-black" type="text" v-on:click="add()">Add</a>
        </td>
      </tr>

      <tr v-for="item in items" class="w3-light-blue">
        <td>
          <input class="w3-radio" v-model="groupId" type="radio" name="group" v-bind:value="item._id">
        </td>
        <td>
          <input class="w3-input w3-border" v-model="item.name" type="text">
          <!--{{item._id}}-->
        </td>
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
    name: 'app-content-list',
    props: [
        'customerId', 'groupId'
    ],
    data () {
      return {
        type: this.$route.name,
//        customerId: '596b4d066b8fcf2798532fe9',
//        groupId: '596b83956b8fcf2798532ff8',
        items: [],
        item: {
          name: 'file_name1',
          size: 100,
        }

      }
    },

    methods: {
      saveSelection: function (id) {
        console.log('saveSelection : ', id)
//        localStorage.setItem(this.type + 'GroupId', this.groupId);
//        bus.$emit('groupChanged', this.groupId);

      },
      add: function () {
        this.item.customerId = this.customerId;
        this.$http.post('http://localhost:3000/api/contents/'  + this.customerId + '/' + this.groupId, this.item)
          .then(function (response) {
            this.get();
          });
      },
      get: function () {
//        this.groupId = localStorage.getItem('ScheduleGroupId');
//        console.log('Config. Change Detected. groupId... : ', this.groupId);
//        return;
//
//        //return $http.get('/api/groups/' + customerId + '/' + type);
//        console.log('group get : ', this.type, this.customerId)
//        this.$http.get('http://localhost:3000/api/groups/' + this.customerId + '/' + this.type)
//          .then(function (response) {
//            this.items = response.data;
//
//            var item = this.$lodash.find(response.data, {_id: localStorage.getItem(this.type + 'GroupId')});
//
//            if (response.data.length > 0) {
//              if (item === undefined) {
//                this.groupId = response.data[0]._id;
//                localStorage.setItem(this.type + 'GroupId', this.groupId);
//              } else {
//                this.groupId = item._id;
//              }
//            }
//
//
//          });
      },
      update: function (id, item) {
        this.$http.put('http://localhost:3000/api/groups/' + id, item)
          .then(function (response) {
            this.get();
          });
      },
      del: function (id) {
        this.$http.delete('http://localhost:3000/api/groups/' + id)
          .then(function (response) {
            this.get();
          });
      },
      changed: function () {
      }
    },
    created: function () {
//      bus.$on('customerChanged', (data) => {
//        this.get();
//      })

      bus.$on('groupChanged', (data) => {
        this.get();
      })

      this.get();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../assets/css/w3.css';

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
