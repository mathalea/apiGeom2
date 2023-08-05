import type Figure from '../../Figure'
import type DynamicNumber from '../../dynamicNumbers/DynamicNumber'
import TextByPosition from './TextByPosition'
import { type OptionsDynamicText } from '../interfaces'
import { displayDigits } from '../defaultValues'
import { round } from '../../lib/format'

/**
 * Créé un div contenant un texte qui est mis au dessus du svg
 * par défaut KaTeX s'occupe du rendu du div
 */
class TextDynamicByPosition extends TextByPosition {
  private readonly dynamicNumber: DynamicNumber
  textBefore: string
  textAfter: string
  minimumFractionDigits: number
  maximumFractionDigits: number

  constructor (figure: Figure, { x, y, dynamicNumber, textBefore = '', textAfter = '', color = 'black', isChild = false, minimumFractionDigits = 0, maximumFractionDigits = displayDigits }: OptionsDynamicText) {
    const value = textBefore + Intl.NumberFormat('fr-FR', { maximumFractionDigits, minimumFractionDigits }).format(dynamicNumber.value) + textAfter
    super(figure, { x, y, text: value, color, isChild })
    this.type = 'TextDynamicByPosition'
    this.dynamicNumber = dynamicNumber
    this.textBefore = textBefore
    this.textAfter = textAfter
    this.minimumFractionDigits = minimumFractionDigits
    this.maximumFractionDigits = maximumFractionDigits
    dynamicNumber.subscribe(this)
  }

  update (): void {
    this.text = this.textBefore + Intl.NumberFormat('fr-FR', { maximumFractionDigits: this.maximumFractionDigits, minimumFractionDigits: this.minimumFractionDigits }).format(this.dynamicNumber.value) + this.textAfter
  }

  toJSON (): object {
    return {
      ...this.jsonOptions(),
      x: round(this.x),
      y: round(this.y),
      idDynamicNumber: this.dynamicNumber.id,
      textBefore: this.textBefore,
      textAfter: this.textAfter,
      minimumFractionDigits: this.minimumFractionDigits,
      maximumFractionDigits: this.maximumFractionDigits
    }
  }
}

export default TextDynamicByPosition
