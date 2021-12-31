#!/usr/bin/python3
import sys
import json
dataset = []
with open(sys.argv[1]) as f:
    for line in f:
        data = line.replace("-", "_")
        data = data.split()
        dataset.append({"unicode": int(data[1]), "name": data[2], "symbol": data[3]})

with open(sys.argv[1].rsplit('.', 1)[0] + '.json', 'w') as f:
    json.dump(dataset, f, indent=4)
