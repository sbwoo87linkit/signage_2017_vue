<template>
  <div class="w3-text-blue">
    <p>
      <a
        @click="$emit('saveSchedule', schedule_item)"
        class="w3-btn w3-block w3-blue w3-margin-top">Save schedule</a>
    </p>

    <!--<div class="w3-pink">-->
    <!--{{item}}-->
    <!--</div>-->

    <h5 class="w3-text-blue w3-border-bottom w3-border-blue"><strong>Schedule Type</strong></h5>
    <input class="w3-radio" type="radio" id="default" value="default" v-model="schedule_item.type">
    <label for="default">Default</label>
    <br>
    <input class="w3-radio" type="radio" id="event" value="event" v-model="schedule_item.type">
    <label for="event">Event</label>

    <h1>{{schedule_item.type}}</h1>

    <h5 class="w3-text-blue w3-border-bottom w3-border-blue"><strong>Time</strong></h5>
    <vue-timepicker v-model="schedule_item.from" :minute-interval="5" hide-clear-button></vue-timepicker>
    <vue-timepicker v-model="schedule_item.to" :minute-interval="5" hide-clear-button></vue-timepicker>

    <h5 class="w3-text-blue w3-border-bottom w3-border-blue"><strong>Layout design</strong></h5>

    <input type="text" style="margin-left:4px; width: 24px" v-model="rowInput">
    <button @click="addRow">Add row</button>

    <table style="border-collapse: collapse;">
      <tr v-for="(row, rowIndex) in schedule_item.rows">
        <td>
          <table style="border-collapse: collapse; margin: 0; padding: 0">
            <tr>
              <td style="vertical-align: top; padding: 3px;">
                <input type="text" style="width: 24px" v-model="row.colInput">
                <button @click="addCol(row.cols, row.colInput)"><i class="fa fa-plus" aria-hidden="true"></i></button>
                <button @click="deleteRow(schedule_item.rows, rowIndex)"><i class="fa fa-minus" aria-hidden="true"></i>
                </button>
              </td>
              <td>
                <div v-for="(col, colIndex) in row.cols" class="w3-left"
                     :style="{ width: col.size*80 + 'px', height: row.size*80 + 'px'}"
                     style="padding: 1px">
                  <div @click="selectedRowIndex=rowIndex; selectedColIndex=colIndex; selectedData = col"
                       :class="{'w3-blue' : selectedRowIndex===rowIndex && selectedColIndex===colIndex, 'w3-pink' : !(selectedRowIndex===rowIndex && selectedColIndex===colIndex)}"
                       style="height: 100%">
                    {{rowIndex}}-{{colIndex}}
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <div v-if="selectedData.size">
      <h5 class="w3-text-blue w3-border-bottom w3-border-blue"><strong>Contents</strong> - <span
        class="w3-badge w3-black">{{schedule_item.cellIndex}}</span></h5>
      <div class="w3-row">
        <div class="w3-half">
          <select>
            <option value="aaa">aaa</option>
          </select>
        </div>
      </div>

      <div class="w3-cell-row">

        <div class="w3-container w3-blue w3-cell" style="width: 50%">
          <div class="w3-container">
            <button class="w3-right" @click="copyAllContents"> Copy All </button>
          </div>
          <ul class="w3-ul">
            <li v-for="content in contents">
              {{content.originalName}}
              <button class="w3-btn w3-tiny w3-red w3-right w3-small w3-padding-small" @click="copyContent(content)">
                >
              </button>
            </li>
          </ul>
        </div>

        <div class="w3-container w3-green w3-cell" style="width: 50%">
          <div class="w3-container">
            <button class="w3-right" @click="deleteAllContents"> Delete All </button>
          </div>
          <ul class="w3-ul">
            <li v-for="(content, index) in selectedData.contents">
              {{content.originalName}}
              <button class="w3-btn w3-tiny w3-red w3-right w3-small w3-padding-small" @click="deleteContent(index)">
                x
              </button>
            </li>
          </ul>
        </div>

      </div>

      <h5 class="w3-text-blue w3-border-bottom w3-border-blue"><strong>Data</strong> - <span
        class="w3-badge w3-black">{{schedule_item.cellIndex}}</span></h5>

      <div class="w3-row">
        <div class="w3-half">
          <select>
            <option value="aaa">aaa</option>
          </select>
        </div>
      </div>

      <div class="w3-cell-row">

        <div class="w3-container w3-blue w3-cell" style="width: 50%">
          <button> >>> </button>
          <ul class="w3-ul">
            <li v-for="content in contents">
              {{content.originalName}}
              <button class="w3-btn w3-tiny w3-red w3-right w3-small w3-padding-small" @click="addImageToMenu(content)">
                >
              </button>
            </li>
          </ul>
        </div>

        <div class="w3-container w3-green w3-cell" style="width: 50%">
          <button> >>> </button>
          <button onclick="document.getElementById('id01').style.display='block'"
                  class="w3-button">Open Modal</button>

          <!-- The Modal -->
          <div id="id01" class="w3-modal">
            <div class="w3-modal-content w3-text-blue">
              <div class="w3-container">
      <span onclick="document.getElementById('id01').style.display='none'"
            class="w3-button w3-display-topright">&times;</span>
                <p>Some text in the Modal..</p>
                <p>Some text in the Modal..</p>
              </div>
            </div>
          </div>
          <button class="w3-right" @click="addServiceData">+</button>

          <ul class="w3-ul">
            <li><input type="text"></li>
            <li>
              <div class="w3-row">
                <div class="w3-quarter" style="padding-left: 3px">
                  <input class="w3-input" type="text">
                </div>
                <div class="w3-quarter" style="padding-left: 3px">
                  <input class="w3-input" type="text">
                </div>
                <div class="w3-quarter" style="padding-left: 3px">
                  <input class="w3-input" type="text">
                </div>
                <div class="w3-quarter" style="padding-left: 3px">
                  <input class="w3-input" type="text">
                </div>
              </div>
            </li>
          </ul>

          <ul class="w3-ul">
            <li :class="{'w3-red' : selectedMenu === dataItem }" v-for="(dataItem, index) in selectedData.data" v-on:click="selectedMenu = dataItem">
              Jill
              <button class="w3-right" @click="deleteServiceData(index)">-</button>
            </li>
          </ul>
        </div>

      </div>


    </div>
    <div class="w3-red w3-panel" v-else>
      No data selected
    </div>

    <br>

    <h5 class="w3-text-blue w3-border-bottom w3-border-blue"><strong>Layout list</strong></h5>

    <!--{{ schedule_item.rows }}-->

    <!--<div class="w3-cell-row"  v-for="(row, rowIndex) in schedule_item.rows">-->

    <!--<h1>{{rowIndex}}</h1>-->
    <!--&lt;!&ndash;<div class="w3-container w3-cell" style="width: 50%">&ndash;&gt;-->
    <!--&lt;!&ndash;<ul class="w3-ul">&ndash;&gt;-->
    <!--&lt;!&ndash;<li>Jill</li>&ndash;&gt;-->
    <!--&lt;!&ndash;<li>Eve</li>&ndash;&gt;-->
    <!--&lt;!&ndash;<li>Adam</li>&ndash;&gt;-->
    <!--&lt;!&ndash;</ul>&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->

    <!--&lt;!&ndash;<div class="w3-container w3-cell" style="width: 50%">&ndash;&gt;-->
    <!--&lt;!&ndash;<ul class="w3-ul">&ndash;&gt;-->
    <!--&lt;!&ndash;<li>Jill</li>&ndash;&gt;-->
    <!--&lt;!&ndash;<li>Eve</li>&ndash;&gt;-->
    <!--&lt;!&ndash;<li>Adam</li>&ndash;&gt;-->
    <!--&lt;!&ndash;</ul>&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->

    <!--</div>-->


    <div v-for="(row, rowIndex) in schedule_item.rows">
      <div v-for="(col, colIndex) in row.cols" class="w3-margin-bottom">
        <!--<span class="w3-badge w3-white">{{ (vi*(schedule_item.rh.length)) + hi}}</span> ({{hn}},{{vn}})</div>-->
        <!--<div class="w3-cell-row">-->
          <!--<div class="w3-black">-->
            <!--<p><span class="w3-badge w3-white">{{ rowIndex }}-{{colIndex}}</span></p>-->
          <!--</div>-->
        <!--</div>-->

        <h5>Layout : {{rowIndex}}-{{colIndex}}</h5>

        <div class="w3-cell-row">
          <div class="w3-container w3-blue w3-cell" style="width: 50%">
            <!--<button> >>> </button>-->
            <!--{{col.contents}}-->
            <ul class="w3-ul">
              <li v-for="content in col.contents">{{content.originalName}}</li>
            </ul>
            <div class="w3-panel w3-red" v-if="col.contents.length < 1">
              <p>No data.</p>
            </div>
          </div>
          <div class="w3-container w3-green w3-cell" style="width: 50%">
            <!--<button> >>> </button>-->
            <ul class="w3-ul">
              <li v-for="data in col.data">{{data}}</li>
            </ul>
            <div class="w3-panel w3-red" v-if="col.data.length < 1">
              <p>No data.</p>
            </div>
          </div>
        </div>


      </div>
    </div>


    <p>
      <a
        @click="$emit('saveSchedule', schedule_item)"
        class="w3-btn w3-block w3-blue w3-margin-top">Save schedule</a>
    </p>

  </div>
