import SymbolSet from './SymbolSet';


import Character from './Character';
import { KeywordRecommender } from './KeywordRecommender';
import { SymbolRecommender } from './SymbolRecommender';
import { combinePriority } from './Priority';
import * as Storage from "./Storage"
import { stringSort } from "@/helpers/helpers"



let keywordRecommender = new KeywordRecommender()
keywordRecommender.addSymbolSet(SymbolSet.get("BasicLatin")!)
let symbolRecommender = new SymbolRecommender()
symbolRecommender.addSymbolSet(SymbolSet.get("BasicLatin")!)

/**
 * Search with keywords
 * Search with strokes (if no spaces)
 * Search exact char (if search.length === 1)
 * @param search 
 * @returns 
 */
export function suggest(search : string) : Array<Character> { //: Character[] cast into character
  search = search.trim()
  if (!search){
    return []
  }
  const keywords = search.toLowerCase().split(" ").filter(Boolean)
  const map = keywordRecommender.suggest(keywords)
  if (keywords.length === 1){
    const symbolMap = symbolRecommender.suggest(stringSort(search))
    //merge maps
    for (const [c, p] of symbolMap.entries()){
      if (map.has(c)){
        map.set(c, combinePriority(p, map.get(c)!)) 
      } else {
        map.set(c, p)
      }
    }
  }

  if (search.length === 1 && SymbolSet.getCharacter(search)!){
    map.set(SymbolSet.getCharacter(search)!, Number.MAX_VALUE) 
  }
  
  //boost
  for (const [c, n] of map){
    map.set(c, n * c.boost)
  }

  return Array.from(map.keys()).sort((first, second) => {
    return map.get(second)! - map.get(first)!
  })
}

export function boost(character: Character): void {
  Storage.boost(character)
}
