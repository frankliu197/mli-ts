<template lang='pug'>

textarea(style = "resize: none;" ref="textarea" @keyup.page-down="insertSuggestDropdown")
n-dropdown
  .absolute-dropdown(v-show="showDropdown" :style="coords") adfsd
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
interface Coordinates { left: string, top: string, height: string, width: string}

let MIN_WIDTH = 50;
export default defineComponent({
  name: 'InputBox',
  methods: {
    insertSuggestDropdown(){
      this.showDropdown = !this.showDropdown
    }
  },
  data: function(){
    return {
      showDropdown: false,
      coords: {} as Coordinates
    }
  },
  watch: {
    showDropdown: function(val) {
      if (!val) {
        return 
      }
      const textarea : HTMLTextAreaElement = this.$refs.textarea as HTMLTextAreaElement
      let fontsize = {} as any;
      fontsize.width = textarea.clientWidth + 1
      fontsize.height = textarea.clientHeight + 1
      let {x, y} = textarea.getBoundingClientRect()
      y += textarea.scrollHeight;
      const offset = textarea.selectionStart * 12 ?? 0
      this.coords = {left: `calc(${x}px + ${offset}px)`, top: y + "px", width: MIN_WIDTH + "px", height: 100 + "px"}
    }
  }
})
</script>

<style lang='scss' scoped>
textarea {
  width: 90%;
  height: 20px;
  margin: 15px;  
  font-size: 20px;
}

.absolute-dropdown {
  position: absolute;
  background-color: yellow;
}
</style>