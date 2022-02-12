//import Character from './Character';
//readonly order: number
import { isUndefined } from "typescript-collections/dist/lib/util"
import {enumerate} from "@/helpers/helpers"
import Character from "./Character"
import SymbolSet from "./SymbolSet"
const order = 4

export class BPlusTree {
	root: Node

	constructor(){
		this.root = new Node()
	}

	insert(key: string, value: Character): void{
		const node = this.searchNode(key)

		const index = node.index(key)
		if (index > 0 && node.keys[index - 1] === key){
			//if an index exists it is always -1 because node.index only does lt comparation
			node.values[index - 1].add(value)
			return
		} 
		node.keys.splice(index, 0, key)
		const set = new Set<Character>()
		set.add(value)
		node.values.splice(index, 0, set)
		
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

					
			if (left.child.length + right.child.length > order){
				right.keys.splice(0, 1)
				right.values.splice(0, 1)
				
				left.child.push(...right.child.splice(0, 1))
			}
				
			parent.child = [left, right]
			parent.nextNode = undefined

			this.root = parent
			return
		}		

		//merge this node with parent node-----------
		const parent = node.parent as Node

		//locate child key and append. should not have duplicates becuase the number that matches is usualy on the left
				
		const pivot = right.keys[0]
		const pivotValue = right.values[0]
		const pivotIndex = parent.index(pivot)
		parent.keys.splice(pivotIndex, 0, pivot)
		parent.values.splice(pivotIndex, 0, pivotValue)
		parent.child.splice(pivotIndex + 1, 0, right) //due to left node
		
		if (left.child.length + right.child.length > order){
			right.keys.splice(0, 1)
			right.values.splice(0, 1)
			left.child.push(...right.child.splice(0, 1))
		}

		left.parent = parent
		right.parent = parent

		this.insertRecursive(parent)
	}

	
	getCharacterSet(key: string): Array<string> {
		let curr: Node | undefined = this.lowerBound(key)
		const end = this.upperBound(key)
		const arr = []
		
		let startIndex = curr.lowerBound(key)
		if (curr.keys[startIndex - 1] === key){
			startIndex--
		}

		const endIndex = end.upperBound(key)
		
		if (curr === end){
			arr.push(...curr.keys.slice(startIndex, endIndex))
			return arr
		}

		arr.push(...curr.keys.slice(startIndex))
		
		curr = curr.nextNode
		while (curr !== end){
			arr.push(...curr!.keys)
			curr = curr!.nextNode
		}
		
		arr.push(...curr!.keys.slice(0, endIndex))
		return arr
	}
	private static addValuesToSet(set: Set<Character>, node: Node, startIndex=0, endIndex?:number){
		endIndex = endIndex ?? node.values.length
		for (let i = startIndex; i < endIndex; i++){
			for (const c of node.values[i]){
				set.add(c)
			}
		}
		return set
	}
	/*
	getCharacterSet(key: string): Set<Character> {
		let curr: Node | undefined = this.lowerBound(key)
		const end = this.upperBound(key)
		const set = new Set<Character>()
		
		let startIndex = curr.lowerBound(key)
		if (curr.keys[startIndex - 1] === key){
			startIndex--
		}

		const endIndex = end.upperBound(key)
		
		if (curr === end){
			BPlusTree.addValuesToSet(set, curr, startIndex, endIndex)
		}
		BPlusTree.addValuesToSet(set, curr)
		
		curr = curr.nextNode
		while (curr && curr !== end){ //remove
			BPlusTree.addValuesToSet(set, curr!)
			curr = curr!.nextNode
		}
		
		BPlusTree.addValuesToSet(set, curr!, 0, endIndex)
		return set
	}*/


	private lowerBound(key: string) : Node {
		let curr = this.root
		while (!curr.leaf){
			const index = curr.lowerBound(key)
			curr = curr.child[index] 
		}
		return curr
	}

	private upperBound(key: string) : Node {
		let curr = this.root
		while (!curr.leaf){
			const index = curr.upperBound(key)
			curr = curr.child[index] 
		}
		return curr
	}

	private searchNode(key: string) : Node {
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

	_toArray(): Array<Node> {
		const arr = new Array<Node>()
		let curr = this.root
		while (!curr.leaf){
			curr = curr.child[0] 
		}
		
		arr.push(curr)
		while (curr.nextNode){
			curr = curr.nextNode
			arr.push(curr)
		}
		return arr
	}

	toArray(): Array<string> {
		const arr = new Array<string>()
		let curr = this.root
		while (!curr.leaf){
			curr = curr.child[0] 
		}
		
		arr.push(...curr.keys)
		while (curr.nextNode){
			curr = curr.nextNode
			arr.push(...curr.keys)
		}
		return arr
	}

	
}

/**
 * When splitting, set the parent key to left-most key of the right child node
 */
export class Node {
	leaf: boolean
	keys: Array<string>
	values: Array<Set<Character>> //values of the keys. only used on leaf nodes
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
	index(key: string) : number{
		for (const [i, k] of enumerate(this.keys)){
			if (key < k){
				return i
			}
		}
		return this.keys.length
	}

