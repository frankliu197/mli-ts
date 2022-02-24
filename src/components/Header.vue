<template lang="pug"> 
.header
  link(href='https://fonts.googleapis.com/css?family=Roboto Mono' rel='stylesheet')
  v-app-bar(:height=80 fixed)
    v-btn.secondary--text(text href="/")
      v-app-bar-title(class="title") MLI 
      v-app-bar-title(class="subtitle") - Math-Latin Input Method
  .header-margin(style="height: 100px")
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
// title button mouse-over highlight
.v-btn.v-size--default {
  color: white;
}

.v-btn:not(.v-btn--round).v-size--default {
  height: 50px;
  width: 325px;
  padding: 0 16px;
}

.theme--light.v-app-bar.v-toolbar.v-sheet {
  background-color: #133257;
  padding-left: 15%;
  padding-right: 15%;
}

.v-btn__content {
  width: 200px;
}

.title {
  font-family: 'Roboto Mono';
  color: rgb(96, 213, 248);
  font-size: 32px;
  font-weight: bold;
}

.subtitle {
  font-family: 'Roboto Mono';
  color: rgb(72, 161, 189);
  font-size: 12px;
  font-weight: bold;
  padding-top: 15px;
  padding-left: 7px;
}

</style>

 