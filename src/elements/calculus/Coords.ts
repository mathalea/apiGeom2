import Segment from '../lines/Segment'
import Circle from '../lines/Circle'
import Line from '../lines/Line'
import Point from '../points/Point'

/**
 * Classe de méthodes statiques pour des calculs sur les coordonnées
 */
export class Coords {
  x: number
  y: number
  constructor (x: number = 0, y: number = 0) {
    this.x = x
    this.y = y
  }
}

export function intersectionCCCoord (circle1: Circle, circle2: Circle, n: 1 | 2 = 1): Coords {
  try {
    const O1 = circle1.center
    const O2 = circle2.center
    const r0 = circle1._radius
    const r1 = circle2._radius
    const x0 = O1.x
    const x1 = O2.x
    const y0 = O1.y
    const y1 = O2.y
    if (x0 === undefined || x1 === undefined || y0 === undefined || y1 === undefined) return new Coords()
    const dx = x1 - x0
    const dy = y1 - y0
    const d = Math.sqrt(dy * dy + dx * dx)
    if (d > r0 + r1) {
      return { x: NaN, y: NaN }
    }
    if (d < Math.abs(r0 - r1)) {
      return { x: NaN, y: NaN }
    }
    const a = (r0 * r0 - r1 * r1 + d * d) / (2.0 * d)
    const x2 = x0 + (dx * a) / d
    const y2 = y0 + (dy * a) / d
    const h = Math.sqrt(r0 * r0 - a * a)
    const rx = -dy * (h / d)
    const ry = dx * (h / d)
    const xi = x2 + rx
    const xiPrime = x2 - rx
    const yi = y2 + ry
    const yiPrime = y2 - ry
    if (n === 1) {
      if (yiPrime > yi) {
        return new Coords(xiPrime, yiPrime)
      } else {
        return new Coords(xi, yi)
      }
    } else {
      if (yiPrime > yi) {
        return new Coords(xi, yi)
      } else {
        return new Coords(xiPrime, yiPrime)
      }
    }
  } catch (error) {
    return new Coords(NaN, NaN)
  }
}

export function intersectionLLCoord (line1: Line, line2: Line): Coords {
  try {
    const [da, db, dc] = line1.equation
    const [fa, fb, fc] = line2.equation
    let x: number
    let y: number
    if (fa * db - fb * da === 0) {
      return { x: NaN, y: NaN }
    } else {
      y = (fc * da - dc * fa) / (fa * db - fb * da)
    }
    if (da === 0) { // si d est horizontale alors f ne l'est pas donc fa<>0
      x = (-fc - fb * y) / fa
    } else { // d n'est pas horizontale donc ...
      x = (-dc - db * y) / da
    }
    // On teste le cas du segment ou de la demi-droite
    let isIntersectionExisting = true
    if (line1.type === 'Segment' && (x < Math.min(line1.point1.x, line1.point2.x) || x > Math.max(line1.point1.x, line1.point2.x) || y < Math.min(line1.point1.y, line1.point2.y) || y > Math.max(line1.point1.y, line1.point2.y))) {
      isIntersectionExisting = false
    }
    if (line2.type === 'Segment' && (x < Math.min(line2.point1.x, line2.point2.x) || x > Math.max(line2.point1.x, line2.point2.x) || y < Math.min(line2.point1.y, line2.point2.y) || y > Math.max(line2.point1.y, line2.point2.y))) {
      isIntersectionExisting = false
    }
    if (line1.type === 'Ray') {
      // Direction gauche droite
      if (line1.point1.x < line1.point2.x && x < line1.point1.x) {
        isIntersectionExisting = false
      }
      // Direction droite gauche
      if (line1.point1.x > line1.point2.x && x > line1.point1.x) {
        isIntersectionExisting = false
      }
      // Direction bas haut
      if (line1.point1.y < line1.point2.y && y < line1.point1.y) {
        isIntersectionExisting = false
      }
      // Direction haut bas
      if (line1.point1.y > line1.point2.y && y > line1.point1.y) {
        isIntersectionExisting = false
      }
    }
    if (line2.type === 'Ray') {
      // Direction gauche droite
      if (line2.point1.x < line2.point2.x && x < line2.point1.x) {
        isIntersectionExisting = false
      }
      // Direction droite gauche
      if (line2.point1.x > line2.point2.x && x > line2.point1.x) {
        isIntersectionExisting = false
      }
      // Direction bas haut
      if (line2.point1.y < line2.point2.y && y < line2.point1.y) {
        isIntersectionExisting = false
      }
      // Direction haut bas
      if (line2.point1.y > line2.point2.y && y > line2.point1.y) {
        isIntersectionExisting = false
      }
    }
    if (!isIntersectionExisting) {
      x = NaN
      y = NaN
    }
    return new Coords(x, y)
  } catch (error) {
    console.log(error)
    return new Coords(NaN, NaN)
  }
}

