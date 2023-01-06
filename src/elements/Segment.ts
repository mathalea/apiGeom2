import { ApiGeom } from '../ApiGeom'
import { Element2D } from './Element2D'
import { optionsElement2D } from './interfaces'
import { Point } from './Point'

export class Segment extends Element2D {
  namePoint1: string
  namePoint2: string
  point1: Point
  point2: Point
  style?: string
  constructor (apiGeom: ApiGeom, point1: string | Point, point2: string | Point, options?: optionsElement2D) {
    super(apiGeom, options)
    this.type = 'Segment'
    if (typeof point1 === 'string') {
      this.namePoint1 = point1
      if (this.apiGeom.elements.has(this.namePoint1)) this.point1 = this.apiGeom.elements.get(this.namePoint1) as Point
      else throw new Error(`Point '${this.namePoint1}' does not exist`)
    } else {
      this.point1 = point1
      this.namePoint1 = point1.name
    }
    if (typeof point2 === 'string') {
      this.namePoint2 = point2
      if (this.apiGeom.elements.has(this.namePoint2)) this.point2 = this.apiGeom.elements.get(this.namePoint2) as Point
      else throw new Error(`Point '${this.namePoint2}' does not exist`)
    } else {
      this.point2 = point2
      this.namePoint2 = point2.name
    }
    this.groupSvg = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    this.point1.subscribe(this)
    this.point2.subscribe(this)
    this.apiGeom.svg.appendChild(this.groupSvg)
    this.setColorAndThickness()
  }

  draw (): void {
    const x1Svg = this.apiGeom.xToSx(this.point1.x)
    const x2Svg = this.apiGeom.xToSx(this.point2.x)
    const y1Svg = this.apiGeom.yToSy(this.point1.y)
    const y2Svg = this.apiGeom.yToSy(this.point2.y)
    this.groupSvg.setAttribute('x1', `${x1Svg}`)
    this.groupSvg.setAttribute('y1', `${y1Svg}`)
    this.groupSvg.setAttribute('x2', `${x2Svg}`)
    this.groupSvg.setAttribute('y2', `${y2Svg}`)
  }

  toJSON (): object {
    return {
      namePoint1: this.namePoint1,
      namePoint2: this.namePoint2,
      ...super.toJSON()
    }
  }
}
