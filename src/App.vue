<template lang="pug">
v-app
  Header
  v-main
    Home
    
</template>

<script lang="ts">
import Header from "@/components/Header.vue"
import Home from "@/pages/Home.vue"
import Vue from "vue";
export default Vue.extend({
  components: {
    Header,
    Home
  }
})
</script>

<style lang="scss">
.app {
  width: 100vw;
  min-height: 100vh;
  background: #f5f5f5;
  transition: background 0.3s ease-in-out;
}
</style>
