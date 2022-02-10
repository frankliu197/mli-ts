<template lang='pug'>

textarea(style = "resize: none;" ref="textarea" v-model="search" @keyup.page-down="insertSuggestDropdown" default="Type Here")
.absolute-dropdown(v-show="dropdown.show" :style="dropdown.position")
  input(@blur="dropdown.show = false")
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import recommender from '../Recommender/Recommender'
import Character from '../Recommender/Character';
interface Position { left: string, top: string, minlength: string}

export default defineComponent({
  name: 'InputBox',
  data: function() {
    return {
      search: "",
      dropdown: {
        show: true,
        position: {} as Position
      }
    }
  },
  methods: {
    insertSuggestDropdown(){
      this.dropdown.show = !this.dropdown.show
    }
  },
  computed: {
    suggestions: function() : Set<Character> {
      return recommender(this.search)
    }
  },
  watch: {
    showDropdown: function(val) {
      //https://stackoverflow.com/questions/17016698/get-caret-coordinates-on-a-contenteditable-div-through-javascript
      //TODO: try getting x and y coordinates on its own
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
      //TODO: set min length
      this.dropdown.position = {left: `calc(${x}px + ${offset}px)`, top: y + "px", minlength: "10px"}
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