export function distance (A: Point, B: Point): number {
  return Math.hypot(A.x - B.x, A.y - B.y)
}

export function intersectionSCCoord (L: Segment, C: Circle): Coords {
  try {
    const { x } = intersectionLCCoord(L, C, 1)
    const [A, B] = [L.point1, L.point2]
    if (x !== undefined && distance(A, B) > C.radius) {
      if (x < Math.max(A.x, B.x) && x > Math.min(A.x, B.x)) {
        return intersectionLCCoord(L, C, 1)
      } else {
        return intersectionLCCoord(L, C, 2)
      }
    } else return new Coords(NaN, NaN)
  } catch (error) {
    return new Coords(NaN, NaN)
  }
}

export function intersectionLCCoord (D: Line, C: Circle, n: 1 | 2 = 1): Coords {
  try {
    const O = C.center
    const r = C.radius
    const [a, b, c] = D.equation
    const xO = O.x
    const yO = O.y
    let Delta: number, delta: number, xi: number, yi: number, xiPrime: number, yiPrime: number
    if (b === 0) {
      // la droite est verticale
      xi = -c / a
      xiPrime = xi
      Delta = 4 * (-xO * xO - (c * c) / (a * a) - (2 * xO * c) / a + r * r)
      if (Delta < 0) return new Coords(NaN, NaN)
      else if (Math.abs(Delta) < 10 ** (-6)) {
        // un seul point d'intersection
        yi = yO + Math.sqrt(Delta) / 2
        yiPrime = yi
      } else {
        // deux points d'intersection
        yi = yO - Math.sqrt(Delta) / 2
        yiPrime = yO + Math.sqrt(Delta) / 2
      }
    } else if (a === 0) {
      // la droite est horizontale
      yi = -c / b
      yiPrime = yi
      Delta = 4 * (-yO * yO - (c * c) / (b * b) - (2 * yO * c) / b + r * r)
      if (Delta < 0) return new Coords(NaN, NaN)
      else if (Math.abs(Delta) < 10 ** (-6)) {
        // un seul point d'intersection
        xi = xO + Math.sqrt(Delta) / 2
        xiPrime = xi
      } else {
        // deux points d'intersection
        xi = xO - Math.sqrt(Delta) / 2
        xiPrime = xO + Math.sqrt(Delta) / 2
      }
    } else {
      // cas général
      Delta = (2 * ((a * c) / (b * b) + (yO * a) / b - xO)) ** 2 -
            4 *
            (1 + (a / b) ** 2) *
            (xO * xO + yO * yO + (c / b) ** 2 + (2 * yO * c) / b - r * r)
      if (Delta < 0) return new Coords(NaN, NaN)
      else if (Math.abs(Delta) < 10 ** (-6)) {
        // un seul point d'intersection
        delta = Math.sqrt(Delta)
        xi = (-2 * ((a * c) / (b * b) + (yO * a) / b - xO) - delta) /
              (2 * (1 + (a / b) ** 2))
        xiPrime = xi
        yi = (-a * xi - c) / b
        yiPrime = yi
      } else {
        // deux points d'intersection
        delta = Math.sqrt(Delta)
        xi = (-2 * ((a * c) / (b * b) + (yO * a) / b - xO) - delta) /
              (2 * (1 + (a / b) ** 2))
        xiPrime = (-2 * ((a * c) / (b * b) + (yO * a) / b - xO) + delta) /
              (2 * (1 + (a / b) ** 2))
        yi = (-a * xi - c) / b
        yiPrime = (-a * xiPrime - c) / b
      }
    }
    if (n === 1) {
      if (yiPrime > yi) {
        return new Coords(xiPrime, yiPrime)
      } else {
        return new Coords(xi, yi)
      }
    } else {
      if (yiPrime > yi) {
        return new Coords(xi, yi)
      } else {
        return new Coords(xiPrime, yiPrime)
      }
    }
  } catch (error) {
    return new Coords(NaN, NaN)
  }
}

