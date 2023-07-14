import type Figure from '../Figure'
import type Point from '../elements/points/Point'
import type TextByPosition from '../elements/text/TextByPosition'
import DynamicNumber from './DynamicNumber'

class DynamicY extends DynamicNumber {
  point: Point
  dynamicText: TextByPosition
  constructor (figure: Figure, { point }: { point: Point }) {
    super(figure, {})
    this.point = point
    this.point.subscribe(this)
    this.dynamicText = this.figure.create('TextDynamicByPosition', { x: -1, y: point.y, color: 'blue', dynamicNumber: this, minimumFractionDigits: 0, maximumFractionDigits: 2, textBefore: '', textAfter: '' })
    this.update()
    this.dynamicText.div.style.fontWeight = 'bolder'
  }

  update (): void {
    this.value = this.point.y
    this.dynamicText.y = this.point.y
    if (this.point.x > 0) {
      this.dynamicText.x = -1
    } else {
      this.dynamicText.x = 1
    }
    this.notify()
  }
}

export default DynamicY
