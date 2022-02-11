import { createStubTree, assertTree } from "./BTreeStub";
import {BPlusTree, Node} from "@/Recommender/BPlusTreeCharacter"
import SymbolSets from "@/Recommender/SymbolSet"

function insertCharactersToTree(characters: Array<Character>, tree: BPlusTree){
	for (const c of characters){
		for (const k of c.name.split(" ")){
			tree.insert(k, c)
		}
	}
}

describe('BPlusTree', () => {

  it('works as empty tree', () => {
		const tree = new BPlusTree();

		const stubTree = createStubTree({
			keys: []
		}, [])

		assertTree(tree, stubTree)
	})

	it('works with only root node', ()=> {
		const tree = new BPlusTree();

		const characters = SymbolSets["BasicLatin"].slice(0, 2)
		insertCharactersToTree(characters, tree)
		
		const stubTree = createStubTree({
			keys: ["EXCLAMATION", "MARK", "QUOTATION"]
		}, characters)

		assertTree(tree, stubTree)
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
		}, characters)

		assertTree(tree, stubTree)
	})
	
	it('works with root merge', ()=> {
	const tree = new BPlusTree();
	
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
		}, characters)
		assertTree(tree, stubTree)
	})

	
	it("works with root split with children", () => {
		const characters = SymbolSets["BasicLatin"].slice(0, 10)
		
		/*
		- [NUMBER]
	- [ASTERISK, EXCLAMATION]
		- [AMPERSAND, APOSTROPHE]
		- [ASTERISK, DOLLAR]
		- [EXCLAMATION, LEFT, MARK]
	- [QUOTATION]
		- [NUMBER, PARENTHESIS, PERCENT]
		- [QUOTATION, RIGHT, SIGN]*/

	})
})


