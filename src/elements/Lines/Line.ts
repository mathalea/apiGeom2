import { ApiGeom } from '../../ApiGeom'
import { optionsLine } from '../interfaces'
import { Point } from '../points/Point'
import { Segment } from './Segment'

/**
 * Trace une droite
 */
export class Line extends Segment {
  constructor (apiGeom: ApiGeom, { point1, point2, ...options }: optionsLine) {
    super(apiGeom, { point1, point2, ...options })
    this.type = 'Line'
  }

  update (): void {
    const [x1Svg, y1Svg, x2Svg, y2Svg] = getCoordsOut(this.point1, this.point2)
    if (Number.isNaN(x1Svg) || Number.isNaN(x2Svg) || Number.isNaN(y1Svg) || Number.isNaN(y1Svg)) {
      this.groupSvg.removeAttribute('x1')
      this.groupSvg.removeAttribute('x2')
      this.groupSvg.removeAttribute('y1')
      this.groupSvg.removeAttribute('y2')
    } else {
      this.groupSvg.setAttribute('x1', `${this.apiGeom.xToSx(x1Svg)}`)
      this.groupSvg.setAttribute('y1', `${this.apiGeom.yToSy(y1Svg)}`)
      this.groupSvg.setAttribute('x2', `${this.apiGeom.xToSx(x2Svg)}`)
      this.groupSvg.setAttribute('y2', `${this.apiGeom.yToSy(y2Svg)}`)
    }
    this.notify()
  }
}

function getCoordsOut (A: Point, B: Point): [number, number, number, number] {
  if (A.x === undefined || A.y === undefined || B.x === undefined || B.y === undefined ||
    Number.isNaN(A.x) || Number.isNaN(A.y) || Number.isNaN(B.x) || Number.isNaN(B.y)) return [NaN, NaN, NaN, NaN]
  try {
    const apiGeom = A.apiGeom
    let pente = Infinity
    if (B.x !== A.x) {
      pente = (B.y - A.y) / (B.x - A.x)
    }
    if (pente === Infinity) return [A.x, apiGeom.yMax, A.x, apiGeom.yMin]
    if (Math.abs(pente) < 10 ** -4) return [apiGeom.xMin, A.y, apiGeom.xMax, A.y]
    let xOutLeft: number, yOutLeft: number
    let n = 0
    while (true) {
      xOutLeft = A.x + n
      yOutLeft = A.y + n * pente
      n++
      if (xOutLeft > apiGeom.xMax + 1 || yOutLeft > apiGeom.yMax + 1 || yOutLeft < apiGeom.yMin - 1) break
    }
    let xOutRight: number, yOutRight: number
    n = 0
    while (true) {
      xOutRight = A.x + n
      yOutRight = A.y + n * pente
      n--
      if (xOutRight < apiGeom.xMin - 1 || yOutRight > apiGeom.yMax + 1 || yOutRight < apiGeom.yMin - 1) break
    }
    return [xOutLeft, yOutLeft, xOutRight, yOutRight]
  } catch (error) {
    console.log('Erreur dans Line.getCoordsOut', error)
    return [NaN, NaN, NaN, NaN]
  }
}
