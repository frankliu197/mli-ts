import { CompositionTree } from "./CompositionTree";
import Character from "../entities/Character";
import CharacterSets from "../entities/CharacterSets";

export class CompositionRecommender {
  tree: CompositionTree;
  constructor() {
    this.tree = new CompositionTree();
  }
  add(set: CharacterSets): void {
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

