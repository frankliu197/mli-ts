import SymbolSet from './SymbolSet';
import Character from './Character';
import { KeywordRecommender } from './KeywordRecommender';


let keywordRecommender = new KeywordRecommender();
keywordRecommender.addSymbolSet(SymbolSet["BasicLatin"])


export default function suggest(search : string) : Array<Character> { //: Character[] cast into character
  search = search.trim().toUpperCase()
  if (!search){
    return []
  }
  const map = keywordRecommender.suggest(search)
  return Array.from(map.keys()).sort((first, second) => {
    return map.get(second)! - map.get(first)!
  })
}