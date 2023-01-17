import Figure from '../Figure'
import Element2D from '../elements/Element2D'
import TextDynamicByPosition from '../elements/text/TextDynamicByPosition'
import { OptionsDynamicNumber } from '../elements/interfaces'

/**
 * Pour les valeurs numériques variables qui seront les « parents » de constructions
 */
abstract class DynamicNumber {
  figure: Figure
  readonly id: string
  private _value: number
  observers: Array<Element2D | DynamicNumber>
  type: string
  isChild: boolean
  textBefore: string
  textAfter: string
  constructor (figure: Figure, { isChild = false, textBefore = '', textAfter = '' }: OptionsDynamicNumber) {
    this.figure = figure
    this.id = 'api' + (this.figure.elements.size + 1).toString()
    this.observers = []
    this._value = NaN
    this.type = ''
    this.textBefore = textBefore
    this.textAfter = textAfter
    this.isChild = isChild
    if (this.isChild) this.figure.elements.set(this.id, this)
  }

  draw (): void {}

  set value (x: number) {
    this._value = x
  }

  get value (): number {
    return this._value
  }

  get string (): string {
    return this.textBefore + this.value.toString() + this.textAfter
  }

  abstract update (): void

  /** S'abonner aux modifications des éléments parents
  * Par exemple le segment s'abonnera aux modifications de ses deux extrémités
  */
  subscribe (element: Element2D): void {
    this.observers.push(element)
  }

  /**
   * Annuler l'abonnement
   */
  unsubscribe (element: Element2D): void {
    this.observers = this.observers.filter(observer => observer !== element)
  }

  /** Prévenir les enfants qu'ils doivent se mettre à jour */
  notify (): void {
    for (const element of this.observers) {
      element.update()
    }
  }

  display ({ x, y, textBefore = '', textAfter = '', isLatex, color, minimumFractionDigits, maximumFractionDigits }: { x: number, y: number, textBefore?: string, textAfter?: string, isLatex?: boolean, color?: string, minimumFractionDigits?: number, maximumFractionDigits?: number }): TextDynamicByPosition {
    return this.figure.create('TextDynamicByPosition', { x, y, dynamicNumber: this, color, isLatex, textBefore, textAfter, minimumFractionDigits, maximumFractionDigits })
  }
}

export default DynamicNumber
