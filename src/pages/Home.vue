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

.input-box {
  padding-left: 5%;
}

.input-box > textarea:nth-child(1) {
  background: white;
  font-family: 'Poppins';
  font-size: 35px;
  padding: 10px;
  height: 75px;
  resize: none;
  overflow: hidden;
  border-radius: 10px;
  border: double 3px #133257;
  box-shadow: 0 0 10px 1px rgb(96, 213, 248);
}

</style>
