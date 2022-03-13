<template lang='pug'>
.character-details
	div(class="name") {{ startCase(character.name) }}
	div(class="symbol") {{ character.symbol }}
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

.character-details {
	font-family: 'Poppins';
	background-color: white;
	padding: 15px;
	border-style: double;
	border-radius: 0 10px 10px 0;
	box-shadow: 3px 3px 8px 1px rgba(96, 213, 248, 0.5);
}

.name {
	padding-bottom: 5px;
	margin-bottom: 5px;
	border-bottom: 2px solid rgb(180, 180, 180); 
}

.symbol {
	font-size: 30px;
}

.floating-component {
  position: absolute;
}
</style>