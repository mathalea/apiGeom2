import { type OptionsElement2D } from 'elements/interfaces'
import type Figure from '../../Figure'
import LinePerpendicular from './LinePerpendicular'
import type Segment from './Segment'

class PerpendicularBissector extends LinePerpendicular {
  constructor (figure: Figure, { segment, ...options }: { segment: Segment } & OptionsElement2D) {
    const middlePoint = figure.create('Middle', { point1: segment.point1, point2: segment.point2, shape: '', isChild: true })
    super(figure, { line: segment, point: middlePoint, ...options })
    this.type = 'PerpendicularBissector'
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

export default PerpendicularBissector
