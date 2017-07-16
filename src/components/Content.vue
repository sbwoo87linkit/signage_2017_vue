<template>
  <div>
    <select-customer></select-customer>
    <h1>Content</h1>
    <app-group></app-group>
  </div>
</template>

<script>
  import Group from './Group.vue'
  import SelectCustomer from './SelectCustomer.vue'

  export default {
    name: 'content',
    data () {
      return {}
    },
    components: {
      'app-group': Group,
      'select-customer': SelectCustomer
    },

  }
</script>

<style scoped>
</style>
