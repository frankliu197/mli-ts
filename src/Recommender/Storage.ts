import Character from "./Character";

export function boost(c: Character): void {
  c.boost++;
  localStorage.setItem(c.symbol, c.boost + "");
}

export function setBoosts(c: Character): void {
  if (localStorage.getItem(c.symbol)) {
    c.boost = Number(localStorage.getItem(c.symbol));
  }
}

export function clear(): void {
  localStorage.clear();
}
