import type Figure from '../../Figure'
import Element2D from '../Element2D'
import { type OptionsIntersectionCC } from '../interfaces'
import type Circle from '../lines/Circle'
import type Point from './Point'

class PointsIntersectionCC extends Element2D {
  /** Premier cercle */
  circle1: Circle
  /** Deuxième cercle */
  circle2: Circle
  /** Point d'intersection avec la plus grande ordonnée */
  point1: Point
  /** Point d'intersection avec la plus petite ordonnée */
  point2: Point
  shape?: '' | 'x' | 'o'
  size?: number
  constructor (figure: Figure, { circle1, circle2, shape, size, ...options }: OptionsIntersectionCC) {
    super(figure, options)
    this.type = 'PointsIntersectionCC'
    this.point1 = figure.create('PointIntersectionCC', { circle1, circle2, n: 1, isChild: true, shape, size, ...options })
    this.point2 = figure.create('PointIntersectionCC', { circle1, circle2, n: 2, isChild: true, shape, size, ...options })
    this.circle1 = circle1
    this.circle2 = circle2
    this.shape = shape
    this.size = size
  }

  draw (): void {
    this.point1.draw()
    this.point2.draw()
  }

  toJSON (): object {
    return {
      idCircle1: this.circle1.id,
      idCircle2: this.circle2.id,
      shape: this.shape,
      size: this.size,
      ...super.toJSON()
    }
  }
}

export default PointsIntersectionCC
