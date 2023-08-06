import Figure from '../../Figure'
import Element2D from '../Element2D'
import { OptionsElement2D } from '../interfaces'
import Circle from '../lines/Circle'
import Segment from '../lines/Segment'
import Point from '../points/Point'

class ElementByTranslationByPoints extends Element2D {
  origin: Point | Circle | Segment
  point1: Point
  point2: Point
  constructor (figure: Figure, { origin, point1, point2, ...options }: { origin: Point | Circle | Segment, point1: Point, point2: Point } & OptionsElement2D) {
    super(figure, options)
    this.type = 'ElementByTranslationByPoints'
    this.origin = origin
    this.point1 = point1
    this.point2 = point2
    origin.translateByPoints({ point1, point2 })
  }

  toJSON (): object {
    return {
      ...this.jsonOptions(),
      idOrigin: this.origin.id,
      idPoint1: this.point1.id,
      idPoint2: this.point2.id
    }
  }
}

export default ElementByTranslationByPoints
