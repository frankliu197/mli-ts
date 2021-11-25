<template lang='pug'>
<div class="app" :class="mode">
<Header :mode="mode"/>
MainPage
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MainPage from './pages/MainPage.vue';
import Header from "./components/Header.vue"

export default defineComponent({
  components: {
    Header,
    MainPage,
  },
  data () {
    return {
      mode: 'dark'
    }
  },
  methods: {
    toggle() {
      if (this.mode === 'dark') {
        this.mode = 'light'
      } else {
        this.mode = 'dark'
      }
    }
  }
})
</script>

<style lang="scss">
.app {
  width: 100vw;
  min-height: 100vh;
  background: #f5f5f5;
}
.dark {
  background: #1f3041;
  color: #F3F3F3;
}
</style>
