import { CompositionTree } from "./CompositionTree";
import Character from "../entities/Character";
import CharacterSets from "../entities/CharacterSets";
import { stringSort } from "@/helpers/helpers";

export class CompositionRecommender {
  tree: CompositionTree;
  symbolSet: SymbolSets;

  constructor() {
    this.tree = new CompositionTree();
  }
  add(set: CharacterSets): void {
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
  searchable(search: string): boolean {
    return search.indexOf(" ") === -1
  }
}

