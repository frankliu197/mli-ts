import { isUndefined } from "typescript-collections/dist/lib/util";
import { stripLetter } from "@/helpers/helpers";
import Character from "./Character";
import { valueCountPriority, combinePriority , stringMatchPriority} from "./Priority"
import { Queue } from "typescript-collections"




export class StrokeTree {
  root: Node
  values: Map<string, Set<Character>>
	nodes: Map<string, Node>

  constructor() {
    this.root = new Node("")
    this.values = new Map<string, Set<Character>>()
		this.nodes = new Map<string, Node>()
		this.nodes.set("", this.root)
  }



/*let strokeArr = c.strokes.split("").sort()
		let strokeVal = strokeArr.join()

    */
  insert(c: Character): void {
		if (this.values.has(c.strokes)){
      const set = this.values.get(c.strokes)!
			set.add(c)
      return
    }
		
		let currNode = new Node(c.strokes)
		this.nodes.set(c.strokes, currNode)

		const set = new Set<Character>()
		set.add(c)
		this.values.set(c.strokes, set)

		for (const s of stripLetter(c.strokes)){
			this.insertRecursive(currNode, s)
		}
  }

	insertRecursive(childNode: Node, stroke: string) : void{
		if (this.nodes.has(stroke)){
			this.nodes.get(stroke)?.child.push(childNode)
			return
		}

		const currNode = new Node(stroke)
		this.nodes.set(stroke, currNode)
		this.values.set(stroke, new Set())
		currNode.child.push(childNode)
		
		for (const s of stripLetter(stroke)){
			this.insertRecursive(currNode, s)
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
			const p = stringMatchPriority(search, curr.stroke)

			for (const c of this.values.get(curr.stroke)!){
				//only set the first time, because that time is the closest to the node that has been search
				if (!map.has(c)){
					map.set(c, p)
				}
			}

			for (const n of curr.child){
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
	stroke: string
  child: Array<Node>;
  
  constructor(stroke: string) {
		this.stroke = stroke
    this.child = new Array<Node>()
  }

	toString():string {
		return this.stroke
	}
}
