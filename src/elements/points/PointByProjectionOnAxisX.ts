import { type OptionsElement2D } from '../interfaces'
import type Figure from '../../Figure'
import Point from './Point'

class PointByProjectionOnAxisX extends Point {
  origin: Point
  constructor (figure: Figure, { origin, ...options }: { origin: Point } & OptionsElement2D) {
    super(figure, { x: origin.x, y: 0, isFree: false, ...options })
    this.type = 'PointByProjectionOnAxisX'
    this.origin = origin
    this.origin.subscribe(this)
  }

  update (): void {
    this._x = this.origin.x
    this._y = 0
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
      size: this.size,
      color: this.color,
      isDashed: this.isDashed
    }
  }
}

export default PointByProjectionOnAxisX
