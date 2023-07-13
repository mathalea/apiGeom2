import type Figure from '../Figure'
import type DynamicNumber from '../dynamicNumbers/DynamicNumber'
import { defaultThickness } from './defaultValues'
import { type OptionsElement2D, type typeElement2D } from './interfaces'

class Element2D {
  /** Espace de travail dans lequel l'élément sera représenté */
  figure: Figure
  /** Type d'objet mathématique */
  type!: typeElement2D
  /** Identifiant de l'objet qui servira de clé dans le Map de tous les éléments */
  readonly id: string
  /** Groupe SVG dans lequel sera déssiné l'élément */
  groupSvg: SVGElement
  /** Couleur de l'élément au format HTML */
  protected _color: string
  /** Épaisseur du tracé de l'élément */
  protected _thickness: number
  /** Tracé en pointillés ? */
  protected _isDashed: boolean
  /** Visible ? */
  protected _isVisible: boolean
  /** Liste des enfants à notifier à chaque fois que l'élément est déplacé */
  observers: Array<Element2D | DynamicNumber>
  /** Les élément qui ont isChild à true sont ceux qui sont construits par d'autres et qui n'ont pas */
  readonly isChild: boolean
  constructor (figure: Figure, { id, color, thickness, isDashed, isChild, isVisible }: OptionsElement2D) {
    this.figure = figure
    this.isChild = (isChild) ?? false
    /** Certains éléments sont construits par d'autres (codages, points temporaires, labels...)
     *  on les nomme elementTmpX, on met this.child à true et on ne les sauvegarde pas dans le Json
     *  mais ils sont bien présents dans figure.elements
    */
    if (id == null || this.figure.elements.has(id)) {
      if (id != null && this.figure.elements.has(id)) throw Error(`id ${id} déjà utilisé`)
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
    } else {
      this.id = id
    }
    this.figure.elements.set(this.id, this)
    this._color = color ?? 'black'
    this._thickness = thickness ?? defaultThickness
    this._isDashed = isDashed ?? false
    this._isVisible = isVisible ?? true
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

  remove (): void {
    this.figure.elements.delete(this.id)
    this.groupSvg.remove()
    for (const element of this.observers) {
      element.remove()
    }
  }

  /** Créé ou met à jour le groupe SVG de l'élément */
  update (): void {}

  draw (): void {}

  /** Personnalise la sortie JSON de l'élément pour la sauvegarde */
  toJSON (): object {
    return {
      type: this.type,
      id: this.id,
      isChild: this.isChild,
      color: this.color,
      thickness: this.thickness,
      isDashed: this.isDashed,
      isVisible: this.isVisible
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

  /** Pointillés */
  get isDashed (): boolean {
    return this._isDashed
  }

  set isDashed (isDashed) {
    if (isDashed) {
      this.groupSvg.setAttribute('stroke-dasharray', '4 3')
    } else {
      this.groupSvg.removeAttribute('stroke-dasharray')
    }
    this._isDashed = isDashed
  }

  /** Est-il visible ? Le groupe SVG est-il dans le code SVG ? */
  get isVisible (): boolean {
    return this._isVisible
  }

  set isVisible (isVisible) {
    if (isVisible) {
      this.figure.svg.appendChild(this.groupSvg)
    } else {
      this.groupSvg.remove()
    }
    this._isVisible = isVisible
  }

  /** Modifie la couleur et l'épaisseur de l'élément */
  setVisibilityColorThicknessAndDashed (): void {
    this.isVisible = this._isVisible
    this.color = this._color
    this.thickness = this._thickness
    this.isDashed = this._isDashed
  }
}

export default Element2D
