import BasicLatin from "../symbols/BasicLatin.json" 
import * as Collections from 'typescript-collections';
import Character from './Character';
export default function(search : string) : Set<Character> { //: Character[] cast into character
    //search word corospondence only if length > 3
    const suggestions = new Set<Character>();
    if (search.length > 3) {
        const terms = search.toLocaleUpperCase().split("_")
        for (const i of BasicLatin){
            if (terms.every(term => i.name.includes(term))){
                suggestions.add(i as unknown as Character)
            }
        }
    } else {
        return suggestions
    }
    return suggestions
}