import type Figure from '../../Figure'
import { type OptionsLineParallel } from '../interfaces'
import type Point from '../points/Point'
import type Line from './Line'
import LineByPointVector from './LineByPointVector'

class LineParallel extends LineByPointVector {
  /** Droite parallèle qui la définit */
  line: Line
  /** Point par lequel passe cette droite */
  point: Point
  constructor (figure: Figure, { line, point, ...options }: OptionsLineParallel) {
    const vector = figure.create('VectorByPoints', { point1: line.point1, point2: line.point2, origin: point, isChild: true, isSelectable: true, isVisible: false })
    super(figure, { point, vector, ...options })
    this.type = 'LineParallel'
    this.line = line
    this.point = point
    this.point.subscribe(this)
    this.line.subscribe(this)
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
    return `Droite parallèle à $${this.line.notation}$ et passant par le point $${pointName}$`
  }
}

export default LineParallel
