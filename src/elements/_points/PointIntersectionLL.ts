import Figure from '../../Figure'
import { intersectionLLCoord } from '../_calculus/Coords'
import { OptionsIntersectionLL } from '../interfaces'
import Segment from '../_lines/Segment'
import Point from './Point'

/**
 * Créé un point à l'intersection de deux droites (demi-droites ou segments)
 * Masque le point et ses descendances s'il n'y a pas d'intersection
 */
export class PointIntersectionLL extends Point {
  /** id de la première droite */
  idLine1: string
  /** id de la deuxième droite */
  idLine2: string
  /** Première droite */
  line1: Segment
  /** Deuxième droite */
  line2: Segment
  constructor (figure: Figure, { line1, line2, ...options }: OptionsIntersectionLL) {
    super(figure, { x: NaN, y: NaN, ...options })
    this.type = 'PointIntersectionLL'
    this.line1 = line1
    this.idLine1 = line1.id
    this.line2 = line2
    this.idLine2 = line2.id
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
      console.log('Erreur dans PointIntersectionLL.update()', error)
    }
    this.notify()
  }

  toJSON (): object {
    return {
      type: this.type,
      idLine1: this.idLine1,
      idLine2: this.idLine2,
      ...super.toJSON()
    }
  }
}

export default PointIntersectionLL
