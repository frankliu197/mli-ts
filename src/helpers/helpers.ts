export function* enumerate<T>(array: Array<T>, start = 0): Iterable<[number, T]> {
  let i = start;
  for (const x of array) {
    yield [i++, x];
  }
}


/**
 * Execution since the last call of timer in mileseconds
 * @returns 
 */
export function* timer(): Iterable<number> {
  let start = new Date().getTime();
  
  yield 0;

	while (true){
    let end = new Date().getTime();
    yield end - start
    start = end
  }	
}

/**
 * set of all possible strings with one less letter in the same order
 * @param keyword
 * @returns
 */
export function* stripLetter(keyword: string): Iterable<string> {
  const set = new Set<string>();

  for (let i = 0; i < keyword.length; i++) {
    if (!set.has(keyword[i])) {
      set.add(keyword[i]);
      yield keyword.slice(0, i).concat(keyword.slice(i + 1));
    }
  }
}

//inside helpers.ts
export function stringSort(s: string): string {
  return s.split("").sort().join("");
}


