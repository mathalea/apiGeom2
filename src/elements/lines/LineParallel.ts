import Figure from '../../Figure'
import { OptionsLineParallel } from '../interfaces'
import Point from '../points/Point'
import Line from './Line'

class LineParallel extends Line {
  /** Droite parallèle qui la définit */
  line: Line
  /** Point par lequel passe cette droite */
  point: Point
  constructor (figure: Figure, { line, point, ...options }: OptionsLineParallel) {
    const vector = figure.create('VectorByPoints', { point1: line.point1, point2: line.point2, origin: point, isChild: true, isVisible: false })
    const vectorEnd = vector.representation?.point2 as Point
    super(figure, { point1: point, point2: vectorEnd, ...options })
    this.type = 'LineParallel'
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

export default LineParallel
