<template>
<div class="app" v-bind:class="{ dark: dark }">
<Header :dark="dark" @toggleTheme="toggleTheme"/>
<router-view></router-view>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from "./components/Header.vue"

export default defineComponent({
  components: {
    Header
  },
  data () {
    return {
      dark: true
    }
  },
  methods: {
    toggleTheme() {
      this.dark = !this.dark;
    }
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
.dark {
  background: #1f3041;
  color: #F3F3F3;
}
</style>
