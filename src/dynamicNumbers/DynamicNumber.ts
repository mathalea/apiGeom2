import { ApiGeom } from '../ApiGeom'
import { Element2D } from '../elements/Element2D'

/**
 * Pour les valeurs numériques variables qui seront les « parents » de constructions
 */
export abstract class DynamicNumber {
  apiGeom: ApiGeom
  readonly id: string
  private _value: number
  observers: Array<Element2D | DynamicNumber>
  type: string
  hasToBeSaved: boolean
  constructor (apiGeom: ApiGeom, hasToBeSaved = true) {
    this.apiGeom = apiGeom
    this.id = 'api' + (this.apiGeom.elements.size + 1).toString()
    this.observers = []
    this._value = 0
    this.type = ''
    this.hasToBeSaved = hasToBeSaved
    if (this.hasToBeSaved) this.apiGeom.elements.set(this.id, this)
  }

  set value (x: number) {
    this._value = x
  }

  get value (): number {
    return this._value
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
}
