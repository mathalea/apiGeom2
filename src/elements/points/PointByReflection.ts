import type Figure from '../../Figure'
import type { OptionsElement2D } from '../interfaces'
import Point from './Point'

class PointByReflection extends Point {
  center: Point
  origin: Point
  constructor (figure: Figure, { center, origin, ...options }: { center: Point, origin: Point } & OptionsElement2D) {
    const x = 2 * center.x - origin.x
    const y = 2 * center.y - origin.y
    super(figure, { x, y, isFree: false, ...options })
    this.type = 'PointByReflection'
    this.center = center
    this.origin = origin
    this.center.subscribe(this)
    this.origin.subscribe(this)
  }

  update (): void {
    const x = 2 * this.center.x - this.origin.x
    const y = 2 * this.center.y - this.origin.y
    this._x = x
    this._y = y
    super.update()
  }

  toJSON (): object {
    return {
      ...this.jsonOptions(),
      idCenter: this.center.id,
      idOrigin: this.origin.id,
      label: this.label,
      shape: this.shape,
      sizeInPixels: this.sizeInPixels
    }
  }

  get description (): string {
    const centerName = this.center.label !== '' ? this.center.label : this.center.id
    const originName = this.origin.label !== '' ? this.origin.label : this.origin.id
    return `Image de $${originName}$ dans la symétrie de centre $${centerName}$`
  }
}

export default PointByReflection
