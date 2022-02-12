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

function create(s: any): Array<Character>{
	const set = s as unknown as Array<Character>
	setBoosts(set)
	return set
}
export default {
	"BasicLatin": create(BasicLatin)
}