<template>
  <div class="w3-margin-top">

    <button @click="groupOpened = !groupOpened"
            class="w3-btn w3-block w3-left-align w3-border w3-border-blue">
      <span class="w3-text-blue"> <i style="font-size: 1.2em; padding-right: 10px" class="fa"
                                     v-bind:class="{ 'fa-chevron-circle-up' : groupOpened, 'fa-chevron-circle-down' : !groupOpened,}"></i></span>
      Player list ({{items.length}}) - {{ initgroupId }}
    </button>

    <div id="test_id" v-bind:class="{ 'w3-show': groupOpened }"
         class="w3-container w3-hide w3-border w3-border-blue w3-light-white w3-animate-opacity">
      <table class="w3-table-all w3-margin-top w3-margin-bottom">
        <tr>
          <th>status</th>
          <th>name</th>
          <th>description</th>
          <th>key</th>
          <!--<th>limit</th>-->
          <th>
          </th>
        </tr>

        <tr class="w3-dark-gray w3-padding-small">
          <td></td>
          <td>
            <input class="w3-input w3-border w3-padding-small" v-model="item.name" type="text">
          </td>
          <td><input class="w3-input w3-border w3-padding-small" v-model="item.description" type="text"></td>
          <td><input class="w3-input w3-border w3-padding-small" v-model="item._id" type="text"></td>
          <!--<td><input class="w3-input w3-border w3-padding-small" v-model="item.nLimit" type="text"></td>-->
          <td>
            <a class="w3-btn w3-black w3-padding-small" type="text" v-on:click="add()">Add</a>
          </td>
        </tr>

        <tr v-for="item in items">
          <!--<td>-->
            <!--<input class="w3-radio w3-padding-small" v-model="groupId" type="radio" name="group"-->
                   <!--v-bind:value="item._id">-->
          <!--</td>-->
          <td>
            <!--{{item.updateAt}} - {{ new Date()}}-->
            <!--{{new Date() - new Date(item.updateAt)}}  {{new Date() - new Date(item.updateAt) < 10000 ? "on" : "off" }}-->
            <div class="w3-circle w3-center"
                 :class="[ item.createAt !== item.updateAt && new Date() - new Date(item.updateAt) < 10000 ? 'w3-green' : 'w3-pink']"
                 style="width:30px; height:30px;">

            </div>

          </td>
          <td>
            <input class="w3-input w3-border w3-padding-small" v-model="item.name" type="text">
            <!--{{item._id}}-->
          </td>
          <td><input class="w3-input w3-border w3-padding-small" v-model="item.description" type="text"></td>
          <td><input class="w3-input w3-border w3-padding-small" v-model="item._id" type="text"></td>
          <!--<td><input class="w3-input w3-border w3-padding-small" v-model="item.nLimit" type="text"></td>-->
          <td>
            <a class="w3-btn w3-green w3-padding-small" type="text" v-on:click="update(item._id, item)">Update</a>
            <a class="w3-btn w3-pink w3-padding-small" type="text" v-on:click="del(item._id)">Delete</a>
            <a class="w3-btn w3-blue w3-padding-small" type="text" id="backup" download="My data" v-on:click="download(item)">KeyDownload</a>
          </td>
        </tr>


      </table>


    </div>

  </div>
</template>

<script>

  //  import {bus} from '../main'
  import config from '../config'

  export default {
    name: 'group',
    data() {
      return {
        timer: '',
        groupOpened: true,
//        type: this.$route.name,
//        customerId: '',
//        picked:'',
//        groupId: '',
        url: 'http://google.com',
        radioGroupId: '',
        groupId : this.initgroupId,
        items: [],
        item: {
          name: 'player-1',
          mode: 'test',
          description: 'desc',
        }

      }
    },
    props: [
      'initgroupId'
    ],
    methods: {
//      saveSelection: function (id) {
//
//        this.$emit('changed', this.groupId);
//
//      },
      add: function () {
//        this.item.customerId = this.customerId;
        console.log('add')
        this.$http.post(config.url + '/players/' + this.groupId, this.item)
          .then(function (response) {
            this.get();
          });
      },
      get: function () {
        this.$http.get(config.url + '/players/' + this.groupId)
          .then(function (response) {

//            console.log(response.data)


            this.items = response.data;
          });
      },
      update: function (id, item) {
        this.$http.put(config.url + '/players/' + this.groupId + "/" + id, item)
          .then(function (response) {
            this.get();
          });
      },
      del: function (id) {
        this.$http.delete(config.url + '/players/' + this.groupId + "/" + id)
          .then(function (response) {
            this.get();
          });
      },
      download: function (obj) {

        console.log('download');
//        var mydata = {
//          thing: "value",
//          thing2: "another value"
//        };
//        var JsonData = JSON.stringify(mydata);
//        var blob = new Blob([JsonData], {
//          type: "application/json"
//        });
//        var downloadUrl = URL.createObjectURL(blob);
//        document.getElementById("backup").href = downloadUrl;




//        console.log(obj);
//        this.href = "data:application/octet-stream," + encodeURIComponent(JSON.stringify(obj));
//
//
//        var data = {a:1, b:2, c:3};
//        var json = JSON.stringify(data);
//        var blob = new Blob([json], {type: "application/json"});
//        var url  = URL.createObjectURL(blob);
//
//        var a = document.createElement('a');
//        a.download    = "backup.json";
//        a.href        = url;
//        a.textContent = "Download backup.json";

        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
        var dlAnchorElem = document.getElementById('backup');
        console.log(dataStr)
        dlAnchorElem.setAttribute("href",     dataStr     );
        dlAnchorElem.setAttribute("download", "key.json");
        dlAnchorElem.click();

      }
    },
    created: function () {
//      this.groupId = localStorage.getItem('ScheduleGroupId');
//      this.get();
      this.timer = setInterval(this.get, 3000)
    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    watch: {
      'initgroupId': function (val) {
        console.log('groupChanged');
        this.groupId = localStorage.getItem('ScheduleGroupId');
        this.get();
      }
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
