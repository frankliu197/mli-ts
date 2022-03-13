import { CompositionTree } from "./CompositionTree";
import Character from "./Character";
import SymbolSets from "./SymbolSets";
import { stringSort } from "@/helpers/helpers";
export class CompositionRecommender {
  tree: CompositionTree;
  symbolSet: SymbolSets;

  constructor() {
    this.tree = new CompositionTree();
  }
  add(set: SymbolSets): void {
    this.symbolSet = set;
    for (const c of set.symbols) {
      this.tree.insert(c);
    }
  }

  suggest(search: string): Map<Character, number> {
    //composition breakdown of search terms
    let s = "";
    for (const i of search){
      const c = this.symbolSet.getCharacter(i);
      if (c){
        s += c.composition;
      } else {
        s += i;
      }
    }
    s = stringSort(s);
    
    return this.tree.getCharacterSet(s);
  }
}

