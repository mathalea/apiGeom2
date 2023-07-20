import type DynamicNumber from '../../dynamicNumbers/DynamicNumber'
import { type OptionsElement2D } from '../interfaces'
import type Figure from '../../Figure'
import type Point from './Point'
import PointByRotation from './PointByRotation'

class PointByDynamicRotation extends PointByRotation {
  dynamicAngle: DynamicNumber
  constructor (figure: Figure, { origin, center, dynamicAngle, shape, label, ...options }: { origin: Point, center: Point, dynamicAngle: DynamicNumber, shape?: 'o' | 'x' | '' } & OptionsElement2D) {
    super(figure, { origin, center, angle: dynamicAngle.value, shape, label, ...options })
    this.type = 'PointByDynamicRotation'
    this.dynamicAngle = dynamicAngle
    this.dynamicAngle.subscribe(this)
  }

  update (): void {
    this.angle = this.dynamicAngle.value
    super.update()
  }

  toJSON (): object {
    return {
      type: this.type,
      idCenter: this.center.id,
      idOrigin: this.origin.id,
      idDynamicAngle: this.dynamicAngle.id,
      id: this.id,
      isChild: this.isChild,
      label: this.label,
      shape: this.shape,
      sizeInPixels: this.sizeInPixels,
      color: this.color,
      isDashed: this.isDashed
    }
  }
}

export default PointByDynamicRotation
