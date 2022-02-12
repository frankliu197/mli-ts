<template lang='pug'>
.character-details
	b {{ character }}
	p keywords: 	
</template>

<script lang='ts'>
import Vue from "vue";
import Character from '@/Recommender/Character';
export default Vue.extend({
  name: 'CharacterDetails',
	props: {
		character: {
			type: String,
			required: true
		}
	}
})
</script>

<style lang='scss' scoped>
.floating-component {
  position: absolute;
}
</style>