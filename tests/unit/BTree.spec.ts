import { createStubTree, assertTree } from "./BTreeStub";
import {BPlusTree, Node} from "@/Recommender/BPlusTree"
import Character from "@/Recommender/Character";
import SymbolSets from "@/Recommender/SymbolSet"
import chai, { assert, expect } from 'chai'
import ChaiSorted from 'chai-sorted'
chai.use(ChaiSorted)


function insertCharactersToTree(characters: Array<Character>, tree: BPlusTree){
	for (const c of characters){
		for (const k of c.name.split(" ")){
			tree.insert(k, c)
		}
	}
}

describe('BPlusTree', () => {
	const latinTree = new BPlusTree()
	
	before(()=>{
		const characters = SymbolSets["BasicLatin"]
		insertCharactersToTree(characters, latinTree)
	})

  it('works as empty tree', () => {
		const tree = new BPlusTree();

		const stubTree = createStubTree({
			keys: []
		})

		assertTree(tree, stubTree, [])
	})

	it('works with only root node', ()=> {
		const tree = new BPlusTree();

		const characters = SymbolSets["BasicLatin"].slice(0, 2)
		insertCharactersToTree(characters, tree)
		
		const stubTree = createStubTree({
			keys: ["EXCLAMATION", "MARK", "QUOTATION"]
		})

		assertTree(tree, stubTree, characters)
	})

	
	it('works with root split', ()=> {
		const tree = new BPlusTree();

		const characters = SymbolSets["BasicLatin"].slice(0, 4)
		insertCharactersToTree(characters, tree)
		
		const stubTree = createStubTree({
			keys: ["NUMBER"],
			child: [{
				keys: ["DOLLAR", "EXCLAMATION", "MARK"]
			}, {
				keys: ["NUMBER", "QUOTATION", "SIGN"]
			}]
		})

		assertTree(tree, stubTree, characters)
	})
	
	it('works with root merge', ()=> {
		const tree = new BPlusTree()
	
		const characters = SymbolSets["BasicLatin"].slice(0, 5)
		insertCharactersToTree(characters, tree)
		
		const stubTree = createStubTree({
			keys: ["NUMBER", "QUOTATION"],
			child: [{
				keys: ["DOLLAR", "EXCLAMATION", "MARK"]
			}, {
				keys: ["NUMBER", "PERCENT"]
			}, {
				keys: ["QUOTATION", "SIGN"]
			}]
		})
		assertTree(tree, stubTree, characters)
	})

	
	it("works with max children", () => {
		const tree = new BPlusTree()
		const characters = SymbolSets["BasicLatin"].slice(0, 9)
		insertCharactersToTree(characters, tree)
		const stubTree = createStubTree(
			{
				keys: ["EXCLAMATION", "NUMBER", "QUOTATION"],
				child: [
					{ keys: ["AMPERSAND", "APOSTROPHE", "DOLLAR"] },
					{ keys: ["EXCLAMATION", "LEFT", "MARK"] },
					{ keys: ["NUMBER", "PARENTHESIS", "PERCENT"] },
					{ keys: ["QUOTATION", "RIGHT", "SIGN"] }
				]
			})	
		assertTree(tree, stubTree, characters)
	})

	it("works with searches", ()=> {
		assert.deepEqual(latinTree.getKeywordSet("A"), ['A', 'ACCENT', 'AMPERSAND', 'APOSTROPHE', 'ASTERISK', 'AT'])

		//collection spanning accross middle of nodes
		assert.deepEqual(latinTree.getKeywordSet("D"), ['D', 'DIGIT', 'DOLLAR'])

		//search of letters
		assert.deepEqual(latinTree.getKeywordSet('CO'), ['COLON', 'COMMA', 'COMMERCIAL'])
		
		assert.deepEqual(latinTree.getKeywordSet('REVERSE'), ['REVERSE'])

		assert.deepEqual(latinTree.getKeywordSet('ABCDS'), [])
	})
	/*it("works with root split with max children", ()=>{
		const tree = new BPlusTree()
		const characters = SymbolSets["BasicLatin"].slice(0, 9)
		insertCharactersToTree(characters, tree)
		//add it later
		assertTree(tree, stubTree)
		
	})*/
	
})