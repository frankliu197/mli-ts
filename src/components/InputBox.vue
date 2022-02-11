<template lang='pug'>
.input-box
  textarea(ref="textarea" @keyup.page-down="insertSuggestDropdown" default="Type Here")
  .absolute-dropdown(v-show="dropdown.show" :style="dropdown.position")
    input(ref="inputDropdown" v-model="dropdown.search" v-autowidth="{maxWidth:'960px', minWidth: `${dropdown.minWidth}px`, comfortZone: 10}" @blur="dropdown.show = false" @keyup.enter="")
    template(v-for="(item, index) of suggestions")
      v-btn(block @click="") {{index}} {{item}}

</template>

<script lang='ts'>
import recommender from '@/Recommender/Recommender'
import Character from '@/Recommender/Character';

import "@/Recommender/KeywordRecommender";
interface Position { left: string, top: string }
import Vue from "vue";
export default Vue.extend({
  name: 'InputBox',
  data: function() {
    return {
      dropdown: {
        minWidth: 50,
        search: "",
        show: true,
        position: {} as Position
      }
    }
  },
  methods: {
    insertSuggestDropdown(){
      //this.dropdown.show = !this.dropdown.show
      this.dropdown.search = ""
    }
  },
  computed: {
    suggestions: function() : Set<Character> {
      return  recommender(this.dropdown.search)
    }
  },
  watch: {
    "dropdown.show": function(val) {
      //https://stackoverflow.com/questions/17016698/get-caret-coordinates-on-a-contenteditable-div-through-javascript
      //TODO: try getting x and y coordinates on its own
      if (!val) {
        return 
      }

      const textarea = this.$refs.textarea as HTMLTextAreaElement
      const inputDropdown = this.$refs.inputDropdown as HTMLInputElement
      
      let fontsize = {} as any;
      fontsize.width = textarea.clientWidth + 1
      fontsize.height = textarea.clientHeight + 1
      let {x, y} = textarea.getBoundingClientRect()
      y += textarea.scrollHeight;
      const offset = textarea.selectionStart * 12 ?? 0
      //TODO: set min length
      this.dropdown.position = {left: `calc(${x}px + ${offset}px)`, top: y + "px"}
      
      this.$nextTick(()=>{
        inputDropdown.focus()
      })
      
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