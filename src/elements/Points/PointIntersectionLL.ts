import { ApiGeom } from '../../ApiGeom'
import { Coords } from '../Calculus/Coords'
import { optionsPoint } from '../interfaces'
import { Line } from '../Lines/Line'
import { Point } from './Point'

/**
 * Créé un point à l'intersection de deux droites
 */
export class PointIntersectionLL extends Point {
  /** id de la première droite */
  idLine1: string
  /** id de la deuxième droite */
  idLine2: string
  /** Première droite */
  line1: Line
  /** Deuxième droite */
  line2: Line
  constructor (apiGeom: ApiGeom, line1: string | Line, line2: string | Line, options?: optionsPoint) {
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
      if (typeof coords.x === 'number' && typeof coords.y === 'number') {
        this._x = coords.x
        this._y = coords.y
        super.update()
      }
    } catch (error) {
      console.log('Erreur dans PointIntersectionLL.update()', error)
    }
  }

  toJSON (): object {
    return {
      idLine1: this.idLine1,
      idLine2: this.idLine2,
      ...super.toJSON()
    }
  }
}
