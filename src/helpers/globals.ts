import Vue from "vue"

export default Vue.observable({
	shortcuts:{
		exact: {
			nextPage: "Shift ArrowDown",
			prevPage: "Shift ArrowUp",
			nextEntry: "ArrowDown",
			prevEntry: "ArrowUp",
			toggleCharacterDescription: "Tab",
			enter: "Enter"
		}, 
		prefix: {
			selectEntry: "Control " //function keys need to end with space
		}
	},
	PAGE_ENTRIES: 9
})