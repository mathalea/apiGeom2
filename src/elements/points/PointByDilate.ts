import { type OptionsElement2D } from '../interfaces'
import type Figure from '../../Figure'
import Point from './Point'

class PointByDilate extends Point {
  origin: Point
  center: Point
  k: number
  constructor (figure: Figure, { origin, center, k, color, thickness, ...options }: { origin: Point, center: Point, k: number, shape?: 'o' | 'x' | '' | '|' } & OptionsElement2D) {
    const x = (center.x + k * (origin.x - center.x))
    const y = (center.y + k * (origin.y - center.y))
    super(figure, { x, y, color, thickness, isFree: false, ...options })
    this.type = 'PointByDilate'
    this.origin = origin
    this.center = center
    this.k = k
    this.origin.subscribe(this)
    this.center.subscribe(this)
  }

  update (): void {
    this._x = (this.center.x + this.k * (this.origin.x - this.center.x))
    this._y = (this.center.y + this.k * (this.origin.y - this.center.y))
    super.update()
  }

  toJSON (): object {
    return {
      ...this.jsonOptions(),
      idCenter: this.center.id,
      idOrigin: this.origin.id,
      k: this.k,
      label: this.label,
      shape: this.shape,
      sizeInPixels: this.sizeInPixels
    }
  }
}

export default PointByDilate
