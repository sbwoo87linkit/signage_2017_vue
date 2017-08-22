<template>

  <div>
    <h3>Group Delete..</h3>
    <button @click="cancel">cancel</button>
    <button @click="remove">delete</button>
  </div>

</template>

<script>
  import config from '../../config'
  export default {
     methods: {
      cancel : function () {
        this.$router.push(this.$route.query.backUrl);
      },
      remove : function () {
        this.$http.delete(config.url + '/groups/' + this.$route.params.id)
          .then(function (response) {
            this.$router.push(this.$route.query.backUrl);
          });
      }
    }
  }
</script>

<style>
  @import '../../assets/css/w3.css';
</style>
