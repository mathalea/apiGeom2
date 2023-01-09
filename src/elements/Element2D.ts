import { ApiGeom } from '../ApiGeom'
import { DynamicNumber } from '../dynamicNumbers/DynamicNumber'
import { optionsElement2D } from './interfaces'

export class Element2D {
  /** Espace de travail dans lequel l'élément sera représenté */
  apiGeom: ApiGeom
  /** Type d'objet mathématique */
  type!: '' | 'Point' | 'Segment' | 'TextByPosition' | 'TextByPoint' | 'Line' | 'Ray' | 'Circle' | 'DisplayDistance'
  /** Identifiant de l'objet qui servira de clé dans le Map de tous les éléments */
  readonly id: string
  /** Groupe SVG dans lequel sera déssiné l'élément */
  groupSvg: SVGElement
  /** Couleur de l'élément au format HTML */
  protected _color: string
  /** Épaisseur du tracé de l'élément */
  protected _thickness: number
  /** Liste des enfants à notifier à chaque fois que l'élément est déplacé */
  observers: Array<Element2D | DynamicNumber>
  /** Permet de ne pas sauvegarder des objets secondaires qui seront reconstruits (label d'un point, codage d'une figure...) */
  private readonly hasToBeSaved: boolean
  constructor (apiGeom: ApiGeom, options?: optionsElement2D) {
    this.apiGeom = apiGeom
    if (options === undefined || options?.id === undefined) {
      this.id = 'api' + (this.apiGeom.elements.size + 1).toString()
    } else if (this.apiGeom.elements.has(options?.id)) {
      console.log(`The id ${options.id} is already used !`)
      this.id = options.id + '__' + self.crypto.randomUUID()
    } else {
      this.id = options.id
    }
    this.hasToBeSaved = (options?.hasToBeSaved) ?? true
    if (this.hasToBeSaved) this.apiGeom.elements.set(this.id, this)
    this._color = options?.color ?? 'black'
    this._thickness = options?.thickness ?? 1
    this.groupSvg = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    this.observers = []
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

  /** Créé ou met à jour le groupe SVG de l'élément */
  update (): void {}

  /** Personnalise la sortie JSON de l'élément pour la sauvegarde */
  toJSON (): object {
    return {
      type: this.type,
      id: this.id,
      color: this.color,
      thickness: this.thickness
    }
  }

  /** Génère le code LaTeX de l'élément */
  latex (): string {
    return ''
  }

  /** Couleur au format HTML */
  get color (): string {
    return this._color
  }

  /** Change la couleur des tracés de l'élément */
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

  /** Épaisseur des tracés */
  get thickness (): number {
    return this._thickness
  }

  /** Change l'épaisseur des tracés */
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

  /** Modifie la couleur et l'épaisseur de l'élément */
  setColorAndThickness (): void {
    this.color = this._color
    this.thickness = this._thickness
  }
}
