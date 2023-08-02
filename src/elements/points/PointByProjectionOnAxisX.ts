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
      ...this.jsonOptions(),
      idOrigin: this.origin.id,
      label: this.label,
      shape: this.shape,
      sizeInPixels: this.sizeInPixels
    }
  }
}

export default PointByProjectionOnAxisX
