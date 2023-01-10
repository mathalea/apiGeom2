import { ApiGeom } from '../ApiGeom'
import { Point } from '../elements/Points/Point'
import { DynamicNumber } from './DynamicNumber'

export class Distance extends DynamicNumber {
  /** id du premier point */
  idPoint1: string
  /** id du deuxième point */
  idPoint2: string
  /** Pointeur vers la première extrémité */
  point1: Point
  /** Pointeur vers la deuxième extrémité */
  point2: Point
  constructor (apiGeom: ApiGeom, point1: string | Point, point2: string | Point, hasToBeSaved = true) {
    super(apiGeom, hasToBeSaved)
    this.type = 'Distance'
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
    try {
      this.value = Math.hypot(this.point1.x - this.point2.x, this.point1.y - this.point2.y)
    } catch (error) {
      console.log('Erreur dans Distance.update()', error)
      // this.exist = false
    }
    this.notify()
  }

  toJSON (): object {
    return {
      type: this.type,
      id: this.id,
      idPoint1: this.idPoint1,
      idPoint2: this.idPoint2
    }
  }
}
