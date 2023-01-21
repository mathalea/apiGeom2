import { OptionsElement2D } from 'elements/interfaces'
import Figure from '../../Figure'
import Point from './Point'

class PointByRotation extends Point {
  origin: Point
  center: Point
  angle: number
  constructor (figure: Figure, { origin, center, angle, ...options }: { origin: Point, center: Point, angle: number, shape?: 'o' | 'x' | '' } & OptionsElement2D) {
    const x = (center.x + (origin.x - center.x) * Math.cos((angle * Math.PI) / 180) - (origin.y - center.y) * Math.sin((angle * Math.PI) / 180))
    const y = (center.y + (origin.x - center.x) * Math.sin((angle * Math.PI) / 180) + (origin.y - center.y) * Math.cos((angle * Math.PI) / 180))
    super(figure, { x, y, ...options })
    this.type = 'PointByRotation'
    this.origin = origin
    this.center = center
    this.angle = angle
    this.origin.subscribe(this)
    this.center.subscribe(this)
  }

  update (): void {
    this._x = (this.center.x + (this.origin.x - this.center.x) * Math.cos((this.angle * Math.PI) / 180) - (this.origin.y - this.center.y) * Math.sin((this.angle * Math.PI) / 180))
    this._y = (this.center.y + (this.origin.x - this.center.x) * Math.sin((this.angle * Math.PI) / 180) + (this.origin.y - this.center.y) * Math.cos((this.angle * Math.PI) / 180))
    super.update()
  }

  toJSON (): object {
    return {
      type: this.type,
      idCenter: this.center.id,
      idOrigin: this.origin.id,
      angle: this.angle,
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

export default PointByRotation
