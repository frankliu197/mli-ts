import {BPlusTree} from "./BPlusTree"
import Character from "./Character"


//export default interface RecommenderStrategy {
//		add
//}

export class KeywordRecommender {
	tree: BPlusTree
	constructor(){
		this.tree = new BPlusTree()
	}
	addSymbolSet(characters: Character[]) : void{
		for (const c of characters){
			for (const k of c.name.split(" ")){
				this.tree.insert(k, c)
			}
		}
		
	}	
	suggest(search: string) : Array<Character>{
		if (!search){
			return []
		}
		console.log(this.tree.toString())
		
		console.log(this.tree.getKeywordSet("CO"))
		
		console.log(this.tree.getKeywordSet("REVERSE"))
		
		console.log(this.tree.getKeywordSet("ABCDGB"))
		return this.tree.getCharacterSet(search)
	}
}
