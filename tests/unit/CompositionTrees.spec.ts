import { CompositionTree } from "@/Recommender/CompositionTree";
import { KeywordTree, Node } from "@/Recommender/KeywordTree";
//import Character from "@/Recommender/Character";
import Character from "@/entities/Character";
import BL from "@/symbols/json/BasicLatin.json";
import chai, { assert, expect } from "chai";
import ChaiSorted from "chai-sorted";

chai.use(ChaiSorted);   

//grouping for our tests
describe("Inserting tree entries testing for composition", () => {
    let tree = null as any; 
    let character = null as any; 
    before(() => {
      character = new Character({  
        "unicode": 33,
        "name": "exclamation mark",
        "symbol": "!", 
        "keywords": [],
        "composition": "|.",
        "boost": 1
      });
      tree = new CompositionTree(); // made in before , compositionTree object
    }); 
 

    it("Check if the node tree is empty", () => { 
      tree.insert(character);
      assert.isNotEmpty(tree.root.child); // result once child is got after insertion. covers insert and insert recursive. Once a char is inserted shouldnt be empty, testing insert method
      
    });

    it("Check if the node tree is not empty", () => {
      tree = new CompositionTree(); // create the tree object.
      assert.isOk(tree); // checking if the tree is ok
    });
  
   // Testing constructor 
    it("Check if there's no symbol/character inserted in the tree", () => {
      assert.isEmpty(tree.root.child); // expecting the comptree root to be empty, no symbols
    });
    it("Check if there's no values other than first one inserted in the tree", () => { //(AtMost)Asserts valueToCheck is less than or equal to (<=) valueToBeAtMost.
      assert.isAtMost(tree.values.size, 1, 'There\'s values in tree.values map.'); // checking the size of value is 1, always empty but we have a empty string in beg initialized so pass
    });
    it("Check if there's no nodes other than first one inserted in the tree", () => {
      assert.isAtMost(tree.nodes.size, 1, 'There\'s nodes in tree.nodes map.'); // checking the size of node is 1, always empty but we have a empty string in beg initialized so pass
    });
  // Testing symbol insertion 
    it("Check if the exclamation mark(!) is inserted", () => {
      tree.insert(character); 
       //console.log('tree is: ', tree); // TODO remove this line
      assert.isAbove(tree.root.child.length, 0); // check there's no root inserted
    });
    it("Check if the exclamation mark(!) values", () => {
      assert.isAbove(tree.values.size, 1, 'There\'s values in tree.values map.'); // check if there's values, checking if theres more than 1 value, if so theres more values
    });
    it("Check if the exclamation mark(!) nodes", () => {
      assert.isAbove(tree.nodes.size, 1, 'There\'s nodes in tree.nodes map.'); // check if there's nodes, checking if theres more than 1 node, if so theres more node
    });
   



})