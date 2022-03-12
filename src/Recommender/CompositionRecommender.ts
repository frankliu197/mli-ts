import { CompositionTree } from "./CompositionTree";
import Character from "../entities/Character";
import SymbolSets from "../entities/SymbolSets";

export class CompositionRecommender {
  tree: CompositionTree;
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
}

