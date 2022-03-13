import { assert, expect } from "chai";
import { KeywordTree, Node } from "@/Recommender/KeywordTree";
import Character from "@/entities/Character";

export class MockNode {
  keys: Array<string>;
  child?: Array<MockNode>;
  _nextNode?: MockNode;
}

/**
 * Takes in a tree of stub nodes with keys, and child params filled out. This function then connects the _nextNode? values of the StubNode
 * to be used as validation in assertTree
 * @param mockNode 
 * @returns 
 */
export function createMockTree(mockNode: MockNode) : MockNode {
  const queue = new Array<{ node: MockNode; depth: number }>();
  let prev = { node: mockNode, depth: 1 };

  if (!mockNode.child) {
    return mockNode;
  }

  for (const i of mockNode.child) {
    queue.push({ node: i, depth: 2 });
  }

  while (queue.length > 0) {
    const curr = queue.shift()!;

    if (curr.depth === prev.depth) {
      prev.node._nextNode = curr.node;
    }

    if (curr.node.child) {
      for (const i of curr.node.child) {
        queue.push({ node: i, depth: curr.depth + 1 });
      }
    }

    prev = curr;
  }
  return mockNode;
}

export function assertTree(actualTree: KeywordTree, mockNode: MockNode, characters: Array<Character>): void {
  //assert root node
  assert.isUndefined(actualTree.root.parent, "root.parent");
  assert.isUndefined(actualTree.root.nextNode, "root.nextNode");
  assert.deepEqual(actualTree.root.keys, mockNode.keys, "root.keys");

  //@ts-expect-error: ts not reading sorted
  expect(actualTree.toArray()).to.be.sorted();

  if (mockNode.child) {
    assert.lengthOf(actualTree.root.child, mockNode.child.length, "root.child");
    assert.isFalse(actualTree.root.leaf, "root.leaf");

    for (const i in mockNode.child) {
      assert.equal(actualTree.root.child[i].parent, actualTree.root);
      assertNode(actualTree.root.child[i], mockNode.child[i]);
    }
  } else {
    assert.isTrue(actualTree.root.leaf, "root.leaf");
    assert.isEmpty(actualTree.root.child);
  }

  for (const c of characters) {
    for (const k of c.name.split(" ")) {
      assert.isDefined(actualTree.values.get(k));
      assert.isTrue(actualTree.values.get(k)!.has(c));
    }
  }
}

function assertNode(actualNode: Node, mockNode: MockNode) {
  if (mockNode._nextNode) {
    assert.isDefined(actualNode.nextNode);
    assert.deepEqual(
      actualNode.nextNode!.keys,
      mockNode._nextNode.keys,
      "Assert deep equal keys of next node. Either next node reference is wrong or the keys are wrong on the next node"
    );
  } else {
    assert.isUndefined(actualNode.nextNode, "nextNode should not exist");
  }

  assert.deepEqual(actualNode.keys, mockNode.keys, "child.keys");
 
  if (mockNode.child) {
    assert.lengthOf(actualNode.child, mockNode.child.length, "child.child");
    assert.isFalse(actualNode.leaf, "child.leaf");
    for (const i in mockNode.child) {
      assert.equal(
        actualNode.child[i].parent,
        actualNode,
        "Parent Node of " + actualNode.child[i].toString()
      );
      assertNode(actualNode.child[i], mockNode.child[i]);
    }
  } else {
    assert.isTrue(actualNode.leaf, "child.leaf");
    assert.isEmpty(actualNode.child, "no child");
  }
}
