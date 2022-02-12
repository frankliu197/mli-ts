
import {BPlusTree} from "./BPlusTree"
import Character from "./Character"
import SymbolSet from './SymbolSet';


import { valueCountPriority, combinePriority , stringMatchPriority} from "./Priority"


export class KeywordRecommender {
	tree: BPlusTree
	constructor(){
		this.tree = new BPlusTree()
	}
	add(set: SymbolSet) : void{
		for (const c of set.symbols){
			for (const k of c.name.split(" ")){
				this.tree.insert(k, c)
			}
		}
		this.tree.updatePriorities()
	}	
	suggest(search: Array<string>) : Map<Character, number>{
		//add only matching elements in prev map and character set from this search time to nextMap
		//this way next map matches all search terms
		let map = this.tree.getCharacterSet(search[0])
		let nextMap = new Map<Character, number>()
		for (let i = 0; i < search.length; i++){
			for (const [c, p] of this.tree.getCharacterSet(search[i]).entries()){
				if (map.has(c)){
          nextMap.set(c, combinePriority(p, map.get(c)!)) 
        }
			}
			map = nextMap
			nextMap = new Map<Character, number>()
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