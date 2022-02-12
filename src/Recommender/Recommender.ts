import SymbolSet from './SymbolSet';
import Character from './Character';
import { KeywordRecommender } from './KeywordRecommender';
import { SymbolRecommender } from './SymbolRecommender';


let keywordRecommender = new KeywordRecommender()
keywordRecommender.addSymbolSet(SymbolSet["BasicLatin"])

//let symbolRecommender = new SymbolRecommender()
//symbolRecommender.addSymbolSet(SymbolSet["BasicLatin"])

export function suggest(search : string) : Array<Character> { //: Character[] cast into character
  search = search.trim().toUpperCase()
  if (!search){
    return []
  }
  const map = symbolRecommender.suggest(search)
  
  //boost
  for (const [c, n] of map){
    map.set(c, n * c.boost)
  }

  //const map = keywordRecommender.suggest(search.split(" "))
  return Array.from(map.keys()).sort((first, second) => {
    return map.get(second)! - map.get(first)!
  })
}

export function boost(character: Character): void {

}
