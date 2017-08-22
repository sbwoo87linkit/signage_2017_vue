<template>
  <div>
    <h3>Group Add..</h3>
    <button @click="cancel">cancel</button>
    <button @click="add">add</button>
  </div>

</template>

<script>
  import config from '../../config'

  export default {
    data: function () {
      return {
        item: {
          name: 'group-1',
          address: 'add-1',
          description: 'desc',
          //type: this.$route.name,
          nLimit: 10
        }

      }
    },
    methods: {
      cancel: function () {
        this.$router.push(this.$route.query.backUrl);
      },
      add: function () {
        this.item.customerId = localStorage.getItem('customerId');
        if (this.$route.query.backUrl.includes('schedule')) {
          this.item.type = 'schedule';
        } else {
          this.item.type = 'content';
        }
        this.$http.post(config.url + '/groups', this.item)
          .then(function (response) {
            this.$router.push(this.$route.query.backUrl);
          });
      },
    }
  }
</script>

<style>
  @import '../../assets/css/w3.css';
</style>
