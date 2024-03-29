import type Figure from '../../Figure'
import { distance, orthogonalProjectionCoord } from '../calculus/Coords'
import { defaultMaxSlope, defaultMinSlope } from '../defaultValues'
import { type OptionsLine } from '../interfaces'
import type Point from '../points/Point'
import Segment from './Segment'

/**
 * Trace une droite
 */
class Line extends Segment {
  constructor (figure: Figure, { point1, point2, ...options }: OptionsLine) {
    super(figure, { point1, point2, ...options })
    this.type = 'Line'
  }

  update (): void {
    const [x1Svg, y1Svg, x2Svg, y2Svg] = getCoordsOut(this.point1, this.point2)
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
      this.svgBorder1?.remove()
    }
    if (this.shape?.at(-1) === '|') {
      this.drawBorder2()
    } else {
      this.svgBorder2?.remove()
    }
    this.notify()
  }

  distancePointer (x: number, y: number): number {
    const pointerCoords = { x, y }
    const projectionCoords = orthogonalProjectionCoord(pointerCoords, this)
    return distance(pointerCoords, projectionCoords)
  }

  get latex (): string {
    const [x1, y1, x2, y2] = getCoordsOut(this.point1, this.point2)
    let result = '%' + this.description
    result += `\n\\draw${this.latexOptions} (${x1}, ${y1}) -- (${x2}, ${y2});`
    return result
  }

  get description (): string {
    return `Droite ${this.notation}`
  }

  get notation (): string {
    const point1Name = this.point1.label !== '' ? this.point1.label : this.point1.id
    const point2Name = this.point2.label !== '' ? this.point2.label : this.point2.id
    return `(${point1Name}${point2Name})`
  }
}

/** Renvoie [x1, y1, x2, y2] les coordonnées des extrémités du tracé */
function getCoordsOut (A: Point, B: Point): [number, number, number, number] {
  if (A.x === undefined || A.y === undefined || B.x === undefined || B.y === undefined ||
    Number.isNaN(A.x) || Number.isNaN(A.y) || Number.isNaN(B.x) || Number.isNaN(B.y)) return [NaN, NaN, NaN, NaN]
  try {
    const figure = A.figure
    let pente = defaultMaxSlope
    if (B.x !== A.x) {
      pente = (B.y - A.y) / (B.x - A.x)
    }
    if (Math.abs(pente) >= defaultMaxSlope) return [A.x, figure.yMax, A.x, figure.yMin]
    if (Math.abs(pente) < defaultMinSlope) return [figure.xMin, A.y, figure.xMax, A.y]
    let xOutLeft: number, yOutLeft: number
    let n = 0
    while (true) {
      xOutLeft = A.x + n
      yOutLeft = A.y + n * pente
      n++
      if (xOutLeft > figure.xMax + 1 || yOutLeft > figure.yMax + 1 || yOutLeft < figure.yMin - 1) break
    }
    let xOutRight: number, yOutRight: number
    n = 0
    while (true) {
      xOutRight = A.x + n
      yOutRight = A.y + n * pente
      n--
      if (xOutRight < figure.xMin - 1 || yOutRight > figure.yMax + 1 || yOutRight < figure.yMin - 1) break
    }
    return [xOutLeft, yOutLeft, xOutRight, yOutRight]
  } catch (error) {
    console.error('Erreur dans Line.getCoordsOut', error)
    return [NaN, NaN, NaN, NaN]
  }
}

export default Line
