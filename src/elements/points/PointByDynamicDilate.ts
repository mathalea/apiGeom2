import DynamicNumber from 'dynamicNumbers/DynamicNumber'
import { OptionsPointBy } from 'elements/interfaces'
import Figure from '../../Figure'
import Point from './Point'
import PointByDilate from './PointByDilate'

class PointByDynamicDilate extends PointByDilate {
  dynamicK: DynamicNumber
  constructor (figure: Figure, { origin, center, dynamicK, ...options }: { origin: Point, center: Point, dynamicK: DynamicNumber } & OptionsPointBy) {
    super(figure, { origin, center, k: dynamicK.value, ...options })
    this.dynamicK = dynamicK
    this.dynamicK.subscribe(this)
  }

  update (): void {
    this.k = this.dynamicK.value
    super.update()
  }
}

export default PointByDynamicDilate
