import Character from "./Character";

export function boost(c: Character): void{
	c.boost++
	localStorage.setItem(c.symbol, c.boost + "")
}

export function setBoosts(characters: Array<Character>) : void{
	for (const c of characters){
		if (localStorage.getItem(c.symbol)){
			c.boost = Number(localStorage.getItem(c.symbol))
		}
	}
}

export function clear() : void{
	localStorage.clear()
}