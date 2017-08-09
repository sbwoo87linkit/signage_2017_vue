<template>
  <div>
    <h1>schedule view</h1>
    {{scheduleView.type}}
  </div>
</template>

<script>
  export default {
    data() {
      return {
        scheduleView : this.initData
      }
    },
    props: ['initData']

  }

</script>


<style>
  @import '../assets/css/w3.css';

</style>
