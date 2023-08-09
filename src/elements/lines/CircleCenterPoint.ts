import type Figure from '../../Figure'
import Distance from '../../dynamicNumbers/Distance'
import type { OptionsElement2D } from '../interfaces'
import type Point from '../points/Point'
import CircleCenterDynamicRadius from './CircleCenterDyamicRadius'

/**
 * Trace un cercle défini par un centre et une distance dynamique
 * Cela servira au report de longueur ou pour tracer un cercle dont le rayon est géré par un curseur
 */
class CircleCenterPoint extends CircleCenterDynamicRadius {
  point: Point
  constructor (figure: Figure, { center, point, ...options }: { center: Point, point: Point } & OptionsElement2D) {
    const radius = new Distance(figure, { point1: center, point2: point, isChild: true })
    super(figure, { center, radius, ...options })
    this.type = 'CircleCenterPoint'
    this.point = point
    this.point.subscribe(this)
  }

  translateByPoints ({ point1, point2, ...options }: { point1: Point, point2: Point } & OptionsElement2D): CircleCenterPoint {
    const newCenter = this.figure.create('PointByTranslationByPoints', { point1, point2, origin: this.center, isChild: true })
    const newPoint = this.figure.create('PointByTranslationByPoints', { point1, point2, origin: this.point, isChild: true })
    const result = this.figure.create('CircleCenterPoint', { center: newCenter, point: newPoint, isChild: true, ...options })
    return result
  }

  toJSON (): object {
    return {
      ...this.jsonOptions(),
      idCenter: this.center.id,
      idPoint: this.point.id,
      fillColor: this.fillColor,
      fillOpacity: this.fillOpacity
    }
  }

  get description (): string {
    const centerName = this.center.label !== '' ? this.center.label : this.center.id
    const pointName = this.point.label !== '' ? this.point.label : this.point.id
    return `Cercle de centre ${centerName} et passant par le point ${pointName}`
  }
}

export default CircleCenterPoint
