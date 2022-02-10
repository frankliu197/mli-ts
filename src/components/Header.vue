<template lang="pug">
.header
  v-app-bar(:height=56 fixed)
    v-btn.secondary--text(text href="/")
      v-app-bar-title MLI
  .header-margin(style="height: 56px")
</template>


<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  name: "Header"
});
</script>

<style lang="scss" scoped>

</style>

