export function round (value: number, precision = 4): number {
  return Math.round(value * 10 ** precision) / 10 ** precision
}
