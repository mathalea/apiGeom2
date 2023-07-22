import type Figure from '../../Figure'
import { distance } from '../calculus/Coords'
import type Point from '../points/Point'
import Segment from './Segment'

/**
 * Trace une demi-droite d'origine point1 et qui passe par point 2
 */
class Ray extends Segment {
  constructor (figure: Figure, { point1, point2, ...options }: {
    point1: Point
    point2: Point
    shape?: '' | '|-|' | '|-' | '-|'
    borderSize?: number
  }) {
    super(figure, { point1, point2, ...options })
    this.type = 'Ray'
  }

  update (): void {
    const [x1Svg, y1Svg, x2Svg, y2Svg] = getRayCoordsOut(this.point1, this.point2)
    if (Number.isNaN(x1Svg) || Number.isNaN(x2Svg) || Number.isNaN(y1Svg) || Number.isNaN(y1Svg)) {
      this.svgLine.removeAttribute('x1')
      this.svgLine.removeAttribute('x2')
      this.svgLine.removeAttribute('y1')
      this.svgLine.removeAttribute('y2')
    } else {
      this.svgLine.setAttribute('x1', `${this.figure.xToSx(x1Svg)}`)
      this.svgLine.setAttribute('y1', `${this.figure.yToSy(y1Svg)}`)
      this.svgLine.setAttribute('x2', `${this.figure.xToSx(x2Svg)}`)
      this.svgLine.setAttribute('y2', `${this.figure.yToSy(y2Svg)}`)
    }
    if (this.shape?.at(0) === '|') {
      this.drawBorder1()
    } else {
      this.svgBorder1.remove()
    }
    if (this.shape?.at(-1) === '|') {
      this.drawBorder2()
    } else {
      this.svgBorder2.remove()
    }
    this.notify()
  }

  distancePointer (x: number, y: number): number {
    const pointerCoords = { x, y }
    // Calculer la direction de la demi-droite
    const rayDirection = { x: this.point2.x - this.point1.x, y: this.point2.y - this.point1.y }
    const rayLength = Math.hypot(rayDirection.x, rayDirection.y)
    // Si la longueur du rayon est nulle, la demi-droite se réduit à un point, donc on renvoie la distance entre ce point et le pointeur
    if (rayLength === 0) {
      return distance(pointerCoords, this.point1)
    }
    // Normaliser la direction du rayon (la rendre unitaire)
    const normalizedRayDirection = { x: rayDirection.x / rayLength, y: rayDirection.y / rayLength }
    // Trouver la projection du point sur la demi-droite
    const projection = (normalizedRayDirection.x * (x - this.point1.x) + normalizedRayDirection.y * (y - this.point1.y)) / rayLength
    // La distance minimale est la distance au point d'origine si la projection est négative
    if (projection < 0) {
      return Math.sqrt((x - this.point1.x) ** 2 + (y - this.point1.y) ** 2)
    } else {
      // Calculer les coordonnées du point le plus proche sur la demi-droite
      const closestX = this.point1.x + normalizedRayDirection.x * projection
      const closestY = this.point1.y + normalizedRayDirection.y * projection
      const closest = { x: closestX, y: closestY }
      return distance(pointerCoords, closest)
    }
  }
}
function getRayCoordsOut (A: Point, B: Point): [number, number, number, number] {
  if (A.x === undefined || A.y === undefined || B.x === undefined || B.y === undefined ||
    Number.isNaN(A.x) || Number.isNaN(A.y) || Number.isNaN(B.x) || Number.isNaN(B.y)) return [NaN, NaN, NaN, NaN]
  try {
    const parentFigure = A.figure
    let pente = Infinity
    if (B.x !== A.x) {
      pente = (B.y - A.y) / (B.x - A.x)
    }
    if (pente === Infinity) {
      if (A.y > B.y) return [A.x, A.y, A.x, parentFigure.yMin] // Si la droite est verticale on prend l'abscisse de A et le bon bord en ordonnée
      else return [A.x, A.y, A.x, parentFigure.yMax] // Ici on sort par en haut
    }
    if (Math.abs(pente) < 10 ** -4) {
      if (A.x > B.x) return [A.x, A.y, parentFigure.xMin, A.y]
      else return [A.x, A.y, parentFigure.xMax, A.y]
    }
    let xOutLeft: number, yOutLeft: number
    let n = 0
    if (B.x > A.x) {
      while (true) {
        xOutLeft = A.x + n
        yOutLeft = A.y + n * pente
        n++
        if (xOutLeft > parentFigure.xMax + 1 || yOutLeft > parentFigure.yMax + 1 || yOutLeft < parentFigure.yMin - 1) break
      }
      return [A.x, A.y, xOutLeft, yOutLeft]
    } else {
      while (true) {
        xOutLeft = A.x - n
        yOutLeft = A.y - n * pente
        n++
        if (xOutLeft < parentFigure.xMin - 1 || yOutLeft > parentFigure.yMax + 1 || yOutLeft < parentFigure.yMin - 1) break
      }
      return [A.x, A.y, xOutLeft, yOutLeft]
    }
  } catch (error) {
    console.log('Erreur dans Ray.getRayCoordsOut', error)
    return [NaN, NaN, NaN, NaN]
  }
}

export default Ray
