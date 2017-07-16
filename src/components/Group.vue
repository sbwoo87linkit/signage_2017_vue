<template>
  <div class="hello">
    <h1>Group</h1>
    <router-link to="/customer" class="w3-bar-item w3-button w3-hide-small">Customer</router-link>
  </div>
</template>

<script>
export default {
  name: 'group',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App.'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
