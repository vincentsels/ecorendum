export function rnd(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function toss() {
  return Math.random() > 0.5;
}
