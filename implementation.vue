<template lang='html'>
InputBox

// HAD A issue with vs, will update and push code later but for now its in a file. and will be converted

<!--<div> sample code for drop down menu to be sampled off of </div>--> 
 <!--<div> https://vuejsexamples.com/suggestion-list-input-for-vue-js/?fbclid=IwAR3JAHp8FbTm98MOjsf7IC_EtHUWGKpN9eYQHGwcN3u6JpMc00Aab1ZgiCk </div>--> 
<div>
  
</div>
<div class="SearchBar-container">
    <input type="text" name="search">
    <button type="submit"> <i class="fa fa-search"></i>


    </button>




  </div>
</template>

<script lang="ts">
import InputBox from "../components/InputBox.vue"
import SearchBar from "../pages/search-bar.vue"
export default {
  name: 'Home',
  components: {
    InputBox,
    SearchBar

  }

  ,methods : {

    handleSearch(value: any) {
    console.log(value);
    }
  }
}

</script>

<style>
</style>
