<template lang="">
<div class="nav">
    <n-button class="nav-btn" color="#66ff33" strong secondary round type="info">Home</n-button>
    <n-button class="nav-btn" color="#009900" ghost>Favourites</n-button>
    <n-button class="nav-btn" color="#009900" ghost>Customize</n-button>
</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name:'Header'
})
</script>
<style lang="scss">
.nav {
    background-color: rgb(58, 58, 58);
    overflow: hidden;
    text-align: center;
    padding: 10px;
}
.nav-btn {
    margin: 0 10px 0 10px;
}
</style>