<template>
  <div>

    <h1>config</h1>

  </div>
</template>

<script>

  import {bus} from '../main'

  export default {
    name: 'config',
    data () {
      return {
        type: this.$route.name,
        customerId: '',
//        picked:'',
        groupId: '',
        items: [],
        item: {
          name: 'group-1',
          address: 'add-1',
          description: 'desc',
          type: this.$route.name,
          nLimit: 10
        }

      }
    },
    methods: {
      saveSelection: function (id) {
        console.log('saveSelection : ', id)
//        localStorage.setItem(this.type + 'GroupId', this.groupId);
//        bus.$emit('groupChanged', this.groupId);

      },
      add: function () {
        this.item.customerId = this.customerId;
        this.$http.post('http://localhost:3000/api/groups', this.item)
          .then(function (response) {
            this.get();
          });
      },
      get: function () {
        this.groupId = localStorage.getItem('ScheduleGroupId');
        console.log('Config. Change Detected. groupId... : ', this.groupId);
        return;

        //return $http.get('/api/groups/' + customerId + '/' + type);
        console.log('group get : ', this.type, this.customerId)
        this.$http.get('http://localhost:3000/api/groups/' + this.customerId + '/' + this.type)
          .then(function (response) {
            this.items = response.data;

            var item = this.$lodash.find(response.data, {_id: localStorage.getItem(this.type + 'GroupId')});

            if (response.data.length > 0) {
              if (item === undefined) {
                this.groupId = response.data[0]._id;
                localStorage.setItem(this.type + 'GroupId', this.groupId);
              } else {
                this.groupId = item._id;
              }
            }


          });
      },
      update: function (id, item) {
        this.$http.put('http://localhost:3000/api/groups/' + id, item)
          .then(function (response) {
            this.get();
          });
      },
      del: function (id) {
        this.$http.delete('http://localhost:3000/api/groups/' + id)
          .then(function (response) {
            this.get();
          });
      },
      changed: function () {
      }
    },
    created: function () {
//      bus.$on('customerChanged', (data) => {
//        this.get();
//      })

      bus.$on('groupChanged', (data) => {
        this.get();
      })

      this.get();
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
