export function* enumerate<T>(array: Array<T>, start = 0) : Iterable<[number, T]>{ 
	let i = start
  for (const x of array) {
    yield [i++, x]
	}
}
