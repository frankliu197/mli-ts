import {BPlusTree} from "./BPlusTreeCharacter"
import Character from "./Character"


//export default interface RecommenderStrategy {
//		add
//}

class KeywordRecommender {
	tree: BPlusTree
	constructor(){
		this.tree = new BPlusTree()
	}
	addSymbolSet(characters: Character[]) {
		/*for (const c of characters){
			for (const k of c.name.split(" ")){
				this.tree.insert(k, c)
				
		console.log(this.tree)
		console.log(this.tree.toString())
			}
		}*/
	}	
}

export default new KeywordRecommender()