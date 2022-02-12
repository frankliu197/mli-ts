import {BPlusTree} from "./BPlusTreeCharacter"
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
		
		return this.tree.getCharacterSet(search)
	}
}
