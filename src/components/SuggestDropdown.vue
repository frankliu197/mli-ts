<template lang='pug'>
.dropdown(ref="drop" v-click-outside="close")
  .input-section
    input(ref="input" id="suggest_dropdown" v-model="search"  v-autowidth="{maxWidth:'960px', minWidth: `${80}px`, comfortZone: 10}" @keydown="handleDropdown")
  .dropdown-section(ref="dropdown")
    button.dropdown-element(  
      v-for="(item, index) of pageEntries()"
      @click="choose(index)" 
      :class="selectionIndex === index? 'selected': ''"
      @mouseenter="selectionIndex = index") 
        div.index {{index + 1}}
        div.symbol {{item.symbol}}
    .dropdown-footer(v-if="!isLastPage || !isFirstPage")
      button(@click="_prevPage" :disabled="isFirstPage")
        div(class="footer-arrow-left") ◀
      button(@click="_nextPage" :disabled="isLastPage") 
        div(class="footer-arrow-right") ▶
  FloatingComponent(v-show="characterDetails" :position="characterPosition" style="min-width: 150px;") 
    CharacterDetails(v-if="getSuggestion(page, selectionIndex)" :character="getSuggestion(page, selectionIndex)")

</template>


<script lang='ts'>
import Globals from '@/helpers/globals'
import {boost, suggest} from '@/Recommender/Recommender'
import Character from '@/entities/Character';
import CharacterDetails from "@/components/CharacterDetails.vue"
import "@/Recommender/KeywordRecommender";
import Vue from "vue";

import FloatingComponent from "@/components/FloatingComponent.vue"
import {toSafeInteger} from "lodash"
import {Position} from "@/helpers/UiComponents"

