<template>
  <div class="w3-left-align">


    <select-customer @changed="customerChanged"></select-customer>
    <app-group v-bind:customer-id="customerId" @changed="groupChanged" class="w3-margin-top"></app-group>
    {{groupId}}
    <app-player v-bind:initgroup-id="groupId" ></app-player>
    <!--groupId : {{ groupId }}-->





    <!--<div v-for="(itemTest, index) in itemTests">-->
      <!--itemTest.name: {{itemTest.name}}-->
      <!--<button @click="itemTest.showModal = true">Show Modal - {{itemTest.showModal}}</button>-->
      <!--&lt;!&ndash; use the modal component, pass in the prop &ndash;&gt;-->
      <!--<modal v-if="itemTest.showModal" @close="itemTest.showModal = false">-->
        <!--<h3 slot="header">custom header - {{index}}</h3>-->
      <!--</modal>-->
    <!--</div>-->



    <div v-if="!groupId" class="w3-panel w3-pale-red w3-center"><h3>No group selected</h3></div>
    <!--<schedule-setting v-if="groupId" :group-id="groupId"></schedule-setting>-->
    <div class="w3-panel w3-border w3-border-blue">

      <a @click="showAddModal = true"
         class="w3-btn w3-block w3-black w3-margin-top w3-margin-bottom">Add Schedule</a>
      <modal v-if="showAddModal" @close="showAddModal = false">
        <h3 slot="header">Add schedule</h3>
        <div slot="body">
          <schedule-item :initialItem="item" @saveSchedule="addSchedule($event)"></schedule-item>
        </div>
      </modal>



      <div class="w3-display-container   w3-green w3-margin-bottom" v-for="(schedule, index) in items">
        <!--<schedule-view :initData="schedule"></schedule-view>-->

        <header class="w3-container w3-teal">
          <div class=" w3-display-topright">


            <span @click.stop="schedule.showEditModal = true"
                  class="w3-button w3-pink"><i class="fa fa-pencil" aria-hidden="true"></i></span>
            <modal v-if="schedule.showEditModal" @close="schedule.showEditModal = false">
              <h3 slot="header">Edit schedule</h3>
              <div slot="body">
                <schedule-item :initialItem="schedule" @saveSchedule="updateSchedule($event)"></schedule-item>
              </div>
            </modal>


            <span @click.stop="schedule.showDeleteModal = true"
                  class="w3-button w3-pink">&times;</span>
            <modal v-if="schedule.showDeleteModal" @close="schedule.showDeleteModal = false">
              <h3 slot="header">Delete schedule</h3>
              <div slot="body">
                <p>
                  <button class="w3-btn w3-block w3-red"  @click="removeSchedule(schedule)">delete</button>
                </p>
              </div>
            </modal>


          </div>
          <h3>Schedule - {{schedule.type}}</h3>
          <p>{{schedule.from.HH}}:{{schedule.from.mm}} - {{schedule.to.HH}}:{{schedule.to.mm}}</p>
        </header>


      </div>


    </div>


  </div>
</template>

<script>
  import SelectCustomer from './SelectCustomer.vue'
  import Group from './Group.vue'
  import Player from './Player.vue'
  import ScheduleSetting from './ScheduleSetting.vue'
  import ScheduleItem from './ScheduleItem.vue'
  import config from '../config'
  import VueTimepicker from 'vue2-timepicker'
  import Modal from './Modal.vue'
  import ScheduleView from './ScheduleView.vue'


  export default {
    name: 'app-schedule',
    data() {
      return {
        itemTests : [{name: 'aaa', showModal: false},{name: 'bbb', showModal: false},{name: 'ccc', showModal: false}],
//        showModal: false,
//        display: 'none',
        customerId: '',
        groupId: '',
        contentId: '',
        contents: [],
        items: [],
        showAddModal: false,
        item: {
          rows: [
            {
              size: 1,
              colInput: 1,
              cols: [
                {size: 1, contents: [], data: []}
              ]
            }
          ],
          groupId: '',
          type: 'event',
          from: {
            HH: "10",
            mm: "00"
          },
          to: {
            HH: "21",
            mm: "00"
          },
//          h: 3,
//          v: 1,
//          rh: [
//            {size: 1, contents: [], data: []},
//            {size: 3, contents: [], data: []},
//            {size: 1, contents: [], data: []}
//          ],
//          rv: [1],
//          th: [],
//          cellIndex: 0,


        }
      }
    },
    components: {
      ScheduleView,
      ScheduleSetting,
      'app-group': Group,
      'app-player': Player,
      'select-customer': SelectCustomer,
      'schedule-setting': ScheduleSetting,
      'schedule-item': ScheduleItem,
      'modal' : Modal,
      'schedule-view' : ScheduleView


//      VueTimepicker
//      'app-config': Config
    },
    methods: {

      get: function () {
        if (!this.groupId) {
          return;
        }
        this.$http.get(config.url + '/schedules/' + this.groupId)
          .then(function (response) {
            response.data.forEach(function (item) {

              item.showEditModal = false;
              item.showDeleteModal = false;
            })
            this.items = response.data;
          })
      },

      addSchedule: function (item) {

//        alert('addSchedule')
        console.log(item)
        this.item.customerId = this.customerId;
        this.$http.post(config.url + '/schedules/' + this.groupId, item)
          .then(function (response) {
            this.get();
          });

        // close add modal
        this.showAddModal = false;

      },

      updateSchedule: function (item) {
        this.$http.put(config.url + '/schedules/' + item._id, item)
          .then(function (response) {
            this.get();
          })
      },

      removeSchedule: function (item) {
        this.$http.delete(config.url + '/schedules/' + item._id)
          .then(function (response) {
            this.get();
          })
      },
      customerChanged: function (data) {
        localStorage.setItem('customerId', data);
        this.customerId = data;

//        this.get();
      },

      groupChanged: function (data) {
        localStorage.setItem(this.$route.name + 'GroupId', data);
        this.groupId = data;
//        this.get();
      },

      saveConfig: function () {
        this.$http.get(config.url + '/groups/' + this.groupId)
          .then(function (response) {
          });
      }
    },

    created: function () {
//      this.getContents();
    },

    watch: {
      groupId: function (value) {
        this.get();
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../assets/css/w3.css';

  table {
    border-collapse: collapse;
  }


</style>
