import type Figure from '../Figure'
import DynamicNumber from './DynamicNumber'

class Const extends DynamicNumber {
  constructor (figure: Figure, { value, isChild }: { value: number, isChild: boolean }) {
    super(figure, { isChild })
    this.type = 'Const'
    this.value = value
  }

  toJSON (): object {
    return {
      type: this.type,
      id: this.id,
      value: this.value
    }
  }
}

export default Const
