import { orthogonalProjectionCoord } from '../calculus/Coords'
import { type OptionsElement2D } from '../interfaces'
import type Segment from '../lines/Segment'
import type Figure from '../../Figure'
import Point from './Point'

class PointByProjection extends Point {
  origin: Point
  line: Segment
  constructor (figure: Figure, { origin, line, ...options }: { origin: Point, line: Segment } & OptionsElement2D) {
    const { x, y } = orthogonalProjectionCoord(origin, line)
    super(figure, { x, y, isFree: false, ...options })
    this.type = 'PointByProjection'
    this.origin = origin
    this.line = line
    this.origin.subscribe(this)
    this.line.subscribe(this)
  }

  update (): void {
    const { x, y } = orthogonalProjectionCoord(this.origin, this.line)
    this._x = x
    this._y = y
    super.update()
  }

  toJSON (): object {
    return {
      ...this.jsonOptions(),
      idLine: this.line.id,
      idOrigin: this.origin.id,
      label: this.label,
      shape: this.shape,
      sizeInPixels: this.sizeInPixels
    }
  }

  get description (): string {
    const lineName = this.line.notation
    const originName = this.origin.label !== '' ? this.origin.label : this.origin.id
    return `Projection orthogonale de $${originName}$ sur $${lineName}$`
  }
}

export default PointByProjection
