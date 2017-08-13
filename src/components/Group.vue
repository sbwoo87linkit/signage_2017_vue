<template>
  <div>
    customerId : {{customerId}}
    <ul class="w3-ul w3-border">
      <li class="w3-pale-yellow"><strong>Group List</strong></li>
      <!--<li v-for="item in items">{{item.name}}</li>-->
      <li class="link" :class="{'w3-blue' : customerId === item._id }"
          v-for="item in items" @click="changed(item)">{{item.name}}
      </li>
      <li v-if="isDataLoaded && !items.length" v-cloak=""><span class="w3-pink w3-padding-small">No data</span></li>
    </ul>


    <!--

    <button @click="groupOpened = !groupOpened"
            class="w3-btn w3-block w3-left-align w3-border w3-border-blue">
      <span class="w3-text-blue"> <i style="font-size: 1.2em; padding-right: 10px" class="fa"
                                     v-bind:class="{ 'fa-chevron-circle-up' : groupOpened, 'fa-chevron-circle-down' : !groupOpened,}"></i></span>
      Select Group
    </button>

    <div id="test_id" v-bind:class="{ 'w3-show': groupOpened }"
         class="w3-container w3-hide w3-border w3-border-blue w3-light-white w3-animate-opacity">
      <table class="w3-table-all w3-margin-top w3-margin-bottom">
        <tr>
          <th></th>
          <th>name</th>
          <th>description</th>
          <th>address</th>
          <th>limit</th>
          <th>
          </th>
        </tr>

        <tr class="w3-dark-gray w3-padding-small">
          <td></td>
          <td>
            <input class="w3-input w3-border w3-padding-small" v-model="item.name" type="text">
          </td>
          <td><input class="w3-input w3-border w3-padding-small" v-model="item.description" type="text"></td>
          <td><input class="w3-input w3-border w3-padding-small" v-model="item.address" type="text"></td>
          <td><input class="w3-input w3-border w3-padding-small" v-model="item.nLimit" type="text"></td>
          <td>
            <a class="w3-btn w3-black w3-padding-small" type="text" v-on:click="add()">Add</a>
          </td>
        </tr>

        <tr v-for="item in items">
          <td>
            <input class="w3-radio w3-padding-small" v-model="groupId" type="radio" name="group"
                   v-bind:value="item._id">
          </td>
          <td>
            <input class="w3-input w3-border w3-padding-small" v-model="item.name" type="text">
            &lt;!&ndash;{{item._id}}&ndash;&gt;
          </td>
          <td><input class="w3-input w3-border w3-padding-small" v-model="item.description" type="text"></td>
          <td><input class="w3-input w3-border w3-padding-small" v-model="item.address" type="text"></td>
          <td><input class="w3-input w3-border w3-padding-small" v-model="item.nLimit" type="text"></td>
          <td>
            <a class="w3-btn w3-green w3-padding-small" type="text" v-on:click="update(item._id, item)">Update</a>
            <a class="w3-btn w3-pink w3-padding-small" type="text" v-on:click="del(item._id)">Delete</a>
          </td>
        </tr>


      </table>

      <div class="w3-bar w3-margin-bottom">
        <button class="w3-btn w3-block w3-right w3-green" v-on:click="saveSelection(groupId)"> Save Selection
        </button>
      </div>

    </div>

-->
  </div>
</template>

<script>

  //  import {bus} from '../main'
  import config from '../config'

  export default {
    name: 'group',
    data() {
      return {
        //customerId : '',
        isDataLoaded: false,
        groupOpened: true,
        type: this.$route.name,
//        customerId: '',
//        picked:'',
        groupId: '',
        radioGroupId: '',
        items: [],
        item: {
          name: 'group-1',
          address: 'add-1',
          description: 'desc',
          type: this.$route.name,
          nLimit: 10
        }

      }
    },
//    props: [
//      'customerId'
//    ],
    props: {

      customerId: {
        type: String,
        default: ''
      },

    },
    methods: {
      saveSelection: function (id) {

        this.$emit('changed', this.groupId);

      },
      add: function () {
        this.item.customerId = this.customerId;
        this.$http.post(config.url + '/groups', this.item)
          .then(function (response) {
            this.get();
          });
      },
      get: function () {
        this.$http.get(config.url + '/groups/' + this.customerId + '/' + this.type)
          .then(function (response) {
            this.items = response.data;
            console.log(this.items)
            this.isDataLoaded = true;

            var item = this.$lodash.find(response.data, {_id: localStorage.getItem(this.type + 'GroupId')});

            if (response.data.length > 0) {
              if (item === undefined) {
                this.groupId = response.data[0]._id;
              } else {
                this.groupId = item._id;
              }
            } else {
              this.groupId = '';
            }
            this.$emit('changed', this.groupId);
          });
      },
      update: function (id, item) {
        this.$http.put(config.url + '/groups/' + id, item)
          .then(function (response) {
            this.get();
          });
      },
      del: function (id) {
        this.$http.delete(config.url + '/groups/' + id)
          .then(function (response) {
            this.get();
          });
      },
    },
    created: function () {
      console.log('Group created :: customer_id changed ', this.customerId)
      this.get();
    },
    watch: {
      'customerId': function (val) {
        console.log('watch :: customer_id changed')
        this.get();
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../assets/css/w3.css';

  /*h1, h2 {*/
    /*font-weight: normal;*/
  /*}*/

  /*ul {*/
    /*list-style-type: none;*/
    /*padding: 0;*/
  /*}*/

  /*li {*/
    /*display: inline-block;*/
    /*margin: 0 10px;*/
  /*}*/

  /*a {*/
    /*color: #42b983;*/
  /*}*/
</style>
