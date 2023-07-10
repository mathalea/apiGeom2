export function distance (point1: { x: number, y: number }, point2: { x: number, y: number }): number {
  return Math.hypot(point1.x - point2.x, point1.y - point2.y)
}

export function getLargeSweep (angle: number): [number, number] {
  try {
    let large: 0 | 1
    let sweep: 0 | 1
    if (angle > 180) {
      angle = angle - 360
      large = 1
      sweep = 0
    } else if (angle < -180) {
      angle = 360 + angle
      large = 1
      sweep = 1
    } else {
      large = 0
      sweep = (angle > 0) ? 0 : 1
    }
    return [large, sweep]
  } catch (error) {
    return [NaN, NaN]
  }
}
