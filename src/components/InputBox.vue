<template lang='pug'>

textarea(ref="textarea" @keyup.page-down="insertSuggestDropdown")

.absolute-dropdown
  n-dropdown(:show="showDropdown")
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'InputBox',
  methods: {
    insertSuggestDropdown(){
      this.showDropdown = true
    }
  },
  data: function(){
    return {
      showDropdown: false
    }
  },
  computed: {
   /* dropdownLocation: function(){
      const textarea = this.$refs.textarea
      const {x, y} = textarea.getBoundingClientRect()
      let pos = textarea.selectionStart ?? 0
      return { x: x + pos, y: y}
    }*/
  }
})
</script>

<style lang='scss' scoped>
textarea {
  width: 90%;
  margin: 15px;  
}

.absolute-dropdown {
  position: absolute;
}
</style>
