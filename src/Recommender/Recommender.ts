import CharacterSets from "../entities/CharacterSets";
import Character from "../entities/Character";
import { KeywordRecommender } from "./KeywordRecommender";
import { CompositionRecommender } from "./CompositionRecommender";
import { combinePriority } from "./Priority";
import * as Storage from "./Storage";
import { stringSort } from "@/helpers/helpers";
import BasicLatin from "../symbols/json/BasicLatin.json";
import LatinExtended from "../symbols/json/LatinExtended.json";
import Greek from "../symbols/json/Greek.json";
import MathOperators from "../symbols/json/MathOperators.json";
import MiscTechnical from "../symbols/json/MiscTechnical.json";
import NumberForms from "../symbols/json/NumberForms.json";
import SmallFormVariants from "../symbols/json/SmallFormVariants.json";
import SuperscriptsAndSubscripts from "../symbols/json/SuperscriptsAndSubscripts.json";
import OtherSymbols from "../symbols/json/OtherSymbols.json"
const characterSet = new CharacterSets();
//symbolSet.add(OtherSymbols)
characterSet.add(BasicLatin);
characterSet.add(Greek);
characterSet.add(MathOperators);

let keywordRecommender = new KeywordRecommender();
keywordRecommender.add(characterSet);
let compositionRecommender = new CompositionRecommender();
compositionRecommender.add(characterSet);
/**
 * Search with keywords
 * Search with strokes (if no spaces)
 * Search exact char (if search.length === 1)
 * @param search
 * @returns
 */
export function suggest(search: string): Array<Character> {
  //: Character[] cast into character
  search = search.trim();
  if (!search) {
    return [];
  }
  const keywords = search.toLowerCase().split(" ").filter(Boolean);
  const map = keywordRecommender.suggest(keywords);
  if (keywords.length === 1) {
    const symbolMap = compositionRecommender.suggest(stringSort(search));
    //merge maps
    for (const [c, p] of symbolMap.entries()) {
      if (map.has(c)) {
        map.set(c, combinePriority(p, map.get(c)!));
      } else {
        map.set(c, p);
      }
    }
  }

  if (search.length === 1 && characterSet.getCharacter(search)!) {
    map.set(characterSet.getCharacter(search)!, Number.MAX_VALUE);
  }

  for (const [c, n] of map) {
    map.set(c, n * c.boost);
  }

  return Array.from(map.keys()).sort((first, second) => {
    return map.get(second)! - map.get(first)!;
  });
}

export function boost(character: Character): void {
  Storage.boost(character);
}