/**
 *
 * @param M Point
 * @param d Droite
 * @returns [x, y] coordonnées du projeté orthogonale sur d
 * @author Jean-Claude Lhote
 */
export function orthogonalProjectionCoord (M: Point | Coords, d: Line): Coords {
  try {
    const [a, b, c] = d.equation
    const k = 1 / (a * a + b * b)
    let x: number | undefined, y: number | undefined
    if (a === 0) {
      x = M.x
      y = -c / b
    } else if (b === 0) {
      y = M.y
      x = -c / a
    } else {
      if (M.x === undefined || M.y === undefined) return new Coords()
      x = k * (b * b * M.x - a * b * M.y - a * c)
      y = k * (-a * b * M.x + a * a * M.y + (a * a * c) / b) - c / b
    }
    return new Coords(x, y)
  } catch (error) {
    return new Coords(NaN, NaN)
  }
}

/**
   *
   * @param A Antécédent (Point ou[x,y])
   * @param O Centre (Point ou[x,y])
   * @param angle Image
   * @returns [x, y] coordonnées de l'image
   */
export function rotationCoord (A: Point | Coords, O: Point | Coords, angle: number): Coords {
  try {
    if (O.x === undefined || O.y === undefined || A.x === undefined || A.y === undefined) return new Coords()
    const x = (O.x + (A.x - O.x) * Math.cos((angle * Math.PI) / 180) - (A.y - O.y) * Math.sin((angle * Math.PI) / 180))
    const y = (O.y + (A.x - O.x) * Math.sin((angle * Math.PI) / 180) + (A.y - O.y) * Math.cos((angle * Math.PI) / 180))
    return new Coords(x, y)
  } catch (error) {
    return new Coords(NaN, NaN)
  }
}

/**
     *
     * @param A Antécédent
     * @param O Centre
     * @param k Coefficient
     * @returns [x, y] coordonnées de l'image
     */
export function homothetieCoord (A: Point | Coords, O: Point | Coords, k: number): Coords {
  if (A.x === undefined || A.y === undefined || O.x === undefined || O.y === undefined) return new Coords()
  try {
    const x = (O.x + k * (A.x - O.x))
    const y = (O.y + k * (A.y - O.y))
    return new Coords(x, y)
  } catch {
    return new Coords(NaN, NaN)
  }
}

/**
     *
     * @param A Antécédent
     * @param O Centre
     * @param k Coefficient
     * @param angle Angle en degrés
     * @returns [x, y] coordonnées de l'image
     */
export function similitudeCoord (A: Point | Coords, O: Point | Coords, k: number, angle: number): Coords {
  if (A.x === undefined || A.y === undefined || O.x === undefined || O.y === undefined) return new Coords()
  try {
    const angleRadian = angle * Math.PI / 180
    const x = (O.x + k * (Math.cos(angleRadian) * (A.x - O.x) - Math.sin(angleRadian) * (A.y - O.y)))
    const y = (O.y + k * (Math.cos(angleRadian) * (A.y - O.y) + Math.sin(angleRadian) * (A.x - O.x)))
    return new Coords(x, y)
  } catch (error) {
    return new Coords(NaN, NaN)
  }
}