export default Vue.extend({
  name: 'SuggestDropdown',
  components: {
    CharacterDetails,
    FloatingComponent
  },
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  data: function() {
    return {
      search: "",
      selectionIndex: 0,
      page: 0,
      characterDetails: false,
      characterPosition: {} as Position
    }
  },
  methods: {
    close(event:any) {
      //alert(event.target.tagName);
      if(event.target.tagName != "A")
        this.$emit('close')
    }, 
    choose(index: number) {
      this.selected(this.getSuggestion(this.page, index))
    },
    enter() {
      this.selected(this.getSuggestion(this.page, this.selectionIndex))
    },
    selected(c: Character) {
      boost(c)
      this.$emit('selected', c) 
      this.close(0)
    },
    toggleCharacterDescription(){
      this.characterDetails = !this.characterDetails
    },
    handleDropdown($event: KeyboardEvent){
     // alert('dropdown');
      //alert($event.key);
      let functionKey = ""
      if ($event.ctrlKey){
        functionKey += "Control "
      }
      
      if ($event.altKey){
        functionKey += "Alt "
      }
      
      if ($event.shiftKey){
        functionKey += "Shift "
      }
      
      if (this.SELECT_ENTRY === functionKey && toSafeInteger($event.key) !== 0){
        this.choose(Number($event.key) - 1)  
        $event.preventDefault()
        return
      }
      
      const shortcutCode = functionKey + $event.key;
      if (this.shortcuts[shortcutCode]){
        this.shortcuts[shortcutCode]()
        $event.preventDefault()
      }

      //prevent defaults of keys in case user rebinds tabs/enters to another key
      if ($event.key === "Tab" || $event.key === "Enter") {
        $event.preventDefault()
      }
    },
    nextEntry() {
			if (this.search === "") {
        return
      }
      if (this.selectionIndex === this.PAGE_ENTRIES && !this.isLastPage){
        this.selectionIndex = 0
        this.page++
        return
      }

      if (this.selectionIndex < this.pageEntriesLength() - 1){
        this.selectionIndex++
      }
		},
    prevEntry() {
			if (this.search === "") {
        return
      }
      if (this.selectionIndex === 0 && !this.isFirstPage){
        this.selectionIndex = this.PAGE_ENTRIES - 1
        this.page--
        return
      }

      if (this.selectionIndex > 0){
        this.selectionIndex--
      }
    },
    prevPage(){
      if (!this.isFirstPage){
        this.page--
        this.selectionIndex = Math.min(this.selectionIndex, this.pageEntriesLength() - 1)
      } else {
        this.selectionIndex = 0
      }
    },
    _prevPage(){
      this.page--
      this.selectionIndex = this.PAGE_ENTRIES - 1
    },
    nextPage(){
      if (!this.isLastPage){
        this.page++
      } else {
        this.selectionIndex = Math.min(this.PAGE_ENTRIES - 1, this.pageEntriesLength() - 1)
      }
    },
    _nextPage(){
      this.page++
      this.selectionIndex = 0
    },
    pageEntriesLength(): number {
      if (this.isLastPage){
        return this.suggestions.length % this.PAGE_ENTRIES
      } else {
        return this.PAGE_ENTRIES
      }
    },
    pageEntries(): Array<Character> { 
      const start = this.PAGE_ENTRIES * this.page
      return this.suggestions.slice(start, start + this.PAGE_ENTRIES)
    },
    getSuggestion(page: number, index: number): Character {
      return this.suggestions[this.PAGE_ENTRIES * page + index]
    }
  },
  computed: {
    suggestions: function() : Array<Character> {
      return suggest(this.search)
    },
    isLastPage: function(){
      //@ts-expect-error no support for computed of computed
      return Math.floor(this.suggestions.length / this.PAGE_ENTRIES) === this.page
    },
    isFirstPage: function(){
      //@ts-expect-error no support for computed of computed
      return 0 === this.page
    },
    PAGE_ENTRIES: function(){
      return Globals.dropdown.PAGE_ENTRIES
    },
    shortcuts: function(){
      const k = Globals.dropdown.shortcuts
      const shortcuts = {} as any
      shortcuts[k.nextPage] = this.nextPage
      shortcuts[k.prevPage] = this.prevPage
      shortcuts[k.nextEntry] = this.nextEntry
      shortcuts[k.prevEntry] = this.prevEntry
      shortcuts[k.toggleCharacterDescription] = this.toggleCharacterDescription
      shortcuts[k.enter] = this.enter
      shortcuts[k.toggleDropdown] = this.close
      return shortcuts
    },
    SELECT_ENTRY: function(){
     return Globals.dropdown.prefix.selectEntry
    }
  },
  watch: {
    show: function(val) {
     // alert("show");
     // alert(val);
      const input = this.$refs.input as HTMLInputElement
      
      if (!val) {
        input.blur()
        this.search = ""
        this.page = 0
        this.selectionIndex = 0
        return 
      }

      this.$nextTick(()=>{
        input.focus()
      })
    },
    search: function(){
      //this.selectionIndex = 0
      const drop = this.$refs.drop as HTMLDivElement
      let x = drop.offsetWidth;
      this.characterPosition = {left: x + "px", top: "9px"}
      this.characterDetails = false;
    }
  },
 
})
</script>

<style lang='scss' scoped>

.input-section {
  background-color: rgb(255, 255, 255);
  font-family: 'Poppins';
  border-radius: 10px 10px 0 0;
  font-size: 20px;
  padding: 7px;
  border: solid 2px rgb(85, 185, 215);
}

input {
  outline: none;
}

.dropdown-section {
  font-family: 'Poppins';
  background-color: white;
  border-radius: 0 0 10px 10px; 
  padding-left: 5px;
  padding-bottom: 5px;
}

.dropdown-footer {
  padding-right: 5px;
  margin-top: 5px;
}

.footer-arrow-left {
  margin-right: 10px;
  font-size: 20px;
}

.footer-arrow-right {
  margin-left: 10px;
  font-size: 20px;
}

.index, .separator, .symbol {
  float: left;
}

.index {
  color: rgb(190, 190, 190);
  font-size: 18px;
  padding-top: 2px;
  min-width: 30px;
  margin-right: 3px;
  text-align: center;
}

.symbol {
  min-width: 20px;
  text-align: center;
  margin-left: 5px;
}

.dropdown {
  padding: 10px;
  min-width: 70px;
  .dropdown-element {
    display: block;
    font-size: 20px;
    border-bottom: 1px solid rgb(180, 180, 180);
    width: 95%;
    padding-top: 5px;
    padding-bottom: 5px; 
    text-align: left;
    display: 0;
    
    &.selected {
      color: rgb(85, 185, 215);
      background-color: rgba(0, 0, 0, 0.03);
    }
  }
}
</style>