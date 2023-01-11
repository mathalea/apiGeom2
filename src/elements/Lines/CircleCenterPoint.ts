import { ApiGeom } from '../../ApiGeom'
import { Distance } from '../../dynamicNumbers/Distance'
import { optionsElement2D } from '../interfaces'
import { Point } from '../points/Point'
import { CircleCenterDynamicRadius } from './CircleCenterDyamicRadius'

/**
 * Trace un cercle défini par un centre et une distance dynamique
 * Cela servira au report de longueur ou pour tracer un cercle dont le rayon est géré par un curseur
 */
export class CircleCenterPoint extends CircleCenterDynamicRadius {
  point: string | Point
  idPoint: string
  constructor (apiGeom: ApiGeom, center: string | Point, point: string | Point, options?: optionsElement2D) {
    const radius = new Distance(apiGeom, center, point, false)
    super(apiGeom, center, radius, options)
    this.type = 'CircleCenterPoint'
    if (typeof point === 'string') {
      this.idPoint = point
      if (this.apiGeom.elements.has(this.idPoint)) this.point = this.apiGeom.elements.get(this.idPoint) as Point
      else throw new Error(`Point '${this.idPoint}' does not exist`)
    } else {
      this.point = point
      this.idPoint = point.id
    }
    this.point.subscribe(this)
  }

  toJSON (): object {
    return {
      type: this.type,
      idCenter: this.idCenter,
      idPoint: this.idPoint,
      ...super.toJSON()
    }
  }
}
