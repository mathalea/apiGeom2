import { type OptionsElement2D } from '../interfaces'
import type Figure from '../../Figure'
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
      ...this.jsonOptions(),
      idCenter: this.center.id,
      idOrigin: this.origin.id,
      angle: this.angle,
      label: this.label,
      shape: this.shape,
      sizeInPixels: this.sizeInPixels
    }
  }

  get description (): string {
    const centerName = this.center.label !== '' ? this.center.label : this.center.id
    const originName = this.origin.label !== '' ? this.origin.label : this.origin.id
    return `Image de $${originName}$ dans la rotation de centre $${centerName}$ et d'angle $${this.angle}$°`
  }
}

export default PointByRotation
