import SymbolSet from './SymbolSet';


import Character from './Character';
import { KeywordRecommender } from './KeywordRecommender';
import { SymbolRecommender } from './SymbolRecommender';
import { combinePriority } from './Priority';
import * as Storage from "./Storage"
import { stringSort } from "@/helpers/helpers"



let keywordRecommender = new KeywordRecommender()
keywordRecommender.addSymbolSet(SymbolSet["BasicLatin"])

let symbolRecommender = new SymbolRecommender()
symbolRecommender.addSymbolSet(SymbolSet["BasicLatin"])

export function suggest(search : string) : Array<Character> { //: Character[] cast into character
  search = search.trim()
  if (!search){
    return []
  }
  const keywords = search.toLowerCase().split(" ")
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
