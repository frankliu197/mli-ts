<template lang='pug'>
.home
  v-container.main.background(fluid)
    InputBox
</template>

<script lang="ts">
import InputBox from "../components/InputBox.vue"
export default {
  name: 'Home',
  components: {
    InputBox
  }
}
</script>

<style>
</style>
