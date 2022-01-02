import * as Collections from 'typescript-collections'
export default class {
    public unicode: number
    public symbol: string
    public name: string;
    
    constructor() {
        return
    }

    public hashcode() : number {
        return this.unicode;
    }

    public toString() : string {
        return this.symbol;
    }
}