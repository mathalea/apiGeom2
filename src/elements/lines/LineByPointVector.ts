import { type OptionsElement2D } from '../interfaces'
import type Point from '../points/Point'
import type Vector from '../vector/Vector'
import type Figure from '../../Figure'
import Line from './Line'

class LineByPointVector extends Line {
  point: Point
  vector: Vector
  constructor (figure: Figure, { point, vector, ...options }: { point: Point, vector: Vector } & OptionsElement2D) {
    const point2 = figure.create('PointByTranslation', { origin: point, vector, isVisible: false, shape: point.shape, isChild: true, isSelectable: true })
    super(figure, { point1: point, point2, shape: '', ...options })
    this.type = 'LineByPointVector'
    this.point = point
    this.vector = vector
  }

  toJSON (): object {
    return {
      ...this.jsonOptions(),
      idPoint: this.point.id,
      idVector: this.vector.id
    }
  }
}

export default LineByPointVector
