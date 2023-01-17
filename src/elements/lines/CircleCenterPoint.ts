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
    const radius = new Distance(figure, { point1: center, point2: point, isChild: false })
    super(figure, { center, radius, ...options })
    this.type = 'CircleCenterPoint'
    this.point = point
    this.point.subscribe(this)
  }

  toJSON (): object {
    return {
      type: this.type,
      isChild: this.isChild,
      idCenter: this.center.id,
      idPoint: this.point.id,
      color: this.color,
      thickness: this.thickness,
      fillColor: this.fillColor,
      fillOpacity: this.fillOpacity,
      isDashed: this.isDashed,
      isVisible: this.isVisible
    }
  }
}

export default CircleCenterPoint
