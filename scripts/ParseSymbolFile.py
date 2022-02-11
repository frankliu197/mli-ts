#!/usr/bin/python3
#usage  .\ParseSymbolFile.py ..\src\symbols\Symbols.txt
# Outputs '..src\symbols\Symbols.json'

import sys
import json
dataset = []
with open(sys.argv[1], encoding="utf8") as f:
    for line in f:
        data = line.replace("-", "_")
        data = data.split()
        if data[0] != "setName" and len(data) == 4:
            dataset.append({"unicode": int(data[1]), "name": data[2].replace('_', ' '), "symbol": data[3], "keywords": {}, "symbols": []})

with open(sys.argv[1].rsplit('.', 1)[0] + '.json', 'w') as f:
    json.dump(dataset, f, indent=4)