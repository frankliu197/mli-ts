import Character from "./Character";

export function boost(c: Character){
	c.boost++
	localStorage.setItem(c.symbol, c.boost + "")
}

export function setBoosts(characters: Array<Character>) {
	for (const c of characters){
		if (localStorage.getItem(c.symbol)){
			c.boost = Number(localStorage.getItem(c.symbol))
		}
	}
}

export function clear(){
	localStorage.clear()
}