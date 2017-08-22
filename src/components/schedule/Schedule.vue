<template>
    <div class="w3-row">

      <h3>schedule</h3>
      <p>groupId : {{$route.params.id}}</p>

    </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {

      fetchData: function () {

        localStorage.setItem('menu', 'schedule');
        localStorage.setItem('scheduleGroupId', this.$route.params.id);


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

    },

    created: function () {
//      this.fetchData();
    },

    watch: {
//      '$route': 'fetchData'
    }

  }
</script>

<style scoped>
  @import '../../assets/css/w3.css';

  table {
    border-collapse: collapse;
  }
</style>