	lowerBound(key: string) : number {
		for (const [i, k] of enumerate(this.keys)){
			if (key < k){
				return i
			}
		}
		return this.keys.length
	}

	upperBound(key: string) : number {		
		for (const [i, k] of enumerate(this.keys)){
			if (!(key > k || k.startsWith(key))){
				return i
			}
		}
		return this.keys.length
	}

	toString() : string {
		return `[${this.keys.join(", ")}]`
	}
}



export class StubNode {
	keys: Array<string>
	child?: Array<StubNode>
	_nextNode?: StubNode
	_values?: Array<Set<Character>>
}

export class StubTree {
	keys: Array<string>
	child?: Array<StubNode>
	_nextNode: StubNode
	_values: Array<Set<Character>>
}

export function createStubTree(stubNode: StubNode, characters: Array<Character>) : StubTree {
	//fills in all the nextNodes
	addValuesToStubNode(stubNode, characters)
	
	const queue = new Array<{node: StubNode, depth: number}>()
	let prev = {node: stubNode, depth: 1}

	if (!stubNode.child){
		return stubNode as StubTree
	}

	for (const i of stubNode.child){
		queue.push({node: i, depth: 2})
	}
	
	while (queue.length > 0){
		const curr = queue.shift()!
		addValuesToStubNode(curr.node, characters)
		
		if (curr.depth === prev.depth){
			prev.node._nextNode = curr.node
		}
		prev = curr
	}
	return stubNode as StubTree	
}

function addValuesToStubNode(stubNode: StubNode, characters: Array<Character>): void{
	stubNode._values = []
	for (const i in stubNode.keys){
		stubNode._values.push(new Set<Character>())
	}
	for (const c of characters){
		for (const k of c.name.split(" ")){
			const indexOf = stubNode.keys.indexOf(k)
			if (indexOf >= 0){
				stubNode._values[indexOf].add(c)
			}
		}
	}
}

const tree = new BPlusTree()
const characters = SymbolSet["BasicLatin"].slice(0, 42)
let i = 0
		for (const c of characters){
			i++
			for (const k of c.name.split(" ")){
				if (i === 42){
					//console.log(k)
					//console.log(tree)
				//console.log(tree.toString())
				//debugger
				}
				
				tree.insert(k, c)
				
			}
		}
		//console.log(tree)
		//console.log(tree.toString())
		//console.log(tree.toArray())
//console.log("character set", tree.getCharacterSet("M"))
		


import chai, { assert, expect } from 'chai'
import ChaiSorted from 'chai-sorted'
import { arrays } from "typescript-collections"
chai.use(ChaiSorted)

	
export function assertTree(actualTree: BPlusTree, stubNode: StubTree) {
	//assert root node
	assert.isUndefined(actualTree.root.parent, "root.parent")
	assert.isUndefined(actualTree.root.nextNode, "root.nextNode")
	assert.deepEqual(actualTree.root.keys, stubNode.keys, "root.keys")
	assert.deepEqual(actualTree.root.values, stubNode._values, "root.values")
	
	//@ts-expect-error: ts not reading sorted
	expect(actualTree.toArray()).to.be.sorted()

	if (stubNode.child){
		assert.lengthOf(actualTree.root.child, stubNode.child.length, "root.child")
		assert.isFalse(actualTree.root.leaf, "root.leaf")
		
		for (const i in stubNode.child){
			assert.equal(actualTree.root, actualTree.root.child[i].parent)
			assertNode(actualTree.root.child[i], stubNode.child[i])
		}
		
	} else {
		assert.isTrue(actualTree.root.leaf, "root.leaf")
		assert.isEmpty(actualTree.root.child)
	}
}

//does not assert parent as it is done in assert Tree
function assertNode(actualNode: Node, stubNode: StubNode) {
	if (stubNode._nextNode){
		assert.isDefined(actualNode.nextNode)

		//@ts-expect-error: fails to see assertion
		assert.deepEqual(actualNode.nextNode.keys, stubNode._nextNode.keys, "Assert deep equal keys of next node. Either next node reference is wrong or the keys are wrong on the next node")
	} else {
		assert.isUndefined(actualNode.nextNode)
	}
	
	assert.deepEqual(actualNode.keys, stubNode.keys, "child.keys")
	assert.deepEqual(actualNode.values, stubNode._values, "child.values")

	if (stubNode.child){
		assert.lengthOf(actualNode.child, stubNode.child.length, "child.child")
		assert.isFalse(actualNode.leaf, "child.leaf")
		for (const i in stubNode.child){
			assertNode(actualNode.child[i], stubNode.child[i])
		}
	} else {
		assert.isTrue(actualNode.leaf, "child.leaf")
		assert.isEmpty(actualNode.child)
	}
}

const stubTree = createStubTree({
	keys: ["NUMBER", "QUOTATION"],
	child: [{
		keys: ["DOLLAR", "EXCLAMATION", "MARK"]
	}, {
		keys: ["NUMBER", "PERCENT"]
	}, {
		keys: ["QUOTATION", "SIGN"]
	}]
}, characters)