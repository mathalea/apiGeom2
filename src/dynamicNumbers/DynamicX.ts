import type Figure from '../Figure'
import type Point from '../elements/points/Point'
import type TextByPosition from '../elements/text/TextByPosition'
import DynamicNumber from './DynamicNumber'

class DynamicX extends DynamicNumber {
  point: Point
  dynamicText: TextByPosition
  constructor (figure: Figure, { point }: { point: Point }) {
    super(figure, {})
    this.point = point
    this.point.subscribe(this)
    this.dynamicText = this.figure.create('TextDynamicByPosition', { x: point.x, y: -1, color: 'blue', dynamicNumber: this, minimumFractionDigits: 0, maximumFractionDigits: 2, textBefore: '', textAfter: '' })
    this.update()
    this.dynamicText.div.style.fontWeight = 'bolder'
  }

  update (): void {
    this.value = this.point.x
    this.dynamicText.x = this.point.x
    if (this.point.y > 0) {
      this.dynamicText.y = -1
    } else {
      this.dynamicText.y = 1
    }
    this.notify()
  }
}

export default DynamicX
