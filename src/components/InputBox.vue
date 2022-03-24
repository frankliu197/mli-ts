<template lang='pug'>
.input-box
  button(@click='copy')
    img(src='../assets/copy.png')
  textarea(ref="textarea" v-on:focus="$event.target.select()" v-on:input="resize" :style="inputStyle" @keydown="handleKeyEvent" default="Type Here" id="input_box")
  FloatingComponent(v-show="dropdownShow" :position="dropdownPosition")
    SuggestDropdown(:show="dropdownShow" @close="dropdownShow = false" @selected="write($event)")

</template>    

<script lang='ts'>
import Character from '@/entities/Character';
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
      dropdownPosition: {} as Position,
      inputHeight: '0'
    }
  },
  methods: {
    write($event: Character) : void {
      const el = this.$refs.textarea as HTMLTextAreaElement
      const [start, end] = [el.selectionStart, el.selectionEnd];
      
      el.setRangeText($event.symbol, start, end);
      el.selectionStart += $event.symbol.length
    },
    handleKeyEvent($event: KeyboardEvent) {
      if (this.toggleDropdownShortcut === $event.key){
        this.dropdownShow = true
        $event.preventDefault()
      } else if (this.copyToClipboardShortcut == $event.key) {
        this.copy()
      }
    },
    resize() {
      this.inputHeight = this.$refs.textarea!.scrollHeight - 15 + 'px';
    },
    copy() {
      this.$refs.textarea!.focus();
      this.$refs.textarea!.select();
      document.execCommand('copy');
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
      // let fontsize = {} as any;
      // fontsize.width = textarea.clientWidth + 1
      // fontsize.height = textarea.clientHeight + 1

      let y = textarea.getBoundingClientRect().y
      let x = textarea.offsetLeft
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      context!.font = 'Poppins';
      const metrics = context?.measureText(textarea.value)
      x += metrics!.width;
      y += textarea.scrollHeight;
      const offset = textarea.selectionStart * 12 ?? 0
      this.dropdownPosition = {left: `calc(${x}px + ${offset}px)`, top: y + "px"}
    }
  }, 
  computed: {
    toggleDropdownShortcut: function(){
      return Globals.dropdown.shortcuts.toggleDropdown
    },
    copyToClipboardShortcut: function() {
      return Globals.clipboard.shortcuts.copyToClipboard
    },
    inputStyle () : {'min-height': string} {
        return {
          'min-height': this.inputHeight
        }
    }
  }
})
</script>

<style lang='scss' scoped>

img {
  width: 38px;
  height: 43px;
  margin-right: 23px;
  margin-bottom: 12px;
}

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
  resize: none;
  box-shadow: 0 0 10px 1px rgb(96, 213, 248);
  margin-right: 50px;
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