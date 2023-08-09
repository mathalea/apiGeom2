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
      ...this.jsonOptions(),
      idLine: this.line.id,
      idPoint: this.point.id
    }
  }

  get description (): string {
    const pointName = this.point.label !== '' ? this.point.label : this.point.id
    return `Droite perpendiculaire à $${this.line.notation}$ et passant par le point $${pointName}$`
  }
}

export default LinePerpendicular
