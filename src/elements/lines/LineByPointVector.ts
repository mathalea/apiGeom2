import { OptionsElement2D } from 'elements/interfaces'
import Point from 'elements/points/Point'
import Vector from 'elements/vector/Vector'
import Figure from '../../Figure'
import Line from './Line'

class LineByPointVector extends Line {
  point: Point
  vector: Vector
  constructor (figure: Figure, { point, vector, ...options }: { point: Point, vector: Vector } & OptionsElement2D) {
    const point2 = figure.create('PointByTranslation', { origin: point, vector, isVisible: false, isChild: true })
    super(figure, { point1: point, point2, ...options })
    this.type = 'LineByPointVector'
    this.point = point
    this.vector = vector
  }

  toJSON (): object {
    return {
      type: this.type,
      id: this.id,
      idPoint: this.point.id,
      idVector: this.vector.id,
      isChild: this.isChild,
      color: this.color,
      thickness: this.thickness,
      isDashed: this.isDashed
    }
  }
}

export default LineByPointVector
