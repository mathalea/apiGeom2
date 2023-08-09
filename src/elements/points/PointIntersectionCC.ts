import type Figure from '../../Figure'
import { intersectionCCCoord } from '../calculus/Coords'
import { type OptionsIntersectionCC } from '../interfaces'
import type Circle from '../lines/Circle'
import Point from './Point'

/**
 * Créé les points à l'intersection de deux cercles
 */
export class PointIntersectionCC extends Point {
  /** Premier cercle */
  circle1: Circle
  /** Deuxième cercle */
  circle2: Circle
  /** Numéro de l'intersection */
  n: 1 | 2
  constructor (figure: Figure, { circle1, circle2, n, isChild, ...options }: OptionsIntersectionCC) {
    const coords = intersectionCCCoord(circle1, circle2, n)
    super(figure, { x: coords.x, y: coords.y, isChild, isFree: false, ...options })
    this.type = 'PointIntersectionCC'
    this.circle1 = circle1
    this.circle2 = circle2
    this.n = n ?? 1
    this.circle1.subscribe(this)
    this.circle2.subscribe(this)
  }

  update (): void {
    if (this.circle1 == null || this.circle2 == null) return
    try {
      const { x, y } = intersectionCCCoord(this.circle1, this.circle2, this.n)
      this._x = x
      this._y = y
      super.update()
    } catch (error) {
      console.error('Erreur dans PointIntersectionLL.update()', error)
    }
    this.notify()
  }

  toJSON (): object {
    return {
      ...this.jsonOptions(),
      idCircle1: this.circle1.id,
      idCircle2: this.circle2.id,
      n: this.n,
      shape: this.shape,
      label: this.label
    }
  }

  get description (): string {
    const circle1Name = this.circle1.id
    const circle2Name = this.circle2.id
    return `Intersection du cercle $${circle1Name}$ et du cercle $${circle2Name}$`
  }
}

export default PointIntersectionCC
