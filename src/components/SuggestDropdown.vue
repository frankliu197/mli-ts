<template lang='pug'>
.dropdown-container
  n-button(v-for="(item, index) in suggestions" :key="item") {{ index }}   {{ item.symbol }}

</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import recommender from '../recommender/Recommender'
export default defineComponent({
  name: 'SuggestDropdown',
  props: {
    search: {
      default: "",
      type: String
    }
  },
  methods: {
    
  },
  computed: {
    suggestions: function(){
      return recommender(this.search)
    }
  }
})
</script>

<style lang='scss' scoped>

</style>