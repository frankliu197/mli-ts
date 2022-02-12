import BasicLatin from "../symbols/json/BasicLatin.json" 
import LatinExtended from "../symbols/json/LatinExtended.json"
import Greek from "../symbols/json/Greek.json"
import MathOperators from "../symbols/json/MathOperators.json"
import MiscTechnical from "../symbols/json/MiscTechnical.json"
import NumberForms from "../symbols/json/NumberForms.json"
import SmallFormVariants from "../symbols/json/SmallFormVariants.json"
import SuperscriptsAndSubscripts from "../symbols/json/SuperscriptsAndSubscripts.json"
import Character from "./Character"
import { setBoosts } from "./Storage"

class SymbolSet {
	sets: Map<string, Array<Character>>
	symbols: Map<string, Character>

	constructor(){
		this.sets = new Map()
		this.symbols = new Map()
	}

	_add(name: string, s: any) {
		const set = s as unknown as Array<Character>
		for (const c of set){
			setBoosts(c)
			this.symbols.set(c.symbol, c)
		}

		this.sets.set(name, set)
	}

	get(name: string){
		return this.sets.get(name)
	}

	getCharacter(symbol: string) : Character | undefined {
		return this.symbols.get(symbol)
	}
	
}

const symbolSet = new SymbolSet()
symbolSet._add("BasicLatin", BasicLatin)
export default symbolSet