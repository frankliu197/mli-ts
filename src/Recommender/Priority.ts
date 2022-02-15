export function valueCountPriority(count: number): number {
  return 1 / (1 + 0.4 * count);
}

export function stringMatchPriority(search: string, keyword: string): number {
  return search.length / keyword.length;
}

export function combinePriority(p1: number, p2: number): number {
  return (p1 + 1) * p2;
}
