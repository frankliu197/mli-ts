import chai, { assert, expect } from 'chai'
import ChaiSorted from 'chai-sorted'
import {BPlusTree, Node} from "@/Recommender/BPlusTree"
chai.use(ChaiSorted)


export class StubNode {
	keys: Array<number>
	child?: Array<StubNode>
	_nextNode?: StubNode
}

export class StubTree {
	keys: Array<number>
	child?: Array<StubNode>
	_nextNode?: StubNode
}

export function createStubTree(stubNode: StubNode) : StubTree {
	//fills in all the nodes
	if (!stubNode.child){
		return stubNode
	}
	
	const queue = new Array<{node: StubNode, depth: number}>()
	let prev = {node: stubNode, depth: 1}

	for (const i of stubNode.child){
		queue.push({node: i, depth: 2})
	}
	
	while (queue.length > 0){
		const curr = queue.shift()!
		if (curr.depth === prev.depth){
			prev.node._nextNode = curr.node
		}
		prev = curr
	}
	return stubNode
}


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function assertTree(actualTree: BPlusTree, stubNode: StubTree) {
	//assert root node
	assert.isUndefined(actualTree.root.parent, "root.parent")
	assert.isUndefined(actualTree.root.nextNode, "root.nextNode")
	assert.deepEqual(actualTree.root.keys, stubNode.keys, "root.keys")
	assert.deepEqual(actualTree.root.values, stubNode.keys, "root.values")
	
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
	assert.deepEqual(actualNode.values, stubNode.keys, "child.values")

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