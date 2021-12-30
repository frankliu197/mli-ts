<template lang="pug">
header
  n-button.nav-btn(color='#66ff33' strong='' secondary='' round='' type='info') Home
  n-button.nav-btn(color='#009900' ghost='') Favourites
  n-button.nav-btn(color='#009900' ghost='') Customize
  n-button.nav-btn(@click="printSymbols") Test
  span
    input(type='checkbox' :checked="(mode==='dark')?'checked':false" @change="$emit('toggle')")
    |  {{ mode }} mode
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
.dark header {
  background: #121c25;
  color: rgb(183, 189, 183);
}
.dark .nav-btn {
    color: rgb(183, 189, 183);
    margin: 0 10px 0 10px;
}
.nav-btn {
    color: rgb(63, 65, 63);
    margin: 0 10px 0 10px;
}
</style>