import { createStubTree, assertTree } from "./BTreeStub";
import {BPlusTree, Node} from "@/Recommender/BPlusTree"


describe('BPlusTree', () => {

	const tree = new BPlusTree();

	

  it('works as empty tree', () => {
		const stubTree = createStubTree({
			keys: []
		})

		assertTree(tree, stubTree)
	})

	it('works with only root node', ()=> {
		tree.insert(1, 1)
		tree.insert(2, 2)
		tree.insert(3, 3)
		
		const stubTree = createStubTree({
			keys: [1, 2, 3]
		})

		assertTree(tree, stubTree)
	})

	
	it('works with root split', ()=> {
		tree.insert(4, 4)
		tree.insert(5, 5)
		
		const stubTree = createStubTree({
			keys: [3],
			child: [
				{
					keys: [1, 2]
				},
				{
					keys: [3, 4, 5]
				}
			]
		})
		assertTree(tree, stubTree)
	})

	it('works with root split without children', ()=> {
		tree.insert(6, 6)
		tree.insert(7, 7)
		
		console.log(tree.toString())
		
		const stubTree = createStubTree({
				keys: [3, 5],
				child: [
					{
						keys: [1, 2]
					},
					{
						keys: [3, 4]
					},
					{
						keys: [5, 6, 7]
					}
				]
			})
			
		assertTree(tree, stubTree)
	})

	/*
	it("works with root merge", () => {
		tree.insert(6, 6)
		tree.insert(7, 7)
		
		assert.lengthOf(root.child, 3)

		const child = []
		for (const [i, n] of enumerate(root.child)){
			child[i] = n
		}

		assert.deepEqual(root.keys, [3, 5])
		assert.deepEqual(child[0].keys, [1, 2])
		assert.deepEqual(child[1].keys, [3, 4])
		assert.deepEqual(child[2].keys, [5, 6, 7])


		assert.isUndefined(root.parent, "root.parent should be undefined")
		assert.isUndefined(root.nextNode, "root.nextNode should be undefind")
		assert.equal(child[0].nextNode, child[1])
		assert.isUndefined(child[1].nextNode, "child.nextNode should be undefind")
	
		assert.isFalse(root.leaf, "root.leaf should be false")
		assert.isTrue(child[0].leaf)
		assert.isTrue(child[1].leaf)

		assert.deepEqual(child[0].keys, child[0].values)
		assert.deepEqual(child[1].keys, child[1].values)

		assert.deepEqual(tree.toArray(), [1, 2, 3, 4, 5], "tree.toArray() should be equal to [1, 2, 3]")
	})*/
})


