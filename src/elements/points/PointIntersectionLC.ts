import type Figure from '../../Figure'
import { intersectionLCCoord } from '../calculus/Coords'
import { type OptionsIntersectionLC } from '../interfaces'
import type Circle from '../lines/Circle'
import type Line from '../lines/Line'
import Point from './Point'

/**
 * Créé les points à l'intersection de deux cercles
 */
export class PointIntersectionLC extends Point {
  /** Premier cercle */
  line: Line
  /** Deuxième cercle */
  circle: Circle
  /** Numéro de l'intersection */
  n: 1 | 2
  constructor (figure: Figure, { circle, line, n, ...options }: OptionsIntersectionLC) {
    const coords = intersectionLCCoord(line, circle, n)
    super(figure, { x: coords.x, y: coords.y, isFree: false, ...options })
    this.type = 'PointIntersectionLC'
    this.line = line
    this.circle = circle
    this.n = n ?? 1
    this.line.subscribe(this)
    this.circle.subscribe(this)
  }

  update (): void {
    if (this.line === undefined || this.circle === undefined) return
    try {
      const { x, y } = intersectionLCCoord(this.line, this.circle, this.n)
      this._x = x
      this._y = y
      if (!this.isOnline(this.line)) {
        this._x = NaN
        this._y = NaN
      }
      super.update()
    } catch (error) {
      console.error('Erreur dans PointIntersectionLL.update()', error)
    }
    this.notify()
  }

  toJSON (): object {
    return {
      ...this.jsonOptions(),
      idLine: this.line.id,
      idCircle: this.circle.id,
      n: this.n,
      shape: this.shape,
      label: this.label
    }
  }

  get description (): string {
    const lineName = this.line.notation
    const circleName = this.circle.id
    return `Intersection de la droite $${lineName}$ et du cercle $${circleName}$`
  }
}

export default PointIntersectionLC
