import { similitudeCoord } from '../calculus/Coords'
import { type OptionsPointBy } from '../interfaces'
import type Figure from '../../Figure'
import Point from './Point'

class PointBySimilarity extends Point {
  origin: Point
  center: Point
  angle: number
  k: number
  constructor (figure: Figure, { origin, center, angle, k, ...options }: { origin: Point, center: Point, angle: number, k: number } & OptionsPointBy) {
    const { x, y } = similitudeCoord(origin, center, k, angle)
    super(figure, { x, y, ...options })
    this.type = 'PointBySimilarity'
    this.origin = origin
    this.center = center
    this.angle = angle
    this.k = k
    this.origin.subscribe(this)
    this.center.subscribe(this)
  }

  update (): void {
    const { x, y } = similitudeCoord(this.origin, this.center, this.k, this.angle)
    this._x = x
    this._y = y
    super.update()
  }

  toJSON (): object {
    return {
      ...this.jsonOptions(),
      idCenter: this.center.id,
      idOrigin: this.origin.id,
      angle: this.angle,
      k: this.k,
      label: this.label,
      shape: this.shape,
      sizeInPixels: this.sizeInPixels
    }
  }

  get description (): string {
    const centerName = this.center.label !== '' ? this.center.label : this.center.id
    const originName = this.origin.label !== '' ? this.origin.label : this.origin.id
    return `Image de $${originName}$ dans la similitude de centre $${centerName}$, d'angle $${this.angle}$° et de rapport $${this.k}$`
  }
}

export default PointBySimilarity
