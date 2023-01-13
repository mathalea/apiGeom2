import Figure from '../../Figure'
import DynamicNumber from '../../dynamicNumbers/DynamicNumber'
import TextByPosition from './TextByPosition'
import { OptionsDynamicText } from '../interfaces'
import { displayDigits } from '../defaultValues'

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

  constructor (figure: Figure, { x, y, dynamicNumber, textBefore = '', textAfter = '', isLatex = true, color = 'black', hasToBeSaved = true, minimumFractionDigits = 0, maximumFractionDigits = displayDigits }: OptionsDynamicText) {
    const value = textBefore + Intl.NumberFormat('fr-FR', { maximumFractionDigits, minimumFractionDigits }).format(dynamicNumber.value) + textAfter
    super(figure, { x, y, text: value, isLatex, color, hasToBeSaved })
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
      type: this.type,
      x: this.x,
      y: this.y,
      idDynamicNumber: this.dynamicNumber.id,
      textBefore: this.textBefore,
      textAfter: this.textAfter,
      minimumFractionDigits: this.minimumFractionDigits,
      maximumFractionDigits: this.maximumFractionDigits,
      isLatex: this.isLatex,
      color: this.color
    }
  }
}

export default TextDynamicByPosition
