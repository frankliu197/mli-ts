<template lang="pug">
.header
  v-app-bar(:height=56 fixed)
    <v-app-bar-icon><img src="../assets/headerpic.jpg" alt=""></v-app-bar-icon>
    v-btn.secondary--text(text href="/")
      <v-app-bar-title></v-app-bar-title>
      
  .header-margin(style="height: 56px")
  
</template>


<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  name: "Header"
});
</script>

<style lang="scss" scoped>
.theme--light.v-app-bar.v-toolbar.v-sheet {
    background-color: rgb(39, 39, 41);
}

v-app-bar-icon img {
    height: 56px;
}

.v-toolbar__content {
    padding-left: 2px;
}

body{
             background: lightgreen !important;
         }
</style>

