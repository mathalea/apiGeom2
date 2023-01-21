import { orthogonalProjectionCoord } from 'elements/calculus/Coords'
import { OptionsElement2D } from 'elements/interfaces'
import Segment from 'elements/lines/Segment'
import Figure from '../../Figure'
import Point from './Point'

class PointByProjection extends Point {
  origin: Point
  line: Segment
  constructor (figure: Figure, { origin, line, ...options }: { origin: Point, line: Segment } & OptionsElement2D) {
    const { x, y } = orthogonalProjectionCoord(origin, line)
    super(figure, { x, y, ...options })
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
      type: this.type,
      idLine: this.line.id,
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

export default PointByProjection
