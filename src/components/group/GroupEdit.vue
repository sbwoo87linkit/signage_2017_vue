<template>

  <!--<div class="w3-row">-->
    <!--<div class="w3-col m3 w3-container">-->
      <!--<side-menu></side-menu>-->
    <!--</div>-->
    <!--<div class="w3-col m9 w3-container">-->
    <!--</div>-->
  <!--</div>-->
  <div>
    <h3>Group Edit..</h3>
    <input type="text" v-model="item.name">
    <button @click="cancel">cancel</button>
    <button @click="save">save</button>
  </div>

</template>

<script>
  import config from '../../config'
  export default {
    data() {
      return {
        item: {
          name: '',
          address: '',
          description: '',
          //type: this.$route.name,
          nLimit: 10
        }
      }
    },
    methods: {
      get : function () {

        this.$http.get(config.url + '/groups/' + this.$route.params.id )
          .then(function (response) {
            this.item = response.data;
          })

      },
      cancel : function () {
        this.$router.push(this.$route.query.backUrl);
      },

      save() {
        this.$http.put(config.url + '/groups/' + this.$route.params.id, this.item)
          .then(function (response) {
            this.$router.push(this.$route.query.backUrl);
          }, function (err) {
            this.$router.push(this.$route.query.backUrl);
          });
      }
    },

    created: function () {
      this.get();
    }
  }
</script>

<style>
  @import '../../assets/css/w3.css';
</style>
