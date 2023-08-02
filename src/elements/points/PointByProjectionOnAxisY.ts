import { type OptionsElement2D } from '../interfaces'
import type Figure from '../../Figure'
import Point from './Point'

class PointByProjectionOnAxisY extends Point {
  origin: Point
  constructor (figure: Figure, { origin, ...options }: { origin: Point } & OptionsElement2D) {
    super(figure, { x: 0, y: origin.x, isFree: false, ...options })
    this.type = 'PointByProjectionOnAxisY'
    this.origin = origin
    this.origin.subscribe(this)
  }

  update (): void {
    this._x = 0
    this._y = this.origin.y
    super.update()
  }

  toJSON (): object {
    return {
      type: this.type,
      idOrigin: this.origin.id,
      id: this.id,
      isChild: this.isChild,
      label: this.label,
      shape: this.shape,
      sizeInPixels: this.sizeInPixels,
      color: this.color,
      isDashed: this.isDashed,
      ...this.jsonOptions(),
    }
  }
}

export default PointByProjectionOnAxisY
