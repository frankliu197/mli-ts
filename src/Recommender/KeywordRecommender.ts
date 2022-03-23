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
  suggest(search: string): Map<Character, number> {
    const keywords = search.toLowerCase().split(" ").filter(Boolean);
    //add only matching elements in prev map and character set from this search time to nextMap
    //this way next map matches all search terms
    let map = this.tree.getCharacterSet(keywords[0]);
    let nextMap = new Map<Character, number>();
    for (const keyword of keywords) {
      for (const [c, p] of this.tree.getCharacterSet(keyword).entries()) {
        if (map.has(c)) {
          nextMap.set(c, combinePriority(p, map.get(c)!));
        }
      }
      map = nextMap;
      nextMap = new Map<Character, number>();
    }
    return map;
  }
  searchable(search: string): boolean {
    return true
  }

}
