#!/usr/bin/python3
import sys
import json
dataset = {}
with open(sys.argv[1]) as f:
    for line in f:
        data = line.split()
        dataset[data[0]] = {"unicode": data[0], "name": data[1], "symbol": data[2]}

with open(sys.argv[1].rsplit('.', 1)[0] + '.json', 'w') as f:
    json.dump(dataset, f, indent=4)
