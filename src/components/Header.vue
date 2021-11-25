<template lang="">
<header>
    <n-button class="nav-btn" color="#66ff33" strong secondary round type="info">Home</n-button>
    <n-button class="nav-btn" color="#009900" ghost>Favourites</n-button>
    <n-button class="nav-btn" color="#009900" ghost>Customize</n-button>
    <span> 
        <input 
            type="checkbox" 
            :checked="(mode==='dark')?'checked':false"
            @change="$emit('toggle')"
        /> {{ mode }} mode
    </span>
</header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name:'Header',
    props: ['mode']
})
</script>

<style lang="scss">
header {
    background: rgb(58, 58, 58);
    overflow: hidden;
    text-align: center;
    padding: 15px;
    transition: background 0.3s ease-in-out;
}
.dark header {
  background: #121c25;
  color: rgb(183, 189, 183);
}
header {
    background: #cccccc;
    color: rgb(63, 65, 63);
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