
//usage  .\ParseSymbolFile.py ..\src\symbols\json\Symbols.json
//overwrites '..src\symbols\json\Symbols.json'
//**Goal change this js file to typescript. Typscript is recieving errors on fs import */
import * as fs from "fs";
//import { stringSort } from '../src/helpers/helpers'


function stringSort(s){
	return s.split("").sort().join("")
}

const symbols = JSON.parse(fs.readFileSync(process.argv[2]))

for (const i of symbols){
	i.strokes = stringSort(i.strokes)
}

fs.writeFileSync(process.argv[2], JSON.stringify(symbols, null, 4))