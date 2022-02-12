
export default class {
    public unicode: number
    public symbol: string
    public name: string;
    public keywords: Array<string>
    public strokes: string
    public boost: number

    public hashcode() : number {
        return this.unicode;
    }

    public toString() : string {
        return this.symbol;
    }
}