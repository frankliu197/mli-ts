import { KeywordTree } from "./KeywordTree"
import Character from "./Character"
import SymbolSets from "./SymbolSets"
import { combinePriority } from "./Priority"

export class KeywordRecommender {
  tree: KeywordTree;
  constructor() {
    this.tree = new KeywordTree();
  }
  add(set: SymbolSets): void {
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
    //let start = new Date().getTime();

    //const end = new Date().getTime();
    //const time = end - start;
    //console.log(start)
    //console.log('Execution time (ms): ' + time);
    //todo sort
    return map;
  }
}
