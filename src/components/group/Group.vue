<template>
  <div>

    <modal :class="{'w3-show': showGroupModal}" @close="showGroupModal = false; mode=''">
      <h3 slot="header">{{mode | capitalize}} {{type | capitalize}} Group</h3>
      <div slot="body">

        <div v-show="mode === 'add'">
          <label class="w3-text-blue"><b>Group Name</b></label>
          <input class="w3-input w3-border" @focus="$event.target.select()" type="text" v-model="item.name" ref="name">
          <br>
          <button class="w3-btn w3-blue" @click="add(); showGroupModal = false; mode=''">Confirm</button>
          <button class="w3-btn" @click="showGroupModal = false; mode=''">Cancel</button>
        </div>

        <div v-show="mode === 'edit'">
          <label class="w3-text-blue"><b>Group Name</b></label>
          <input class="w3-input w3-border" @focus="$event.target.select()" type="text" v-model="selectedItem.name" ref="name">
          <br>
          <button class="w3-btn w3-blue" @click="update(); showGroupModal = false; mode=''">Confirm</button>
          <button class="w3-btn" @click="showGroupModal = false; mode=''">Cancel</button>
        </div>

        <div v-show="mode === 'delete'">
          <!--<h3>Caution</h3>-->
          <p class="w3-text-red">Catuion</p>
          <p>Delete Group?</p>
          <br>
          <button class="w3-btn w3-blue" @click="remove(); showGroupModal = false; mode=''">Confirm</button>
          <button class="w3-btn" @click="showGroupModal = false; mode=''">Cancel</button>
        </div>


      </div>
    </modal>


    <ul class="w3-ul w3-border" v-show="type==='schedule' || type === 'content'">
      <li class="w3-pale-yellow">
        <strong>Group List</strong>

        <span class="w3-right w3-text-light-gray w3-hover-text-black"
              @click="$refs.name.focus(); mode='add'; showGroupModal = true; ">
          <i class="fa fa-plus" aria-hidden="true"></i>
        </span>

      </li>
      <li v-for="item in items" :class="{'w3-blue': !$route.path.includes('group') && $route.params.id === item._id }">
        <router-link :to="'/' + type  + '/' + item._id" style="">
          {{item.name}}
        </router-link>
        <div class="w3-right" v-if="!$route.path.includes('group')">
          <span class="w3-text-light-gray w3-hover-text-black"
                @click="showEditModal(item)">
            <i class="fa fa-pencil" aria-hidden="true"></i>
          </span>
          <span class="w3-text-light-gray w3-hover-text-black"
                @click="mode='delete'; selectedItem=item; showGroupModal = true">
            <i class="fa fa-trash-o" aria-hidden="true"></i>
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

  import Vue from 'vue'
  import Modal from '../Modal.vue'
  import config from '../../config'

  export default {
    name: 'group',
    components: {
      modal: Modal
    },
    data() {
      return {
        showGroupModal: false,
        items: [],
        item: {
          name: 'group-1',
        },
        selectedItem: {
          _id: null,
          name: null,
        },
        mode: null,
        customerId: '',
        backUrl: this.$route.path,
        type: '',
        groupId: '',
      }
    },
    methods: {
      saveSelection: function (id) {
        this.$emit('changed', this.groupId);
      },
      showEditModal: function (item) {
        this.mode='edit';
        this.selectedItem=Vue.util.extend({}, item);
        this.showGroupModal = true;
      },
      fetchData() {
        this.customerId = localStorage.getItem('customerId');
        if (this.$route.path.includes('schedule')) {
          this.type = 'schedule';
        } else if (this.$route.path.includes('content')) {
          this.type = 'content';
        } else {
          this.type = '';
        }

        this.$http.get(config.url + '/groups/' + this.customerId + '/' + this.type)
          .then(function (response) {
            this.items = response.data;
          });
      },

      add: function () {
//        console.log('add')
//        this.item.customerId = localStorage.getItem('customerId');
        this.$http.post(config.url + '/groups/' + this.customerId + '/' + this.type, this.item)
          .then(function (response) {
            this.fetchData();
          })
          .catch(function (data){
            if(data.status === 422) {
              // do whatever you want
              alert('conflict');
            }
          })

      },

//
      update: function () {
        this.$http.put(config.url + '/groups/' + this.selectedItem._id, this.selectedItem)
          .then(function (response) {
            this.fetchData();
          })
          .catch(function (data){
            if(data.status === 422) {
              // do whatever you want
              alert('conflict');
            }
          })
      },

      remove: function () {
        this.$http.delete(config.url + '/groups/' + this.selectedItem._id)
          .then(function (response) {
            this.fetchData();
          });
      },
    },
    created: function () {
      this.fetchData();
    },
    watch: {
      'mode' : function (val) {
        var vm = this;
        setTimeout(function () {
         vm.$refs.name.focus();
        }, 100)
      },
      '$route': 'fetchData'
    },
  }
</script>

<style scoped>
  @import '../../assets/css/w3.css';
</style>
