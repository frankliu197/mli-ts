import { isUndefined } from "typescript-collections/dist/lib/util";
import { stripLetter } from "@/helpers/helpers";
import Character from "./Character";
import { stringMatchPriority } from "./Priority";
import { Queue } from "typescript-collections";

export class CompositionTree {
  root: Node;
  values: Map<string, Set<Character>>;
  nodes: Map<string, Node>;

  constructor() {
    this.root = new Node("");
    this.values = new Map<string, Set<Character>>();
    this.nodes = new Map<string, Node>();
    this.nodes.set("", this.root);
    this.values.set("", new Set());
  }

  insert(c: Character): void {
    if (this.nodes.has(c.composition)) {
      const set = this.values.get(c.composition)!;
      set.add(c);
      return;
    }

    let currNode = new Node(c.composition);
    this.nodes.set(c.composition, currNode);

    const set = new Set<Character>();
    set.add(c);
    this.values.set(c.composition, set);

    for (const s of stripLetter(c.composition)) {
      this.insertRecursive(currNode, s);
    }
  }

  insertRecursive(childNode: Node, composition: string): void {
    if (this.nodes.has(composition)) { 
      this.nodes.get(composition)!.child.push(childNode); 
      return;
    }

    const currNode = new Node(composition);
    this.nodes.set(composition, currNode);
    this.values.set(composition, new Set());
    currNode.child.push(childNode);

    for (const s of stripLetter(composition)) {
      this.insertRecursive(currNode, s);
    }
  }

  getCharacterSet(search: string): Map<Character, number> {
    const map = new Map<Character, number>();
    const node = this.nodes.get(search);
    if (!node) {
      return map;
    }

    const queue = new Queue<Node>();
    const visited = new Set<Node>();
    queue.enqueue(node);
    visited.add(node);

    while (queue.size() > 0) {
      const curr = queue.dequeue()!;
      const p = stringMatchPriority(search, curr.composition);

      for (const c of this.values.get(curr.composition)!) {
        //only set the first time, because that time is the closest to the node that has been search
        if (!map.has(c)) {
          map.set(c, p);
        }
      }

      for (const n of curr.child) {
        if (!visited.has(n)) {
          visited.add(n);
          queue.enqueue(n);
        }
      }
    }
    return map;
  }
}

export class Node {
  composition: string;
  child: Array<Node>;

  constructor(stroke: string) {
    this.composition = stroke;
    this.child = new Array<Node>();
  }

  toString(): string {
    return this.composition;
  }
}
