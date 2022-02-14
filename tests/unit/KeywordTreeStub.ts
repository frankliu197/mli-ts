import { assert, expect } from "chai";
import { KeywordTree, Node } from "@/Recommender/KeywordTree";
import Character from "@/Recommender/Character";

export class StubNode {
  keys: Array<string>;
  child?: Array<StubNode>;
  _nextNode?: StubNode;
}


export function createStubTree(stubNode: StubNode) {
  //fills in all the nextNodes

  const queue = new Array<{ node: StubNode; depth: number }>();
  let prev = { node: stubNode, depth: 1 };

  if (!stubNode.child) {
    return stubNode;
  }

  for (const i of stubNode.child) {
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
  return stubNode;
}

export function assertTree(actualTree: KeywordTree, stubNode: StubNode, characters: Array<Character>): void {
  //assert root node
  assert.isUndefined(actualTree.root.parent, "root.parent");
  assert.isUndefined(actualTree.root.nextNode, "root.nextNode");
  assert.deepEqual(actualTree.root.keys, stubNode.keys, "root.keys");

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

  for (const c of characters) {
    for (const k of c.name.split(" ")) {
      assert.isDefined(actualTree.values.get(k));
      assert.isTrue(actualTree.values.get(k)!.has(c));
    }
  }
}

function assertNode(actualNode: Node, stubNode: StubNode) {
  if (stubNode._nextNode) {
    assert.isDefined(actualNode.nextNode);
    assert.deepEqual(
      actualNode.nextNode!.keys,
      stubNode._nextNode.keys,
      "Assert deep equal keys of next node. Either next node reference is wrong or the keys are wrong on the next node"
    );
  } else {
    assert.isUndefined(actualNode.nextNode, "nextNode should not exist");
  }

  assert.deepEqual(actualNode.keys, stubNode.keys, "child.keys");
  //assert.deepEqual(actualNode.values, stubNode._values, "child.values");

  if (stubNode.child) {
    assert.lengthOf(actualNode.child, stubNode.child.length, "child.child");
    assert.isFalse(actualNode.leaf, "child.leaf");
    for (const i in stubNode.child) {
      assert.equal(
        actualNode.child[i].parent,
        actualNode,
        "Parent Node of " + actualNode.child[i].toString()
      );
      assertNode(actualNode.child[i], stubNode.child[i]);
    }
  } else {
    assert.isTrue(actualNode.leaf, "child.leaf");
    assert.isEmpty(actualNode.child, "no child");
  }
}
