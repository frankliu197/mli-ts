<template lang='pug'>

textarea(style = "resize: none;" ref="textarea" @keyup.page-down="insertSuggestDropdown")
.absolute-dropdown(v-show="dropdown.show" :style="dropdown.position")
  SuggestDropdown
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import SuggestDropdown from './SuggestDropdown.vue'
interface Position { left: string, top: string}

let MIN_WIDTH = 50;
export default defineComponent({
  name: 'InputBox',
  components: { 
    SuggestDropdown
  },
  methods: {
    insertSuggestDropdown(){
      this.dropdown.show = !this.dropdown.show
    }
  },
  data: function(){
    return {
      dropdown: {
        show: false,
        position: {} as Position
      }
    }
  },
  watch: {
    showDropdown: function(val) {
      if (!val) {
        return 
      }
      const textarea = this.$refs.textarea as HTMLTextAreaElement
      let fontsize = {} as any;
      fontsize.width = textarea.clientWidth + 1
      fontsize.height = textarea.clientHeight + 1
      let {x, y} = textarea.getBoundingClientRect()
      y += textarea.scrollHeight;
      const offset = textarea.selectionStart * 12 ?? 0
      this.dropdown.position = {left: `calc(${x}px + ${offset}px)`, top: y + "px"}
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
  color: white;
  background-color: rgb(129, 159, 184);
}
</style>