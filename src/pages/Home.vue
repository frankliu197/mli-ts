<template lang='pug'>
.home
  v-container.main.background(fluid)
    link(href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet')
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

// todo: auto-resize textarea on new line break

</script>

<style>

.home {
  padding-left: 18%;
  padding-right: 18%
}

</style>
