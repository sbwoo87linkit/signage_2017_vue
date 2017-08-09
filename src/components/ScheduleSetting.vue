<template>
  <div class="w3-left-align">
    <div class="w3-container w3-border w3-border-blue w3-margin-top w3-padding-small">Setting</div>
    <div class="w3-container w3-border w3-border-blue w3-padding">
      <p>item : {{ item }}</p>
      <p>groupId {{ groupId }}</p>

      <div class="w3-row">
        <div class="w3-col s4 w3-green w3-center"><p>s4</p></div>
        <div class="w3-col s4 w3-dark-grey w3-center"><p>s4</p></div>
        <div class="w3-col s4 w3-red w3-center"><p>s4</p></div>
      </div>
      <a class="w3-btn w3-block w3-green w3-margin-top" @click="saveConfig">Save</a>
    </div>
  </div>
</template>

<script>
  import config from '../config'


  export default {
    name: 'app-schedule-setting',
    data() {
      return {
//        groupId : '123434',
//        message : 'hello'
        item: {}
      }
    },
    props: [
      'groupId'
    ],
    computed: {},
    components: {},
    methods: {

      get: function () {
        if (!this.groupId) {
          this.item = {};
          return;
        }

        this.$http.get(config.url + '/groups/' + this.groupId)
          .then(function (response) {
            this.item = response.data;
          });
      },


      saveConfig: function () {
        this.$http.get(config.url + '/groups/' + this.groupId)
          .then(function (response) {
          });
      }
    },

    created: function () {
      this.get()
    },

    watch: {
      groupId: function (val, oldVal) {
        this.get()
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../assets/css/w3.css';

</style>
