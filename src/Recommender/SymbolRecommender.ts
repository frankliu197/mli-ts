
import {SymbolTree} from "./SymbolTree"
import Character from "./Character"
import SymbolSet from './SymbolSet';

import { combinePriority } from "./Priority"


export class SymbolRecommender {
	tree: SymbolTree
	constructor(){
		this.tree = new SymbolTree()
	}
	add(set: SymbolSet) : void{
		for (const c of set.symbols){
			this.tree.insert(c)
		}
	}	

	suggest(search: string) : Map<Character, number>{
		let map = this.tree.getCharacterSet(search)
		//let start = new Date().getTime();

		
		//const end = new Date().getTime();
		//const time = end - start;
		//console.log(start)
		//console.log('Execution time (ms): ' + time);
		//todo sort
		return map
	}
}