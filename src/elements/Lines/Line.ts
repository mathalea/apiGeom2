import { ApiGeom } from '../../ApiGeom'
import { Element2D } from '../Element2D'
import { optionsElement2D } from '../interfaces'
import { Point } from '../Points/Point'

export class Line extends Element2D {
  /** id de la première extrémité */
  idPoint1: string
  /** id de la deuxième extrémité */
  idPoint2: string
  /** Pointeur vers la première extrémité */
  point1: Point
  /** Pointeur vers la deuxième extrémité */
  point2: Point
  constructor (apiGeom: ApiGeom, point1: string | Point, point2: string | Point, options?: optionsElement2D) {
    super(apiGeom, options)
    this.type = 'Line'
    if (typeof point1 === 'string') {
      this.idPoint1 = point1
      if (this.apiGeom.elements.has(this.idPoint1)) this.point1 = this.apiGeom.elements.get(this.idPoint1) as Point
      else throw new Error(`Point '${this.idPoint1}' does not exist`)
    } else {
      this.point1 = point1
      this.idPoint1 = point1.id
    }
    if (typeof point2 === 'string') {
      this.idPoint2 = point2
      if (this.apiGeom.elements.has(this.idPoint2)) this.point2 = this.apiGeom.elements.get(this.idPoint2) as Point
      else throw new Error(`Point '${this.idPoint2}' does not exist`)
    } else {
      this.point2 = point2
      this.idPoint2 = point2.id
    }
    this.groupSvg = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    this.point1.subscribe(this)
    this.point2.subscribe(this)
    this.apiGeom.svg.appendChild(this.groupSvg)
    this.draw()
    this.setColorAndThickness()
  }

  draw (): void {
    const [x1Svg, y1Svg, x2Svg, y2Svg] = getCoordsOut(this.point1, this.point2)
    this.groupSvg.setAttribute('x1', `${this.apiGeom.xToSx(x1Svg)}`)
    this.groupSvg.setAttribute('y1', `${this.apiGeom.yToSy(y1Svg)}`)
    this.groupSvg.setAttribute('x2', `${this.apiGeom.xToSx(x2Svg)}`)
    this.groupSvg.setAttribute('y2', `${this.apiGeom.yToSy(y2Svg)}`)
  }

  toJSON (): object {
    return {
      idPoint1: this.idPoint1,
      idPoint2: this.idPoint2,
      ...super.toJSON()
    }
  }
}

function getCoordsOut (A: Point, B: Point): [number, number, number, number] {
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
