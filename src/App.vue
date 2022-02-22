<template lang="pug">
.app
  Header
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
  background: #0f2944;
  transition: background 0.3s ease-in-out;
}
</style>
