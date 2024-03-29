import type Figure from '../../Figure'
import { intersectionLLCoord } from '../calculus/Coords'
import { type OptionsIntersectionLL } from '../interfaces'
import type Segment from '../lines/Segment'
import Point from './Point'

/**
 * Créé un point à l'intersection de deux droites (demi-droites ou segments)
 * Masque le point et ses descendances s'il n'y a pas d'intersection
 */
export class PointIntersectionLL extends Point {
  /** Première droite */
  line1: Segment
  /** Deuxième droite */
  line2: Segment
  constructor (figure: Figure, { line1, line2, ...options }: OptionsIntersectionLL) {
    const coords = intersectionLLCoord(line1, line2)
    super(figure, { x: coords.x, y: coords.y, isFree: false, ...options })
    this.type = 'PointIntersectionLL'
    this.line1 = line1
    this.line2 = line2
    this.line1.subscribe(this)
    this.line2.subscribe(this)
  }

  update (): void {
    if (this.line1 === undefined || this.line2 === undefined) return
    try {
      const coords = intersectionLLCoord(this.line1, this.line2)
      this._x = coords.x
      this._y = coords.y
      super.update()
    } catch (error) {
      console.error('Erreur dans PointIntersectionLL.update()', error)
    }
    this.notify()
  }

  toJSON (): object {
    return {
      ...this.jsonOptions(),
      idLine1: this.line1.id,
      idLine2: this.line2.id,
      shape: this.shape,
      sizeInPixels: this.sizeInPixels,
      label: this.label
    }
  }

  get description (): string {
    const line1Name = this.line1.notation
    const line2Name = this.line2.notation
    return `Intersection de la droite $${line1Name}$ et de la droite $${line2Name}$`
  }
}

export default PointIntersectionLL
