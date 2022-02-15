import { isUndefined } from "typescript-collections/dist/lib/util";
import { enumerate } from "@/helpers/helpers";
import Character from "./Character";
import { valueCountPriority, combinePriority , stringMatchPriority} from "./Priority"
import { Queue } from "typescript-collections";
const order = 4;

/**
 * This is a modified BPlusTree
 * 
 */
export class KeywordTree {
  root: Node
  priorities: Map<string, number>
  values: Map<string, Set<Character>>

  constructor() {
    this.root = new Node();
    this.priorities = new Map()
    this.values = new Map()
  }

  /**
   * Once you are done inserting everything, this will update the priority of each keyword in each node
   */
  updatePriorities() : void{
    this.priorities = new Map<string, number>()
    let curr = this.root;
    while (!curr.leaf) {
      curr = curr.child[0];
    }

    for (const key of curr.keys){
      this.priorities.set(key, valueCountPriority(this.values.get(key)!.size)) 
    }

    while (curr.nextNode) {
      curr = curr.nextNode;
      for (const key of curr.keys){
        this.priorities.set(key, valueCountPriority(this.values.get(key)!.size)) 
      }
    }
  }



  insert(key: string, value: Character): void {
    if (this.values.has(key)){
      const set = this.values.get(key)!
      set.add(value)
      return
    }

    const node = this.searchNode(key);
    const index = node.index(key);

    node.keys.splice(index, 0, key);
    const set = new Set<Character>()
    set.add(value)
    this.values.set(key, set)

    this.insertRecursive(node);
  }

  private insertRecursive(node: Node) {
    if (node.keys.length !== order) {
      return;
    }

    //split to left & right nodes
    //original node must be left node to ensure node.previousNode.nextNode === node
    const left = node;
    const right = new Node(node.leaf);

    const mid = Math.floor(order / 2);

    right.keys = node.keys.splice(mid, order);
    right.child = node.child.splice(mid, order);
    right.nextNode = node.nextNode;

    left.nextNode = right;

    for (const n of left.child) {
      n.parent = left;
    }
    for (const n of right.child) {
      n.parent = right;
    }

    //if is root, make node - root node
    if (isUndefined(node.parent)) {
      const parent = new Node(false);

      left.parent = parent;
      right.parent = parent;

      parent.keys = [right.keys[0]];

      if (left.child.length + right.child.length > order) {
				//remove duplicate right key and move a node over to left
        right.keys.splice(0, 1);
				const temp = right.child.splice(0, 1)[0]
				temp.parent = left
        left.child.push(temp);
      }

      parent.child = [left, right];
      parent.nextNode = undefined;

      this.root = parent;
      return;
    }

    //merge this node with parent node-----------
    const parent = node.parent as Node;

    //locate child key and append. should not have duplicates becuase the number that matches is usualy on the left

    const pivot = right.keys[0];
    const pivotIndex = parent.index(pivot);
    parent.keys.splice(pivotIndex, 0, pivot);
    parent.child.splice(pivotIndex + 1, 0, right); //due to left node

    if (left.child.length + right.child.length > order) {
      right.keys.splice(0, 1);
			const temp = right.child.splice(0, 1)[0]
			temp.parent = left
			left.child.push(temp);
    }

    left.parent = parent;
    right.parent = parent;

    this.insertRecursive(parent);
  }

  getKeywordSet(key: string): Array<string> {
    let curr: Node | undefined = this.lowerBound(key);
    const end = this.upperBound(key);
    const arr = [];

    let startIndex = curr.lowerBound(key);
    if (curr.keys[startIndex - 1] === key) {
      startIndex--;
    }

    const endIndex = end.upperBound(key);

    if (curr === end) {
      arr.push(...curr.keys.slice(startIndex, endIndex));
      return arr;
    }

    arr.push(...curr.keys.slice(startIndex));

    curr = curr.nextNode;
    while (curr !== end) {
      arr.push(...curr!.keys);
      curr = curr!.nextNode;
    }

    arr.push(...curr!.keys.slice(0, endIndex));
    return arr;
  }

