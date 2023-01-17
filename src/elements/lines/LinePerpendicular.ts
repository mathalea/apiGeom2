import Figure from '../../Figure'
import { OptionsLinePerpendicular } from '../interfaces'
import Point from '../points/Point'
import Line from './Line'

class LinePerpendicular extends Line {
  /** Droite parallèle qui la définit */
  line: Line
  /** Point par lequel passe cette droite */
  point: Point
  constructor (figure: Figure, { line, point, ...options }: OptionsLinePerpendicular) {
    const vector = figure.create('VectorPerpendicular', { origin: point, line, isChild: true, isVisible: false })
    const vectorEnd = vector.representation?.point2 as Point
    super(figure, { point1: point, point2: vectorEnd, ...options })
    this.type = 'LinePerpendicular'
    this.line = line
    this.point = point
  }

  toJSON (): object {
    return {
      type: this.type,
      isChild: this.isChild,
      idLine: this.line.id,
      idPoint: this.point.id,
      id: this.id,
      color: this.color,
      thickness: this.thickness,
      isDashed: this.isDashed
    }
  }
}

export default LinePerpendicular
