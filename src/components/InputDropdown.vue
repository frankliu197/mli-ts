<template lang='pug'>
.absolute-dropdown(v-show="dropdown.show" :style="dropdown.position")
  input(ref="input" @blur="$emit('close')")

</template>

<script lang='ts'>/*
import { defineComponent } from 'vue'
import recommender from '../Recommender/Recommender'
import Character from '../Recommender/Character'
export default defineComponent({
  name: 'InputDropdown',
  data: function() {
    return {
      search: "",
    }
  },
  methods: {
    
  },
  computed: {
    suggestions: function() : Set<Character> {
      return recommender(this.search)
    }
  },
	updated(){
		debugger
		const input = this.$refs.input as HTMLInputElement
		
		input.focus()
		input.select()
	}
})*/
</script>

<style lang='scss' scoped>

</style>