  /**
   * 
   * @param map 
   * @param node 
   * @param search search string (for priority)
   * @param startIndex 
   * @param endIndex 
   */
  private addValuesToMap(map: Map<Character, number>, node: Node, search: string, startIndex = 0, endIndex?: number) {
    //endIndex = endIndex ?? node.values.length; does not work for testing
    if (isUndefined(endIndex)){
      endIndex = node.keys.length
    }
    
    for (let i = startIndex; i < endIndex; i++) {
      const p = combinePriority(stringMatchPriority(search, node.keys[i]), this.priorities.get(node.keys[i])!)
      for (const c of this.values.get(node.keys[i])!){
        if (map.has(c)){
          map.set(c, combinePriority(p, map.get(c)!)) 
        } else {
          map.set(c, p) 
        }
      }
    }
  }
	
	getCharacterSet(search: string): Map<Character, number> {
		let curr: Node | undefined = this.lowerBound(search)
		const end = this.upperBound(search)
		const map = new Map<Character, number>()
		
		let startIndex = curr.lowerBound(search)
		if (curr.keys[startIndex - 1] === search){
			startIndex--
		}

		const endIndex = end.upperBound(search)
		
		if (curr === end){
			this.addValuesToMap(map, curr, search, startIndex, endIndex)
			return map
		}

		this.addValuesToMap(map, curr, search, startIndex)
		
		curr = curr.nextNode
		while (curr !== end){
			this.addValuesToMap(map, curr!, search)
			curr = curr!.nextNode
		}
		
		this.addValuesToMap(map, curr!, search, 0, endIndex)
		return map
	}

  private lowerBound(key: string): Node {
    let curr = this.root;
    while (!curr.leaf) {
      const index = curr.lowerBound(key);
      curr = curr.child[index];
    }
    return curr;
  }

  private upperBound(key: string): Node {
    let curr = this.root;
    while (!curr.leaf) {
      const index = curr.upperBound(key);
      curr = curr.child[index];
    }
    return curr;
  }

  private searchNode(key: string): Node {
    let curr = this.root;
    while (!curr.leaf) {
      const index = curr.index(key);
      curr = curr.child[index];
    }
    return curr;
  }

  toString(): string {
    return this._toString(this.root);
  }

  private _toString(node: Node, indent = ""): string {
    let s = indent + "- " + node.toString() + "\n";
    for (const n of node.child) {
      s += this._toString(n, indent + "\t");
    }
    return s;
  }

  private _toArray(): Array<Node> {
    const arr = new Array<Node>();
    let curr = this.root;
    while (!curr.leaf) {
      curr = curr.child[0];
    }

    arr.push(curr);
    while (curr.nextNode) {
      curr = curr.nextNode;
      arr.push(curr);
    }
    return arr;
  }

  toArray(): Array<string> {
    const arr = new Array<string>();
    let curr = this.root;
    while (!curr.leaf) {
      curr = curr.child[0];
    }

    arr.push(...curr.keys);
    while (curr.nextNode) {
      curr = curr.nextNode;
      arr.push(...curr.keys);
    }
    return arr;
  }
}


export class Node {
  leaf: boolean;
  keys: Array<string>;
  child: Array<Node>;
  nextNode?: Node;
  parent?: Node;

  constructor(leaf = true) {
    this.leaf = leaf
    this.keys = []
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
  index(key: string): number {
    for (const [i, k] of enumerate(this.keys)) {
      if (key < k) {
        return i
      }
    }
    return this.keys.length;
  }

  lowerBound(key: string): number {
    for (const [i, k] of enumerate(this.keys)) {
      if (key < k) {
        return i;
      }
    }
    return this.keys.length;
  }

  upperBound(key: string): number {
    for (const [i, k] of enumerate(this.keys)) {
      if (!(key > k || k.startsWith(key))) {
        return i;
      }
    }
    return this.keys.length;
  }

  toString(): string {
    return `[${this.keys.join(", ")}]`;
  }
}
