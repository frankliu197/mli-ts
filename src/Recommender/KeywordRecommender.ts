import { KeywordTree } from "./KeywordTree"
import Character from "../entities/Character"
import CharacterSets from "../entities/CharacterSets"
import { combinePriority } from "./Priority"

export class KeywordRecommender {
  tree: KeywordTree;
  constructor() {
    this.tree = new KeywordTree();
  }
  add(set: CharacterSets): void {
    for (const c of set.symbols) {
      this.tree.insert(c)
    }
    this.tree.updatePriorities();
  }
  suggest(search: Array<string>): Map<Character, number> {
    //add only matching elements in prev map and character set from this search time to nextMap
    //this way next map matches all search terms
    let map = this.tree.getCharacterSet(search[0]);
    let nextMap = new Map<Character, number>();
    for (let i = 0; i < search.length; i++) {
      for (const [c, p] of this.tree.getCharacterSet(search[i]).entries()) {
        if (map.has(c)) {
          nextMap.set(c, combinePriority(p, map.get(c)!));
        }
      }
      map = nextMap;
      nextMap = new Map<Character, number>();
    }
    return map;
  }
}
