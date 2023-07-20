import { reflectOverLineCoord } from '../calculus/Coords'
import { type OptionsPointBy } from '../interfaces'
import type Line from '../lines/Line'
import type Figure from '../../Figure'
import Point from './Point'

class PointByReflectOverLine extends Point {
  origin: Point
  line: Line
  constructor (figure: Figure, { origin, line, ...options }: { origin: Point, line: Line } & OptionsPointBy) {
    const { x, y } = reflectOverLineCoord(origin, line)
    super(figure, { x, y, ...options })
    this.type = 'PointByReflectOverLine'
    this.origin = origin
    this.line = line
    this.origin.subscribe(this)
    this.line.subscribe(this)
  }

  update (): void {
    const { x, y } = reflectOverLineCoord(this.origin, this.line)
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
      sizeInPixels: this.sizeInPixels,
      color: this.color,
      isDashed: this.isDashed
    }
  }
}

export default PointByReflectOverLine
