import Figure from '../../Figure'
import { optionsLine } from '../interfaces'
import Point from '../points/Point'
import Segment from './Segment'

/**
 * Trace une droite
 */
class Line extends Segment {
  constructor (figure: Figure, { point1, point2, ...options }: optionsLine) {
    super(figure, { point1, point2, ...options })
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
      this.groupSvg.setAttribute('x1', `${this.figure.xToSx(x1Svg)}`)
      this.groupSvg.setAttribute('y1', `${this.figure.yToSy(y1Svg)}`)
      this.groupSvg.setAttribute('x2', `${this.figure.xToSx(x2Svg)}`)
      this.groupSvg.setAttribute('y2', `${this.figure.yToSy(y2Svg)}`)
    }
    this.notify()
  }
}

function getCoordsOut (A: Point, B: Point): [number, number, number, number] {
  if (A.x === undefined || A.y === undefined || B.x === undefined || B.y === undefined ||
    Number.isNaN(A.x) || Number.isNaN(A.y) || Number.isNaN(B.x) || Number.isNaN(B.y)) return [NaN, NaN, NaN, NaN]
  try {
    const figure = A.figure
    let pente = Infinity
    if (B.x !== A.x) {
      pente = (B.y - A.y) / (B.x - A.x)
    }
    if (pente === Infinity) return [A.x, figure.yMax, A.x, figure.yMin]
    if (Math.abs(pente) < 10 ** -4) return [figure.xMin, A.y, figure.xMax, A.y]
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
    console.log('Erreur dans Line.getCoordsOut', error)
    return [NaN, NaN, NaN, NaN]
  }
}

export default Line
