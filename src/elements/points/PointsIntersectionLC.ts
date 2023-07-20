import type Figure from '../../Figure'
import Element2D from '../Element2D'
import type { OptionsElement2D } from '../interfaces'
import type Circle from '../lines/Circle'
import type Line from '../lines/Line'
import type Point from './Point'

class PointsIntersectionLC extends Element2D {
  /** Droite ou segment ou demi-droite */
  line: Line
  /** Deuxième cercle */
  circle: Circle
  /** Point d'intersection avec la plus grande ordonnée */
  point1: Point
  /** Point d'intersection avec la plus petite ordonnée */
  point2: Point
  shape: '' | 'x' | 'o'
  sizeInPixels?: number
  constructor (figure: Figure, { line, circle, shape = 'x', sizeInPixels, ...options }: {
    line: Line
    circle: Circle
    shape: 'x' | 'o' | ''
    sizeInPixels: number
  } & OptionsElement2D) {
    super(figure, options)
    this.type = 'PointsIntersectionLC'
    this.point1 = figure.create('PointIntersectionLC', { line, circle, n: 1, isChild: true, shape, sizeInPixels, ...options })
    this.point2 = figure.create('PointIntersectionLC', { line, circle, n: 2, isChild: true, shape, sizeInPixels, ...options })
    this.line = line
    this.circle = circle
    this.shape = shape
    this.sizeInPixels = sizeInPixels
  }

  draw (): void {
    this.point1.draw()
    this.point2.draw()
  }

  toJSON (): object {
    return {
      idLine: this.line.id,
      id: this.id,
      idCircle: this.circle.id,
      shape: this.shape,
      sizeInPixels: this.sizeInPixels,
      ...super.toJSON()
    }
  }
}

export default PointsIntersectionLC
