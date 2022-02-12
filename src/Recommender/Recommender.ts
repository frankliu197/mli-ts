import SymbolSet from './SymbolSet';
import Character from './Character';
import { KeywordRecommender } from './KeywordRecommender';


let keywordRecommender = new KeywordRecommender();
keywordRecommender.addSymbolSet(SymbolSet["BasicLatin"])
/*
const index = lunr(function(){
    // @ts-expect-error: javascript
    this.field('name')
    // @ts-expect-error: javascript
    this.ref('unicode')
    
    BasicLatin.forEach(function(doc){
        // @ts-expect-error: javascript
        this.add(doc)
        // @ts-expect-error: javascript
    }, this)
})*/

export default function suggest(search : string) : Array<Character> { //: Character[] cast into character
  /*if (!search){
    return []
  }*/
  const map = keywordRecommender.suggest(search)
  return Array.from(map.keys())
}