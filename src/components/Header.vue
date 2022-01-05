<template lang="pug">
header
  n-space
    router-link(:to="{name: 'Home'}")
      n-button(type='info') Home
    router-link(:to="{name: 'About'}")
      n-button(type="info") About
    n-button(type="warning") Customize
    n-button(@click="printSymbols") Test 

    <ThemeToggler :dark="dark" @click="$emit('toggleTheme');"/>
    
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BasicLatin from "../symbols/BasicLatin.json"
import ThemeToggler from './ThemeToggler.vue'
export default defineComponent({
    name: "Header",
    props: ["dark"],
    methods: {
        printSymbols: function () {
            console.log(BasicLatin);
        }
    },
    components: { ThemeToggler }
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

</style>