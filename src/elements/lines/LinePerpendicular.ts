import type Figure from '../../Figure'
import { type OptionsLinePerpendicular } from '../interfaces'
import type Point from '../points/Point'
import type Line from './Line'
import LineByPointVector from './LineByPointVector'

class LinePerpendicular extends LineByPointVector {
  /** Droite perpendiculaire qui la définit */
  line: Line
  /** Point par lequel passe cette droite */
  point: Point
  constructor (figure: Figure, { line, point, ...options }: OptionsLinePerpendicular) {
    const vector = figure.create('VectorPerpendicular', { origin: point, line, isChild: true, isSelectable: true, isVisible: false })
    super(figure, { point, vector, ...options })
    this.type = 'LinePerpendicular'
    this.line = line
    this.point = point
  }

  toJSON (): object {
    return {
      type: this.type,
      id: this.id,
      isChild: this.isChild,
      idLine: this.line.id,
      idPoint: this.point.id,
      color: this.color,
      thickness: this.thickness,
      isDashed: this.isDashed
    }
  }
}

export default LinePerpendicular
