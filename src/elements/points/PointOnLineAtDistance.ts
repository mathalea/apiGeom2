import { homothetieCoord } from 'elements/calculus/Coords'
import { distance as calculDistance } from 'elements/calculus/utils'
import { OptionsPointBy } from 'elements/interfaces'
import Line from 'elements/lines/Line'
import Figure from '../../Figure'
import Point from './Point'
class PointOnLineAtDistance extends Point {
  distance: number
  line: Line
  constructor (figure: Figure, { line, distance, ...options }: { line: Line, distance: number } & OptionsPointBy) {
    const { x, y } = homothetieCoord(line.point1, line.point2, distance / calculDistance(line.point1, line.point2))
    super(figure, { x, y, ...options })
    this.line = line
    this.distance = distance
    this.line.subscribe(this)
  }

  update (): void {
    const { x, y } = homothetieCoord(this.line.point1, this.line.point2, this.distance / calculDistance(this.line.point1, this.line.point2))
    this._x = x
    this._y = y
    super.update()
  }
}

export default PointOnLineAtDistance
