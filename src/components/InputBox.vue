<template lang='pug'>
.input-box
  textarea(ref="textarea" @keydown="openDropdown" default="Type Here" id="input_box")
  FloatingComponent(v-show="dropdownShow" :position="dropdownPosition")
    SuggestDropdown(:show="dropdownShow" @close="dropdownShow = false" @selected="write($event)")

</template>    

<script lang='ts'>
import Character from '@/Recommender/Character';
import SuggestDropdown from "@/components/SuggestDropdown.vue"
import "@/Recommender/KeywordRecommender";
import Vue from "vue";
import {Position} from "@/helpers/UiComponents"
import FloatingComponent from "@/components/FloatingComponent.vue"
import Globals from '@/helpers/globals'

export default Vue.extend({ 
  name: 'InputBox',
  components: {
    SuggestDropdown,
    FloatingComponent
  },
  data: function() {
    return {
      dropdownShow: false,
      dropdownPosition: {} as Position
    }
  }, 
  methods: {
    write($event: Character) : void {
      const el = this.$refs.textarea as HTMLTextAreaElement
      const [start, end] = [el.selectionStart, el.selectionEnd];
      
      el.setRangeText($event.symbol, start, end);
      el.selectionStart += $event.symbol.length
    },
    openDropdown($event: KeyboardEvent) {
      if (this.toggleDropdownShortcut === $event.key){
        this.dropdownShow = true
        $event.preventDefault()
      }
    }
  },
  watch: {
    dropdownShow: function(val) {
      //https://stackoverflow.com/questions/17016698/get-caret-coordinates-on-a-contenteditable-div-through-javascript
      //TODO: try getting x and y coordinates on its own
      
      const textarea = this.$refs.textarea as HTMLTextAreaElement
      
      if (!val) {
        textarea.focus()
        return 
      }
            
      let fontsize = {} as any;
      fontsize.width = textarea.clientWidth + 1
      fontsize.height = textarea.clientHeight + 1
      let {x, y} = textarea.getBoundingClientRect()
      y += textarea.scrollHeight;
      const offset = textarea.selectionStart * 12 ?? 0

      this.dropdownPosition = {left: `calc(${x}px + ${offset}px)`, top: y + "px"}
    }
  }, 
  computed: {
    toggleDropdownShortcut: function(){
      return Globals.dropdown.shortcuts.toggleDropdown
    }
  }
})
</script>

<style lang='scss' scoped>

textarea {
  background: white;
  font-family: 'Poppins';
  font-size: 35px;
  padding: 10px;
  height: 73px;
  width: 80%;
  overflow: hidden;
  border-radius: 10px;
  border: double 3px #133257;
  box-shadow: 0 0 10px 1px rgb(96, 213, 248);
}

.input-box {
  text-align: center;
}



.dropdown {
  padding: 10px;
  min-width: 70px;
  .dropdown-element {
    display: block;
  }
}

</style>
