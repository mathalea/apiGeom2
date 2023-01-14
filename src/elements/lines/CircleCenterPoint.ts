import Figure from '../../Figure'
import Distance from '../../dynamicNumbers/Distance'
import { OptionsCircleCenterPoint } from '../interfaces'
import Point from '../points/Point'
import CircleCenterDynamicRadius from './CircleCenterDyamicRadius'

/**
 * Trace un cercle défini par un centre et une distance dynamique
 * Cela servira au report de longueur ou pour tracer un cercle dont le rayon est géré par un curseur
 */
class CircleCenterPoint extends CircleCenterDynamicRadius {
  point: Point
  constructor (figure: Figure, { center, point, ...options }: OptionsCircleCenterPoint) {
    const radius = new Distance(figure, { point1: center, point2: point, hasToBeSaved: false })
    super(figure, { center, radius, ...options })
    this.type = 'CircleCenterPoint'
    this.point = point
    this.point.subscribe(this)
  }

  toJSON (): object {
    return {
      type: this.type,
      idCenter: this.center.id,
      idPoint: this.point.id,
      ...super.toJSON()
    }
  }
}

export default CircleCenterPoint
