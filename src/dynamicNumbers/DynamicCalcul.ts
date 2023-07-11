import { type OptionsDynamicNumber } from '../elements/interfaces'
import type Figure from '../Figure'
import DynamicNumber from './DynamicNumber'

class DynamicCalcul extends DynamicNumber {
  dynamicNumbers: DynamicNumber[]
  calculus: (x: number[]) => number
  constructor (figure: Figure, { dynamicNumbers, calculus, ...options }: { dynamicNumbers: DynamicNumber[], calculus: (x: number[]) => number } & OptionsDynamicNumber) {
    super(figure, { ...options })
    this.calculus = calculus
    this.dynamicNumbers = dynamicNumbers
    for (const dynamicNumber of this.dynamicNumbers) {
      dynamicNumber.subscribe(this)
    }
    this.update()
  }

  update (): void {
    const values = []
    for (const dynamicNumber of this.dynamicNumbers) {
      values.push(dynamicNumber.value)
    }
    this._value = this.calculus(values)
    this.notify()
  }
}

export default DynamicCalcul
