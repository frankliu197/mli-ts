import chai, { assert, expect } from 'chai'
import ChaiSorted from 'chai-sorted'
import {BPlusTree, Node} from "@/Recommender/BPlusTree"
import Character from "@/Recommender/Character"
chai.use(ChaiSorted)


export class StubNode {
	keys: Array<string>
	child?: Array<StubNode>
	_nextNode?: StubNode
	_values?: Array<Set<Character>>
}

export class StubTree {
	keys: Array<string>
	child?: Array<StubTree>
	_nextNode: StubNode
	_values: Array<Set<Character>>
}

export function createStubTree(stubNode: StubNode, characters: Array<Character>): StubTree {
  //fills in all the nextNodes
  addValuesToStubNode(stubNode, characters);

  const queue = new Array<{ node: StubNode; depth: number }>();
  let prev = { node: stubNode, depth: 1 };

  if (!stubNode.child) {
    return stubNode as StubTree;
  }

  for (const i of stubNode.child) {
    queue.push({ node: i, depth: 2 });
  }

  while (queue.length > 0) {
    const curr = queue.shift()!;
    addValuesToStubNode(curr.node, characters);

    if (curr.depth === prev.depth) {
      prev.node._nextNode = curr.node;
    }
    
		if (curr.node.child){
			for (const i of curr.node.child) {
				queue.push({ node: i, depth: curr.depth + 1 });
			}
		}
		

		prev = curr;
  }
  return stubNode as StubTree;
}

function addValuesToStubNode(stubNode: StubNode, characters: Array<Character>): void {
  stubNode._values = [];
  for (const i in stubNode.keys) {
    stubNode._values.push(new Set<Character>());
  }
  for (const c of characters) {
    for (const k of c.name.split(" ")) {
      const indexOf = stubNode.keys.indexOf(k);
      if (indexOf >= 0) {
        stubNode._values[indexOf].add(c);
      }
    }
  }
}

export function assertTree(actualTree: BPlusTree, stubNode: StubTree) : void {
  //assert root node
  assert.isUndefined(actualTree.root.parent, "root.parent");
  assert.isUndefined(actualTree.root.nextNode, "root.nextNode");
  assert.deepEqual(actualTree.root.keys, stubNode.keys, "root.keys");
  assert.deepEqual(actualTree.root.values, stubNode._values, "root.values");

  //@ts-expect-error: ts not reading sorted
  expect(actualTree.toArray()).to.be.sorted();

  if (stubNode.child) {
    assert.lengthOf(actualTree.root.child, stubNode.child.length, "root.child");
    assert.isFalse(actualTree.root.leaf, "root.leaf");

    for (const i in stubNode.child) {
      assert.equal(actualTree.root.child[i].parent, actualTree.root);
      assertNode(actualTree.root.child[i], stubNode.child[i]);
    }
  } else {
    assert.isTrue(actualTree.root.leaf, "root.leaf");
    assert.isEmpty(actualTree.root.child);
  }
}

function assertNode(actualNode: Node, stubNode: StubNode) {
  if (stubNode._nextNode) {
		
    assert.isDefined(actualNode.nextNode);
    //@ts-expect-error: fails to see assertion
    assert.deepEqual(actualNode.nextNode.keys, stubNode._nextNode.keys, "Assert deep equal keys of next node. Either next node reference is wrong or the keys are wrong on the next node");
  } else {
    assert.isUndefined(actualNode.nextNode, "nextNode should not exist");
  }

  assert.deepEqual(actualNode.keys, stubNode.keys, "child.keys");
  assert.deepEqual(actualNode.values, stubNode._values, "child.values");

  if (stubNode.child) {
    assert.lengthOf(actualNode.child, stubNode.child.length, "child.child");
    assert.isFalse(actualNode.leaf, "child.leaf");
    for (const i in stubNode.child) {
      assert.equal(actualNode.child[i].parent, actualNode, "Parent Node of " + actualNode.child[i].toString())
      assertNode(actualNode.child[i], stubNode.child[i]);
    }
  } else {
    assert.isTrue(actualNode.leaf, "child.leaf");
    assert.isEmpty(actualNode.child, "no child");
  }
}