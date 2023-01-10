import { ApiGeom } from '../../ApiGeom'
import { Coords } from '../Calculus/Coords'
import { optionsPoint } from '../interfaces'
import { Line } from '../Lines/Line'
import { Segment } from '../Lines/Segment'
import { Point } from './Point'

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
  constructor (apiGeom: ApiGeom, line1: string | Segment, line2: string | Segment, options?: optionsPoint) {
    super(apiGeom, 1000, 1000, options)
    this.type = 'PointIntersectionLL'
    if (typeof line1 === 'string') {
      this.idLine1 = line1
      if (this.apiGeom.elements.has(this.idLine1)) this.line1 = this.apiGeom.elements.get(this.idLine1) as Line
      else throw new Error(`Line '${this.idLine1}' does not exist`)
    } else {
      this.line1 = line1
      this.idLine1 = line1.id
    }
    if (typeof line2 === 'string') {
      this.idLine2 = line2
      if (this.apiGeom.elements.has(this.idLine2)) this.line2 = this.apiGeom.elements.get(this.idLine2) as Line
      else throw new Error(`Line '${this.idLine2}' does not exist`)
    } else {
      this.line2 = line2
      this.idLine2 = line2.id
    }
    this.line1.subscribe(this)
    this.line2.subscribe(this)
    this.update()
  }

  update (): void {
    if (this.line1 === undefined || this.line2 === undefined) return
    try {
      const coords = Coords.intersectionLLCoord(this.line1, this.line2)
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
