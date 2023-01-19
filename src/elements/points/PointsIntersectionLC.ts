import Figure from '../../Figure'
import Element2D from '../Element2D'
import { OptionsIntersectionLC } from '../interfaces'
import Circle from '../lines/Circle'
import Line from '../lines/Line'
import Point from './Point'

class PointsIntersectionLC extends Element2D {
  /** Droite ou segment ou demi-droite */
  line: Line
  /** Deuxième cercle */
  circle: Circle
  /** Point d'intersection avec la plus grande ordonnée */
  point1: Point
  /** Point d'intersection avec la plus petite ordonnée */
  point2: Point
  shape?: '' | 'x' | 'o'
  size?: number
  constructor (figure: Figure, { line, circle, shape, size, ...options }: OptionsIntersectionLC) {
    super(figure, options)
    this.type = 'PointsIntersectionLC'
    this.point1 = figure.create('PointIntersectionLC', { line, circle, n: 1, isChild: true, shape, size, ...options })
    this.point2 = figure.create('PointIntersectionLC', { line, circle, n: 2, isChild: true, shape, size, ...options })
    this.line = line
    this.circle = circle
    this.shape = shape
    this.size = size
  }

  draw (): void {
    this.point1.draw()
    this.point2.draw()
  }

  toJSON (): object {
    return {
      idLine: this.line.id,
      idCircle: this.circle.id,
      shape: this.shape,
      size: this.size,
      ...super.toJSON()
    }
  }
}

export default PointsIntersectionLC
