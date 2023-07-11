import type Figure from '../Figure'
import type Element2D from '../elements/Element2D'
import type TextDynamicByPosition from '../elements/text/TextDynamicByPosition'
import { type OptionsDynamicNumber } from '../elements/interfaces'

/**
 * Pour les valeurs numériques variables qui seront les « parents » de constructions
 */
abstract class DynamicNumber {
  figure: Figure
  readonly id: string
  protected _value: number
  observers: Array<Element2D | DynamicNumber>
  type: string
  isChild: boolean
  textBefore: string
  textAfter: string
  constructor (figure: Figure, { isChild = false, textBefore = '', textAfter = '' }: OptionsDynamicNumber) {
    this.figure = figure
    this.isChild = isChild
    if (this.isChild) {
      let cpt = 0
      while (this.figure.elements.has('elementTmp' + cpt.toString())) {
        cpt++
      }
      this.id = 'elementTmp' + cpt.toString()
    } else {
      let cpt = 0
      while (this.figure.elements.has('element' + cpt.toString())) {
        cpt++
      }
      this.id = 'element' + (cpt).toString()
    }
    this.figure.elements.set(this.id, this)
    this.observers = []
    this._value = NaN
    this.type = ''
    this.textBefore = textBefore
    this.textAfter = textAfter
  }

  draw (): void {}

  set value (x: number) {
    this._value = x
    this.notify()
  }

  get value (): number {
    return this._value
  }

  get string (): string {
    return this.textBefore + this.value.toString() + this.textAfter
  }

  update (): void {
    this.notify()
  }

  /** S'abonner aux modifications des éléments parents
  * Par exemple le segment s'abonnera aux modifications de ses deux extrémités
  */
  subscribe (element: Element2D | DynamicNumber): void {
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

  remove (): void {
    this.figure.elements.delete(this.id)
    for (const element of this.observers) {
      element.remove()
    }
  }

  /** Personnalise la sortie JSON de l'élément pour la sauvegarde */
  toJSON (): object {
    return {
      type: this.type,
      id: this.id,
      isChild: this.isChild
    }
  }

  display ({ x, y, textBefore = '', textAfter = '', color, minimumFractionDigits, maximumFractionDigits }: { x: number, y: number, textBefore?: string, textAfter?: string, color?: string, minimumFractionDigits?: number, maximumFractionDigits?: number }): TextDynamicByPosition {
    return this.figure.create('TextDynamicByPosition', { x, y, dynamicNumber: this, color, textBefore, textAfter, minimumFractionDigits, maximumFractionDigits, id: this.id + '_display' })
  }
}

export default DynamicNumber
