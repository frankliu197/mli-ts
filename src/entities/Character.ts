/**
 * @author Cameron
 */

export default class {
  public unicode: number;
  public symbol: string;
  public name: string;
  public keywords: Array<string>;
  public composition: string;
  public boost: number;

  public hashcode(): number {
    return this.unicode;
  }

  public toString(): string {
    return this.symbol;
  }
  constructor(untyped?: any) {
    if (untyped) {
        this.unicode = untyped.unicode;
        this.symbol = untyped.symbol;
        this.name = untyped.name;
        this.keywords = untyped.keywords;
        this.composition = untyped.composition;
        this.boost = untyped.boost;
    }
}
}
