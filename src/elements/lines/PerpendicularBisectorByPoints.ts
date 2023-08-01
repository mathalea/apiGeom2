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
      type: this.type,
      id: this.id,
      idPoint1: this.line.point1.id,
      idPoint2: this.line.point2.id,
      isChild: this.isChild,
      color: this.color,
      thickness: this.thickness,
      isDashed: this.isDashed
    }
  }
}

export default PerpendicularBisectorByPoints
