import Character from "./Character";
import { setBoosts } from "./Storage";
export default class SymbolSets {
  symbols: Array<Character>;
  map: Map<string, Character>;

  constructor() {
    this.symbols = [];
    this.map = new Map();
  }

  add(s: any): void {
    const set = s as unknown as Array<Character>;
    for (const c of set) {
      setBoosts(c);
      this.map.set(c.symbol, c);
    }

    this.symbols.push(...set);
  }

  get(): Array<Character> {
    return this.symbols;
  }

  getCharacter(symbol: string): Character | undefined {
    return this.map.get(symbol);
  }
}
