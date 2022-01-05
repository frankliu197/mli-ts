<template lang="pug">

.theme-toggler-wrap
  .theme-toggler(v-bind:class="{ active: dark }")
    .toggler-slider
      .toggler-nob
        img.toggler-icon(v-if="dark" src='@/assets/icon/moon.png')
        img.toggler-icon(v-else='' src='@/assets/icon/sun.png')

</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name:'ThemeToggler',
    props: ['dark']
})
</script>

<style lang="scss">

.theme-toggler-wrap {
  width: 100%;
  text-align: right;

  .theme-toggler {
    display: inline-block;
    cursor: pointer;
    
    // OFF position
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

    // ON position
    &.active {
      .toggler-slider {
        background-color: #555;
      }

      .toggler-nob {
        transform: translateX(20px);
        background-color: #7bbb5e;
      }
    }

  }
}

.toggler-icon {
  width: 15px;
  height: 15px;
  padding-right: 3px;
}

</style>