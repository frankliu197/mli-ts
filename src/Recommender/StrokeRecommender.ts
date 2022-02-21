import { StrokeTree } from "./StrokeTree";
import Character from "./Character";
import SymbolSets from "./SymbolSet";

export class StrokeRecommender {
  tree: StrokeTree;
  constructor() {
    this.tree = new StrokeTree();
  }
  add(set: SymbolSets): void {
    for (const c of set.symbols) {
      this.tree.insert(c);
    }
  }

  suggest(search: string): Map<Character, number> {
    return this.tree.getCharacterSet(search);
  }
}

