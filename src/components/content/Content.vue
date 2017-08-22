<template>
  <div>
    <h3>Content</h3>
    <p>groupId: {{$route.params.id}}</p>
    <!--<div class="w3-container">-->

      <!--<div id="id01" class="w3-modal w3-show" v-if="uploading">-->
        <!--<div class="w3-modal-content w3-animate-top">-->
          <!--<header class="w3-container w3-teal">-->
            <!--<h3>Contents uploading ... </h3>-->
          <!--</header>-->
          <!--<div class="w3-container">-->

            <!--<div class="w3-dark-gray w3-margin">-->
              <!--<div class="w3-blue" v-bind:style="{ width : getProgress }">{{getProgress}}</div>-->
            <!--</div>-->

            <!--<button class="w3-button w3-black w3-hover-red" @click="cancelUpload">Cancel Upload</button>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->

    <!--<div class="w3-container w3-border w3-border-blue w3-blue w3-left-align w3-margin-top">-->
      <!--<h5>Contents List ({{items.length}})</h5>-->
    <!--</div>-->
    <!--<div class="w3-container w3-border w3-border-blue">-->

      <!--<div class="w3-row w3-margin-top">-->
        <!--<div class="w3-col s10">-->
          <!--<input class="w3-input w3-border" type="file" id="upload" ref="upload" multiple>-->
        <!--</div>-->
        <!--<div class="w3-container w3-col s2 w3-cell w3-cell-middle">-->
          <!--<button class="w3-button w3-block w3-large w3-green"  @click="upload">Upload</button>-->
        <!--</div>-->

      <!--</div>-->

      <!--<table class="w3-table-all w3-margin-top w3-margin-bottom">-->
        <!--<tr>-->
          <!--<th>name</th>-->
          <!--<th class="w3-right-align">size</th>-->
          <!--<th>thumbnail</th>-->
          <!--<th>date</th>-->
          <!--<th>-->
          <!--</th>-->
        <!--</tr>-->

        <!--<tr v-for="item in items">-->
          <!--<td>{{item.originalName}}</td>-->
          <!--<td class="w3-right-align" v-bind:title="item.size.toLocaleString()">{{item.size | filesize }}</td>-->
          <!--<td>{{item.mimeType}}</td>-->
          <!--<td>{{item.createAt | moment }}</td>-->
          <!--<td>-->
            <!--<div class="w3-right">-->
              <!--<confirm-delete @delete="del(item._id)"></confirm-delete>-->
            <!--</div>-->

          <!--</td>-->
        <!--</tr>-->


      <!--</table>-->

    <!--</div>-->

  </div>
</template>

<script>
//  import Group from './group/Group.vue'
//  import SelectCustomer from './SelectCustomer.vue'
//  import ConfirmDelete from './ConfirmDelete.vue'
//  import auth from '../auth'
//  import moment from 'moment'
//  import config from '../config'


  export default {
    name: 'app-content',
    data() {
      return {
        deleteConfirm: false,
        uploading: false,
        progress: 0,
        uploadStatus: '',
        image: '',
        customerId: '',
        items: [],
        item: {}
      }
    },
    filters: {
      moment: function (date) {
        return moment(date).format('YYYY/MM/DD hh:mm:ss');
      },
      filesize: function (value) {


        var UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        var STEP = 1024;

        function format(value, power) {
          return (value / Math.pow(STEP, power)).toFixed(2) + UNITS[power];
        }


        value = parseFloat(value, 10);
        for (var i = 0; i < UNITS.length; i++) {
          if (value < Math.pow(STEP, i)) {
            if (UNITS[i - 1]) {
              return format(value, i - 1);
            }
            return value + UNITS[i];
          }
        }
        return format(value, i - 1);



//        return value + 'a';
      }
    },
    computed: {
      getProgress() {
        return Math.round(this.progress) + "%";
      }
    },

    components: {
//      ConfirmDelete,
//      'app-group': Group,
//      'select-customer': SelectCustomer,
//      'confirm-delete' : ConfirmDelete
    },

    methods: {
      cancelUpload: function () {
        this.request.abort();
      },
      upload: function () {
        this.uploadStatus = '';
        var formData = new FormData();
        var files = this.$refs.upload.files;
        if (files.length === 0) {
          document.getElementById('alert').style.display='block'
          document.getElementById('alert-message').textContent='Please select files.'
          return;
        }

        // start uploading....
        this.uploading = true;
        for (var i = 0; i < files.length; i++) {
          formData.append('files[' + i + ']', files[i]);
        }

        this.$http.post(config.url + '/contents/' + this.groupId, formData, {
          before: request => {
            this.request = request;
          },
          progress: e => {
            this.progress = (e.loaded / e.total) * 100;
          }
        }).then(response => {
//          this.uploadStatus = "complete"
          this.uploading = false;

          // get list
          this.get();

          // reset upload
          document.getElementById("upload").value = "";

          // success message
          document.getElementById('alert').style.display='block'
          document.getElementById('alert-message').textContent= "complete";

        }, error => {
          this.progress = 0;
          this.uploading = false;
          this.uploadStatus = "cancelled"
          this.get();
        });

      },

      get: function () {

        localStorage.setItem('menu', 'content');
        console.log('set content GroupId .... ');
        localStorage.setItem('contentGroupId', this.$route.params.id);

        if (!this.groupId) {
          this.items = [];
          return;
        }
        this.$http.get(config.url + '/contents/' + this.groupId).then(
          function (response) {
            this.items = response.data;
          }
        )},

      del: function (id) {
        this.$http.delete('http://localhost:3000/api/contents/' + id).then(
          function (response) {
            //this.items = response.data;
            this.get();
          }
        )},

      customerChanged: function (data) {
        localStorage.setItem('customerId', data);
        this.customerId = data;
        this.get();
      },
      groupChanged: function (data) {
        localStorage.setItem(this.$route.name + 'GroupId', data);
        this.groupId = data;
        this.get();
      }
    },
    created: function () {
//      localStorage.setItem('menu', 'content');
      this.get();
    }



  }
</script>

<style scoped>
  @import '../../assets/css/w3.css';

  img {
    width: 30%;
    margin: auto;
    display: block;
    margin-bottom: 10px;
  }

  body {
    padding: 50px;
  }

  [v-cloak] {
    display: none;
  }

  #overlay {
    background: rgba(0, 0, 0, 0.8);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9998;
  }

  .overlay-content {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    z-index: 9999;
    width: 70%;
    margin-left: 15%;
  }

  .overlay-content > .header {
    color: #fff;
    margin-bottom: 10px;
  }

  .message {
    margin-top: 15px;
  }

</style>
