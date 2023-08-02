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
  point1!: Point
  /** Point d'intersection avec la plus petite ordonnée */
  point2!: Point
  shape: '' | 'x' | 'o' | '|'
  sizeInPixels?: number
  constructor (figure: Figure, { circle1, circle2, shape, sizeInPixels, ...options }: OptionsIntersectionCC) {
    super(figure, options)
    this.type = 'PointsIntersectionCC'
    this.circle1 = circle1
    this.circle2 = circle2
    this.shape = shape ?? 'x'
    this.sizeInPixels = sizeInPixels
  }

  draw (): void {
    this.point1 = this.figure.create('PointIntersectionCC', { circle1: this.circle1, circle2: this.circle2, n: 1, isChild: true, id: this.id + '_1', shape: this.shape, sizeInPixels: this.sizeInPixels })
    this.point2 = this.figure.create('PointIntersectionCC', { circle1: this.circle1, circle2: this.circle2, n: 2, isChild: true, id: this.id + '_2', shape: this.shape, sizeInPixels: this.sizeInPixels })
  }

  toJSON (): object {
    return {
      ...this.jsonOptions(),
      idCircle1: this.circle1.id,
      idCircle2: this.circle2.id,
      shape: this.shape,
      sizeInPixels: this.sizeInPixels
    }
  }
}

export default PointsIntersectionCC
