import { ApiGeom } from '../ApiGeom'
import { optionsElement2D } from './interfaces'

export class Element2D {
  apiGeom: ApiGeom
  type: string
  name: string
  groupSvg: SVGElement
  protected _color: string
  protected _thickness: number
  observers: Element2D[] // Liste des enfants à prévenir à chaque fois que l'on ai modifié
  constructor (apiGeom: ApiGeom, options?: optionsElement2D) {
    this.apiGeom = apiGeom
    if (options === undefined || options?.name === undefined) {
      this.name = 'api' + (this.apiGeom.elements.size + 1).toString()
    } else if (this.apiGeom.elements.has(options?.name)) {
      console.log(`The name ${options.name} is already used !`)
      this.name = options.name + '__' + self.crypto.randomUUID()
    } else {
      this.name = options.name
    }
    this.apiGeom.elements.set(this.name, this)
    this._color = options?.color ?? 'black'
    this._thickness = options?.thickness ?? 1
    this.type = ''
    this.groupSvg = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    this.observers = []
  }

  // S'abonner aux modifications des éléments parents
  subscribe (element: Element2D): void {
    this.observers.push(element)
  }

  unsubscribe (element: Element2D): void {
    this.observers = this.observers.filter(observer => observer !== element)
  }

  // Prévenir les enfants qu'ils doivent se mettre à jour
  notify (): void {
    for (const element of this.observers) {
      element.draw()
    }
  }

  draw (): void {}

  toJSON (): object {
    return {
      type: this.type,
      name: this.name,
      color: this.color,
      thickness: this.thickness
    }
  }

  latex (): string {
    return ''
  }

  get color (): string {
    return this._color
  }

  set color (color: string) {
    this._color = color
    if (this.groupSvg.children.length > 0) {
      for (const line of Array.from(this.groupSvg.children)) {
        line.setAttribute('stroke', color)
      }
    } else { // Le segment ou le cercle ne sont pas des groupes, ce sont des éléments uniques sans children
      this.groupSvg.setAttribute('stroke', color)
    }
  }

  get thickness (): number {
    return this._thickness
  }

  set thickness (thickness: number) {
    this._thickness = thickness
    if (this.groupSvg.children.length > 0) {
      for (const line of Array.from(this.groupSvg.children)) {
        line.setAttribute('stroke-width', `${thickness}`)
      }
    } else { // Le segment par exemple n'est pas un groupe mais un élément unique sans children
      this.groupSvg.setAttribute('stroke-width', `${thickness}`)
    }
  }

  setColorAndThickness (): void {
    this.color = this._color
    this.thickness = this._thickness
  }
}
