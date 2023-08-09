import { type OptionsElement2D } from '../interfaces'
import type Figure from '../../Figure'
import PerpendicularBisector from './PerpendicularBisector'
import type Point from '../points/Point'

class PerpendicularBisectorByPoints extends PerpendicularBisector {
  constructor (figure: Figure, { point1, point2, ...options }: { point1: Point, point2: Point } & OptionsElement2D) {
    const segment = figure.create('Segment', { point1, point2, isChild: true, isSelectable: true, isVisible: false })
    super(figure, { segment, ...options })
    this.type = 'PerpendicularBisectorByPoints'
  }

  toJSON (): object {
    return {
      ...this.jsonOptions(),
      idPoint1: this.line.point1.id,
      idPoint2: this.line.point2.id
    }
  }

  get description (): string {
    const point1Name = this.line.point1.label !== '' ? this.line.point1.label : this.line.point1.id
    const point2Name = this.line.point2.label !== '' ? this.line.point2.label : this.line.point2.id
    return `Médiatrice du segment $[${point1Name}${point2Name}]$`
  }
}

export default PerpendicularBisectorByPoints
