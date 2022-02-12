import {BPlusTree} from "./BPlusTree"
import Character from "./Character"

import { valueCountPriority, combinePriority , stringMatchPriority} from "./Priority"

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
		this.tree.updatePriorities()
	}	
	suggest(search: string) : Map<Character, number>{
		search = search.trim()
		if (!search){
			return new Map()
		}
		const terms = search.split(" ");
		const map = this.tree.getCharacterSet(terms[0])
		for (let i = 0; i < terms.length; i++){
			const temp = this.tree.getCharacterSet(terms[i])
			for (const [c, p] of temp.entries()){
				if (map.has(c)){
          map.set(c, combinePriority(p, map.get(c)!)) 
        } else {
          map.set(c, p) 
        }
			}
		}
		//let start = new Date().getTime();

		
		//const end = new Date().getTime();
		//const time = end - start;
		//console.log(start)
		//console.log('Execution time (ms): ' + time);
		//todo sort
		return map
	}
}
