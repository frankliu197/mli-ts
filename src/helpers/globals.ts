import Vue from "vue";

export default Vue.observable({ 
  dropdown: {
    shortcuts: {
      nextPage: "Shift ArrowDown",
      prevPage: "Shift ArrowUp",
      nextEntry: "ArrowDown",
      prevEntry: "ArrowUp",
      toggleCharacterDescription: "Tab",
      enter: "Enter",
      toggleDropdown: "PageDown",
    },
    prefix: {
      selectEntry: "Control ", //function keys need to end with space
    },
    PAGE_ENTRIES: 9,
  },
  clipboard: {
    shortcuts: {
      copyToClipboard: "PageUp"
    }
  }
});
