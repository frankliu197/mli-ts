<template lang='pug'>
.floating-component(:style="position")
	slot
</template>

<script lang='ts'>
import Vue from "vue";
import {Position} from "@/helpers/UiComponents" 
export default Vue.extend({
  name: 'FloatingComponent',
	props: {
		position: {
			type: Object as () => Position,
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