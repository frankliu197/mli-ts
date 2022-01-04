<template lang="pug">
header
  n-space
    router-link(:to="{name: 'Home'}")
      n-button(type='info') Home
    router-link(:to="{name: 'About'}")
      n-button(type="info") About
    n-button(type="warning") Customize
    n-button(@click="printSymbols") Test
    
    //- Dark/Light mode switcher
    .theme-toggler-wrap
      .theme-toggler(v-bind:class="{ active: mode==='dark' }" @click="$emit('toggle');")
        .toggler-slider
          .toggler-nob
            img.toggler-icon(v-if="mode==='dark'" src='@/assets/icon/moon.png')
            img.toggler-icon(v-else='' src='@/assets/icon/sun.png')
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BasicLatin from "../symbols/BasicLatin.json"
export default defineComponent({
    name:'Header',
    props: ['mode'],
    methods: {
        printSymbols: function(){
            console.log(BasicLatin)
        }
    }
})
</script>

<style lang="scss">
header {
    background: #cccccc;
    color: rgb(63, 65, 63);
    overflow: hidden;
    text-align: center;
    padding: 15px;
    transition: background 0.3s ease-in-out;
}

.nav-btn {
    color: rgb(63, 65, 63);
    margin: 0 10px 0 10px;
}

.dark header {
  background: #121c25;
  color: rgb(183, 189, 183);
}

.dark .nav-btn {
    color: rgb(183, 189, 183);
    margin: 0 10px 0 10px;
}

a { text-decoration: none; }

// Dark/Light mode toggle switch in the OFF position
.theme-toggler-wrap {
  width: 100%;
  text-align: right;

  .theme-toggler {
    display: inline-block;
    cursor: pointer;

    .toggler-slider {
      width: 40px;
      height: 20px;
      border-radius: 10px;
      background-color: rgb(170, 170, 170);

      .toggler-nob {
        background-color: rgb(122, 122, 122);
        width: 20px;
        height: 20px;
        border-radius: 50%;
        transition: all 0.3s ease-in-out;
      }
    }
  }
}

// Dark/Light mode toggle switch in the ON position
.theme-toggler-wrap .theme-toggler.active .toggler-slider {
  background-color: #555;
}
.theme-toggler-wrap .theme-toggler.active .toggler-nob {
  transform: translateX(20px);
  background-color: #7bbb5e;
}

.toggler-icon {
  width: 15px;
  height: 15px;
  padding-right: 3px;
}

</style>