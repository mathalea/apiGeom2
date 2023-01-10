import { ApiGeom } from '../../ApiGeom'
import { optionsPoint } from '../interfaces'
import { Point } from './Point'

export class Middle extends Point {
  /** Première extrémité */
  point1: Point
  /** id de la première extrémité */
  idPoint1: string
  /** Deuxième extrémité */
  point2: Point
  /** id de la deuxième extrémité */
  idPoint2: string
  constructor (apiGeom: ApiGeom, point1: string | Point, point2: string | Point, options?: optionsPoint) {
    super(apiGeom, 1000, 1000, options)
    this.type = 'Middle'
    if (typeof point1 === 'string') {
      this.idPoint1 = point1
      if (this.apiGeom.elements.has(this.idPoint1)) this.point1 = this.apiGeom.elements.get(this.idPoint1) as Point
      else throw new Error(`Point '${this.idPoint1}' does not exist`)
    } else {
      this.point1 = point1
      this.idPoint1 = point1.id
    }
    if (typeof point2 === 'string') {
      this.idPoint2 = point2
      if (this.apiGeom.elements.has(this.idPoint2)) this.point2 = this.apiGeom.elements.get(this.idPoint2) as Point
      else throw new Error(`Point '${this.idPoint2}' does not exist`)
    } else {
      this.point2 = point2
      this.idPoint2 = point2.id
    }
    this.point1.subscribe(this)
    this.point2.subscribe(this)
    this.update()
  }

  update (): void {
    if (this.point1?.x === undefined || this.point2?.x === undefined || this.point1?.y === undefined || this.point2?.y === undefined ||
        Number.isNaN(this.point1.x) || Number.isNaN(this.point1.y) || (Number.isNaN(this.point2.x) || Number.isNaN(this.point2.y))) {
      this._x = NaN
      this._y = NaN
    } else {
      this._x = (this.point1.x + this.point2.x) / 2
      this._y = (this.point1.y + this.point2.y) / 2
    }
    super.update()
    this.notify()
  }

  toJSON (): object {
    return {
      type: this.type,
      idPoint1: this.idPoint1,
      idPoint2: this.idPoint2,
      ...super.toJSON()
    }
  }
}