</template>

<script>
  import Vue from 'vue'
  import VueTimepicker from 'vue2-timepicker'
  import config from '../config'

  export default {
//    name: 'schedule-item',
    props: [
      'initialItem'
    ],
    data() {
      return {
//        schedule_item: this.initialItem,
        schedule_item: Vue.util.extend({}, this.initialItem),
        rowInput: 1,
        colInput: 1,
        selectedData: {},
        selectedRowIndex: null,
        selectedColIndex: null,
        selectedMenu: null,
        customerId: '',
        groupId: '',
        contentId: '',
        contents: [],
      }
    },
    components: {
      VueTimepicker
    },

    methods: {

      addServiceData: function (data) {
//        console.log(this.selectedData)
        console.log(data)
        this.selectedData.data.push({name: 'cafe', image : 'd5da30b2-78f3-4fce-baac-f6fa29d0ae20.jpg', size: 70677, price: 1000, description:'shot추가 : 500원'})
      },
//      deleteServiceData
      deleteServiceData: function (index) {
//        console.log(this.selectedData)
//    console.log(data)
        this.selectedData.data.splice(index, 1)
      },
      copyAllContents: function () {
        //this.selectedData.contents.push({ name: 'a.wmv'})
        //var newArray = arrayA.concat(arrayB);
        this.selectedData.contents = this.selectedData.contents.concat(this.contents);
      },

      copyContent: function (content) {
        this.selectedData.contents.push(content)
      },

      addImageToMenu: function (content) {
        if (!this.selectedMenu) {
          alert('Menu not selected');
          return;
        }
        this.selectedMenu.image = content.fileName;
        this.selectedMenu.size = content.size;
      },

      deleteContent: function (index) {
        this.selectedData.contents.splice(index, 1);
      },

      deleteAllContents: function () {
        this.selectedData.contents = [];
      },

      addRow: function () {
        this.schedule_item.rows.push({size: this.rowInput, colInput: 1, cols: []});
        this.rowInput = 1;
      },

      deleteRow: function (rows, rowIndex) {
        rows.splice(rowIndex, 1);
      },

      addCol: function (cols, colInput) {
        cols.push({
          size: colInput,
          dataOptions :
            {
              type:'menu',
              left: 150,
              top : 30,
              width: 200,
              height: 100,
              color: "Black",
              alpha: 0.55,
              margin:30,
              rowsPerPage: 3.0
            },
          contents: [], data: []})
        cols.size = 1;
      },

      getContents: function () {
        this.$http.get(config.url + '/contents/' + localStorage.getItem('ContentGroupId'))
          .then(function (response) {
            this.contents = response.data;
          })
      },


    },

    created: function () {
      this.getContents();
    },


  }

</script>


<style>
  @import '../assets/css/w3.css';
</style>
