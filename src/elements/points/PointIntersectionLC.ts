import Figure from '../../Figure'
import { intersectionLCCoord } from '../calculus/Coords'
import { OptionsIntersectionLC } from '../interfaces'
import Circle from '../lines/Circle'
import Line from '../lines/Line'
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
    super(figure, { x: coords.x, y: coords.y, ...options })
    this.type = 'PointIntersectionCC'
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
      console.log('Erreur dans PointIntersectionLL.update()', error)
    }
    this.notify()
  }

  toJSON (): object {
    return {
      type: this.type,
      isChild: this.isChild,
      idLine: this.line.id,
      idCircle: this.circle.id,
      n: this.n,
      id: this.id,
      shape: this.shape,
      label: this.label,
      color: this.color,
      thickness: this.thickness,
      isDashed: this.isDashed,
      isVisible: this.isVisible
    }
  }
}

export default PointIntersectionLC
