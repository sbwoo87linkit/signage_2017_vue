<template>
  <div class="w3-right-align" style="width:140px">
    <!--{{showConfirm}}-->
    <button v-show="!showConfirm" @click="showConfirm = true">Delete</button>
    <div v-show="showConfirm">
      Delete ?
      <button @click="showConfirm = false; $emit('delete')">Yes</button>
      <button @click="showConfirm = false">No</button>
    </div>
  </div>
</template>


<script>

  export default {
    name : 'confirmDelete',
    data() {
      return {
        showConfirm: false

      }
    }
  }

</script>

<style>
  @import '../assets/css/w3.css';

</style>
