//import Character from './Character';
//readonly order: number
import { isUndefined } from "typescript-collections/dist/lib/util"
import {enumerate} from "./Helper"
const order = 4
//https://gist.github.com/savarin/69acd246302567395f65ad6b97ee503d
/**
 * Same keys are not permitted
 */
export class BPlusTree {
	root: Node

	constructor(){
		this.root = new Node()
	}

	insert(key: number, value: number){
		const node = this.searchNode(key)
		node.insert(key, value)
		this.insertRecursive(node)
	}

	private insertRecursive(node: Node){		
		if (node.keys.length !== order){
			return	
		}

		//split to left & right nodes
		//original node must be left node to ensure node.previousNode.nextNode === node
		const left = node
		const right = new Node(node.leaf)

		const mid = Math.floor(order / 2)
		right.keys = node.keys.splice(mid, order)
		right.values = node.values.splice(mid, order)
		right.child = node.child.splice(mid, order)
		right.nextNode = node.nextNode

		left.nextNode = right
		
		for (const n of left.child){
			n.parent = left
		}
		for (const n of right.child){
			n.parent = right
		}

		//if is root, make node - root node
		if (isUndefined(node.parent)){
			const parent = new Node(false)
			
			left.parent = parent
			right.parent = parent

			parent.keys = [right.keys[0]]
			parent.values = [right.values[0]]
			parent.child = [left, right]
			parent.nextNode = undefined

			this.root = parent
			return
		}		

		//merge this node with parent node-----------
		const parent = node.parent as Node
		const pivot = right.keys[0]

		//locate child key and append. should not have duplicates becuase the number that matches is usualy on the left
		const pivotIndex = parent.index(pivot) + 1 //+1 due to left node
		parent.keys.splice(pivotIndex, 0, pivot)
		parent.values.splice(pivotIndex, 0, pivot)
		parent.child.splice(pivotIndex, 0, right)
		left.parent = parent
		right.parent = parent

		this.insertRecursive(parent)
	}


	private searchNode(key: number) : Node {
		let curr = this.root
		while (!curr.leaf){
			const index = curr.index(key)
			curr = curr.child[index] 
		}
		return curr
	}

	toString() : string {
		return this._toString(this.root)
	}

	private _toString(node: Node, indent=""): string {
		let s = indent + "- " + node.toString() + "\n"
		for (const n of node.child){
			s += this._toString(n, indent + "\t")
		}
		return s
	}

	toArray(): Array<number> {
		const arr = new Array<number>()
		let curr = this.root
		while (!curr.leaf){
			curr = curr.child[0] 
		}
		
		arr.push(...curr.values)
		while (curr.nextNode){
			curr = curr.nextNode
			arr.push(...curr.values)
		}
		return arr
	}
}

/**
 * When splitting, set the parent key to left-most key of the right child node
 */
export class Node {
	leaf: boolean
	keys: Array<number>
	values: Array<number> //values of the keys. only used on leaf nodes
	child: Array<Node> 
	nextNode?: Node
	parent?: Node

	constructor(leaf=true){
		this.leaf = leaf
		this.keys = []
		this.values = []
		this.child = []
	}

	/**
	 * The index location of the given key
	 * e.g. node.keys = [2, 5]
	 * if key < 2, index(key) = 0
	 * if key < 5, index(key) = 1
	 * if key >= 5, index(key) = 2  
	 * 
	 * For a node of n keys, there are n+1 childrens, 
	 * thus curr.child[index(key)] will never be out of bounds if node is not leaf
	 * @param key 
	 * @param node 
	 * @returns 
	 */
	index(key: number) : number{
		for (const [i, k] of enumerate(this.keys)){
			if (key < k){
				return i
			}
		}
		return this.keys.length
	}

	insert(key: number, value: number) : void{
		const index = this.index(key)
		this.keys.splice(index, 0, key)
		this.values.splice(index, 0, value)
	}

	toString() : string {
		return `[${this.keys.join(", ")}]`
	}
}

/*
	add(character : Character) : void {
		for (const i of character.name.split(" ")){
			
		}
	}
	
	get(keyword: string) : Set<Character>{
		for (const i of keywords.split(" ")){
		
		}
	
	}

	private */

	/*
	tsc helloworld.ts
Again run the command

node helloworld.js
*/
