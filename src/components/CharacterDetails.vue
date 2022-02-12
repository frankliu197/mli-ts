<template lang='pug'>
.character-details
	b {{ startCase(character.name) }}
	b {{ character.symbol }}
	p keywords:
</template>

<script lang='ts'>
import Vue from "vue";
import Character from '@/Recommender/Character';
import {startCase} from "lodash"
export default Vue.extend({
  name: 'CharacterDetails',
	props: {
		character: {
			type: Object as () => Character,
			required: true
		}
	},
	data: function() {
		return {
			startCase
		}
	}
})
</script>

<style lang='scss' scoped>
.floating-component {
  position: absolute;
}
</style>