import { isUndefined } from "typescript-collections/dist/lib/util";
import { enumerate } from "@/helpers/helpers";
import Character from "./Character";
import { valueCountPriority, combinePriority , stringMatchPriority} from "./Priority"
import { Queue } from "typescript-collections";

//https://stackoverflow.com/questions/39927452/recursively-print-all-permutations-of-a-string-javascript
function findPermutations(keyword: string) : Array<string>{
  if (keyword.length < 2 ){
    return [keyword]
  }

  let permutations = [] 
   
  for (let i = 0; i < keyword.length; i++){
    let char = keyword[i]

    if (keyword.indexOf(char) != i) {
			continue
		}
    
    let remainingChars = keyword.slice(0, i) + keyword.slice(i + 1, keyword.length)

    for (const p of findPermutations(remainingChars)){
      permutations.push(char + p) 
		}
  }
  return permutations
}



export class SymbolTree {
  root: Node
  values: Map<string, Set<Character>>
	nodes: Map<string, Node>

  constructor() {
    this.root = new Node("")
    this.values = new Map<string, Set<Character>>()
		this.nodes = new Map<string, Node>()
		this.nodes.set("", this.root)
  }

  private appendToValues(key: string, value: Character){
    const set = this.values.get(key)!
    set.add(value)
  }

  insert(key: string, value: Character): void {
    if (this.values.has(key)){
      this.appendToValues(key, value)
      return
    }
		debugger
		let prev = new Node(key)
		key = key.slice(0, -1)
		for (let k of findPermutations(key)){
			if (this.nodes.has(k)){
				break
			}
			const curr = new Node(k)
			curr.child.set(k, prev)
			prev = curr
			k = k.slice(0, -1)
		}
  }

	
	getCharacterSet(search: string): Map<Character, number> {
		const map = new Map<Character, number>()
    const node = this.nodes.get(search)
		if (!node){
			return map
		}

		const queue = new Queue<Node>()
		const visited = new Set<Node>()
		queue.enqueue(node)
		visited.add(node)

		while (queue.size() > 0) {
			const curr = queue.dequeue()!
			const p = stringMatchPriority(search, curr.key)

			for (const c of this.values.get(curr.key)!){
				//only set the first time, because that time is the closest to the node that has been search
				if (!map.has(c)){
					map.set(c, p)
				}
			}

			for (const n of curr.child.values()){
				if (!visited.has(n)){
					visited.add(n)
					queue.enqueue(n)
				}
			}
		}
		return map
	}
}
export class Node {
	key: string
  child: Map<string, Node>;
  
  constructor(key: string) {
		this.key = key
    this.child = new Map<string, Node>()
  }

	toString():string {
		return this.key
	}
}