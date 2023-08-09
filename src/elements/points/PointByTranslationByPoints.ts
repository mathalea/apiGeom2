import type Figure from '../../Figure'
import type { OptionsElement2D } from '../interfaces'
import Point from './Point'

class PointByTranslationByPoints extends Point {
  point1: Point
  point2: Point
  origin: Point
  constructor (figure: Figure, { point1, point2, origin, ...options }: { point1: Point, point2: Point, origin: Point } & OptionsElement2D) {
    const x = point2.x - point1.x + origin.x
    const y = point2.y - point1.y + origin.y
    super(figure, { x, y, isFree: false, ...options })
    this.type = 'PointByTranslationByPoints'
    this.point1 = point1
    this.point2 = point2
    this.origin = origin
    this.point1.subscribe(this)
    this.point2.subscribe(this)
    this.origin.subscribe(this)
  }

  update (): void {
    this._x = this.point2.x - this.point1.x + this.origin.x
    this._y = this.point2.y - this.point1.y + this.origin.y
    super.update()
  }

  toJSON (): object {
    return {
      ...this.jsonOptions(),
      idOrigin: this.origin.id,
      idPoint1: this.point1.id,
      idPoint2: this.point2.id
    }
  }

  get description (): string {
    const originName = this.origin.label !== '' ? this.origin.label : this.origin.id
    const point1Name = this.point1.label !== '' ? this.point1.label : this.point1.id
    const point2Name = this.point2.label !== '' ? this.point2.label : this.point2.id
    return `Image de $${originName}$ par la translation qui transforme $${point1Name}$ en $${point2Name}$`
  }
}

export default PointByTranslationByPoints
