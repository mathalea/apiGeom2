import { type OptionsElement2D } from '../interfaces'
import type Figure from '../../Figure'
import LinePerpendicular from './LinePerpendicular'
import type Segment from './Segment'

class PerpendicularBisector extends LinePerpendicular {
  constructor (figure: Figure, { segment, ...options }: { segment: Segment } & OptionsElement2D) {
    const middlePoint = figure.create('Middle', { point1: segment.point1, point2: segment.point2, shape: '', isChild: true, isSelectable: true, isVisible: false })
    super(figure, { line: segment, point: middlePoint, ...options })
    this.type = 'PerpendicularBisector'
  }

  toJSON (): object {
    return {
      ...this.jsonOptions(),
      idSegment: this.line.id
    }
  }
}

export default PerpendicularBisector
