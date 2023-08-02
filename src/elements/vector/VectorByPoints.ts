import type Figure from '../../Figure'
import { type OptionsVectorByPoints } from '../interfaces'
import type Point from '../points/Point'
import Vector from './Vector'

class VectorByPoints extends Vector {
  /** Premier point pour définir le vecteur */
  point1: Point
  /** Deuxième point pour définir le vecteur */
  point2: Point
  constructor (figure: Figure, { point1, point2, origin, ...options }: OptionsVectorByPoints) {
    const x = point2.x - point1.x
    const y = point2.y - point1.y
    super(figure, { x, y, origin, ...options })
    this.type = 'VectorByPoints'
    this.point1 = point1
    this.point2 = point2
    point1.subscribe(this)
    point2.subscribe(this)
  }

  update (): void {
    this.notify()
    this.x = this.point2.x - this.point1.x
    this.y = this.point2.y - this.point1.y
    if (this.origin !== undefined && this.end !== undefined) {
      this.end.x = this.origin.x + this.x
      this.end.y = this.origin.y + this.y
    }
  }

  toJSON (): object {
    return {
      ...this.jsonOptions(),
      idPoint1: this.point1.id,
      idPoint2: this.point2.id,
      idOrigin: this.origin?.id
    }
  }
}

export default VectorByPoints
