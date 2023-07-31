import type Figure from '../../Figure'
import type Segment from '../lines/Segment'
import TextByPosition from './TextByPosition'

class MarkSegment extends TextByPosition {
  segment: Segment
  constructor (figure: Figure, { segment, text, color = 'black', fontSize = figure.options.fontSize }: { segment: Segment, text: string, color?: string, fontSize?: string }) {
    const x = (segment.point1.x + segment.point2.x) / 2
    const y = (segment.point1.y + segment.point2.y) / 2
    super(figure, { x, y, text, color, fontSize })
    this.type = 'MarkSegment'
    this._color = color
    this.fontSize = fontSize
    this.segment = segment
    this.segment.subscribe(this)
  }

  update (): void {
    this.x = (this.segment.point1.x + this.segment.point2.x) / 2
    this.y = (this.segment.point1.y + this.segment.point2.y) / 2
    if (this.div !== undefined) {
      this.div.style.transformOrigin = 'center center'
      this.div.style.transformBox = 'fill-box'
      this.div.style.transform = 'translateX(-50%, 0)'
      this.div.style.transform += `rotate(${-this.segment.angleWithHorizontalInDegres}deg)`
    }
    this.notify()
  }
}

export default MarkSegment
