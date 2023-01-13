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
  point: string | Point
  idPoint: string
  constructor (figure: Figure, { center, point, ...options }: OptionsCircleCenterPoint) {
    const radius = new Distance(figure, center, point, false)
    super(figure, { center, radius, ...options })
    this.type = 'CircleCenterPoint'
    this.point = point
    this.idPoint = point.id
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

export default CircleCenterPoint