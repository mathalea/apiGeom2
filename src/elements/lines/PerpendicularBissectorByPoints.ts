import { type OptionsElement2D } from '../interfaces'
import type Figure from '../../Figure'
import PerpendicularBissector from './PerpendicularBissector'
import type Point from '../points/Point'

class PerpendicularBissectorByPoints extends PerpendicularBissector {
  constructor (figure: Figure, { point1, point2, ...options }: { point1: Point, point2: Point } & OptionsElement2D) {
    const segment = figure.create('Segment', { point1, point2, isChild: true, isSelectable: true, isVisible: false })
    super(figure, { segment, ...options })
    this.type = 'PerpendicularBissectorByPoints'
  }

  toJSON (): object {
    return {
      type: this.type,
      id: this.id,
      isChild: this.isChild,
      idSegment: this.line.id,
      color: this.color,
      thickness: this.thickness,
      isDashed: this.isDashed
    }
  }
}

export default PerpendicularBissectorByPoints
