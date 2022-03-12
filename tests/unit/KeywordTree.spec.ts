import { createStubTree, assertTree } from "./KeywordTreeStub";
import { KeywordTree, Node } from "@/Recommender/KeywordTree";
import Character from "@/entities/Character";
import BL from "@/symbols/json/BasicLatin.json";
import chai, { assert, expect } from "chai";
import ChaiSorted from "chai-sorted";
chai.use(ChaiSorted);

const BasicLatin = BL as unknown as Character[];
function insertCharactersToTree(characters: Array<Character>, tree: KeywordTree) {
  for (const c of characters) {
    tree.insert(c);
  }
}

describe("KeywordTree structure", () => {
  const latinTree = new KeywordTree();

  before(() => {
    const characters = BasicLatin;
    insertCharactersToTree(characters, latinTree);
  });

  it("works as empty tree", () => {
    const tree = new KeywordTree();

    const stubTree = createStubTree({
      keys: [],
    });

    assertTree(tree, stubTree, []);
  });

  it("works with only root node", () => {
    const tree = new KeywordTree();

    const characters = BasicLatin.slice(0, 2);
    insertCharactersToTree(characters, tree);

    const stubTree = createStubTree({
      keys: ["exclamation", "mark", "quotation"],
    });

    assertTree(tree, stubTree, characters);
  });

  it("works with root split", () => {
    const tree = new KeywordTree();

    const characters = BasicLatin.slice(0, 4);
    insertCharactersToTree(characters, tree);

    const stubTree = createStubTree({
      keys: ["number"],
      child: [
        {
          keys: ["dollar", "exclamation", "mark"],
        },
        {
          keys: ["number", "quotation", "sign"],
        },
      ],
    });

    assertTree(tree, stubTree, characters);
  });

  it("works with root merge", () => {
    const tree = new KeywordTree();

    const characters = BasicLatin.slice(0, 5);
    insertCharactersToTree(characters, tree);

    const stubTree = createStubTree({
      keys: ["number", "quotation"],
      child: [
        {
          keys: ["dollar", "exclamation", "mark"],
        },
        {
          keys: ["number", "percent"],
        },
        {
          keys: ["quotation", "sign"],
        },
      ],
    });
    assertTree(tree, stubTree, characters);
  });

  it("works with max children", () => {
    const tree = new KeywordTree();
    const characters = BasicLatin.slice(0, 9);
    insertCharactersToTree(characters, tree);
    const stubTree = createStubTree({
      keys: ["exclamation", "number", "quotation"],
      child: [
        { keys: ["ampersand", "apostrophe", "dollar"] },
        { keys: ["exclamation", "left", "mark"] },
        { keys: ["number", "parenthesis", "percent"] },
        { keys: ["quotation", "right", "sign"] },
      ],
    });
    assertTree(tree, stubTree, characters);
  });

  it("works with searches", () => {
    assert.deepEqual(latinTree.getKeywordSet("a"), [
      "a",
      "accent",
      "ampersand",
      "apostrophe",
      "asterisk",
      "at",
    ]);

    //collection spanning accross middle of nodes
    assert.deepEqual(latinTree.getKeywordSet("d"), ["d", "digit", "dollar"]);

    //search of letters
    assert.deepEqual(latinTree.getKeywordSet("co"), [
      "colon",
      "comma",
      "commercial",
    ]);

    assert.deepEqual(latinTree.getKeywordSet("reverse"), ["reverse"]);

    assert.deepEqual(latinTree.getKeywordSet("abcds"), []);

    assert.deepEqual(latinTree.getKeywordSet("!"), []);
  });

});
