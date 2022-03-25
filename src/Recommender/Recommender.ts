/**
 * @author frankliu197, Cameron
 */

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
const characterSets = new CharacterSets();

characterSets.add(BasicLatin);
characterSets.add(Greek);
characterSets.add(MathOperators);
characterSets.add(SuperscriptsAndSubscripts);
characterSets.add(NumberForms);
characterSets.add(LatinExtended);
characterSets.add(SmallFormVariants);

let keywordRecommender = new KeywordRecommender();
keywordRecommender.add(characterSets);
let compositionRecommender = new CompositionRecommender();
compositionRecommender.add(characterSets);

function mergeMaps(map1: Map<Character, number>, map2: Map<Character, number>): Map<Character, number> {
  for (const [c, p] of map2.entries()) {
    if (map1.has(c)) {
      map1.set(c, combinePriority(p, map1.get(c)!));
    } else {
      map1.set(c, p);
    }
  }
  return map1;
}
/**
 * Search with keywords
 * Search with strokes (if no spaces)
 * Search exact char (if search.length === 1)
 * @param search
 * @returns
 */
export function suggest(search: string): Array<Character> {
  search = search.trim();
  if (!search) {
    return [];
  }
  
  let map = new Map<Character, number>();
  if (keywordRecommender.searchable(search)){
    map = mergeMaps(keywordRecommender.suggest(search), map);
  }
  if (compositionRecommender.searchable(search)) {
    map = mergeMaps(map, compositionRecommender.suggest(stringSort(search)));
  }

  //search with exact char
  if (search.length === 1 && characterSets.getCharacter(search)!) {
    map.set(characterSets.getCharacter(search)!, Number.MAX_VALUE);
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
