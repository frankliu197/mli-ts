import { CompositionTree } from "./CompositionTree";
import Character from "./Character";
import SymbolSets from "./SymbolSets";

export class CompositionRecommender {
  tree: CompositionTree; 
  //symbolSet: SymbolSets; 

  constructor() {
    this.tree = new CompositionTree();
  }
  add(set: SymbolSets): void {
    for (const c of set.symbols) {
      this.tree.insert(c);
    }
  }
  suggest(search: string): Map<Character, number> {
    return this.tree.getCharacterSet(search);
  }
  searchable(search: string): boolean {
    return search.indexOf(" ") === -1
  }
}
/*
  suggest(search: string): Map<Character, number> {
    return this.tree.getCharacterSet(search);
  }
}
*/