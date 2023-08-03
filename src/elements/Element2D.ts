import type Figure from '../Figure'
import type DynamicNumber from '../dynamicNumbers/DynamicNumber'
import { orangeMathalea } from './defaultValues'
import { type OptionsElement2D, type typeElement2D } from './interfaces'
import type Segment from './lines/Segment'

abstract class Element2D {
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
  /** Est-ce que le pointeur est au dessus de l'élément ? */
  protected _isHover: boolean = false
  /** Est-ce que l'élément est sélectionné ? */
  protected _isSelected: boolean = false
  /** Est-ce qu'un élément est caché ? */
  protected _isHidden: boolean = false
  /** Liste des enfants à notifier à chaque fois que l'élément est déplacé */
  observers: Array<Element2D | DynamicNumber>
  /** Les élément qui ont isChild à true sont ceux qui sont construits par d'autres et qui n'ont pas à être dans la sauvegarde */
  readonly isChild: boolean
  /** Pour l'interface graphique, détermine si un élément apparaitra ou pas dans la liste */
  readonly isSelectable: boolean
  constructor (figure: Figure, { id, color, thickness, isDashed, isChild, isSelectable, isVisible }: OptionsElement2D) {
    this.figure = figure
    this.isChild = (isChild) ?? false
    /** Certains éléments sont construits par d'autres (codages, points temporaires, labels...)
     *  on les nomme elementTmpX, on met this.child à true et on ne les sauvegarde pas dans le Json
     *  mais ils sont bien présents dans figure.elements
    */
    this.isSelectable = isSelectable ?? true
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
        this.id = 'element' + cpt.toString()
      }
    } else {
      this.id = id
    }
    this.figure.elements.set(this.id, this)
    this._color = color ?? this.figure.options.color
    this._thickness = thickness ?? this.figure.options.thickness
    this._isDashed = isDashed ?? this.figure.options.isDashed
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
    const element = this.figure.elements.get(this.id)
    element?.observers.forEach(observer => { observer.remove() })
    if (element !== undefined) this.figure.elements.delete(this.id)
    this.groupSvg.remove()
  }

  temp (): Element2D {
    this.figure.tmpElements.push(this)
    this.color = this.figure.options.tmpColor
    this.thickness = this.figure.options.tmpThickness
    if ('isDashed' in this) this.isDashed = this.figure.options.tmpIsDashed
    if ('fillColor' in this) this.fillColor = this.figure.options.tmpFillColor
    if ('fillOpacity' in this) this.fillOpacity = this.figure.options.tmpFillOpacity
    return this
  }

  /** Créé ou met à jour le groupe SVG de l'élément */
  update (): void {}

  draw (): void {}

  set isHover (isHover: boolean) {
    if (isHover) {
      this.changeColor(this, orangeMathalea)
      changeThickness(this, this._thickness + 2)
    } else if (!this._isSelected) {
      this.changeColor(this, this._color)
      changeThickness(this, this._thickness)
    }
    this._isHover = isHover
  }

  get isHover (): boolean {
    return this._isHover
  }

  set isSelected (isSelected: boolean) {
    if (isSelected) {
      this.changeColor(this, orangeMathalea)
      changeThickness(this, this._thickness + 2)
    } else if (!this._isHover) {
      this.changeColor(this, this._color)
      changeThickness(this, this._thickness)
    }
    this._isSelected = isSelected
  }

  get isSelected (): boolean {
    return this._isSelected
  }

  hide (): void {
    this.isVisible = false
  }

  show (): void {
    this.isVisible = true
  }

  /** Personnalise la sortie JSON de l'élément pour la sauvegarde */
  toJSON (): object {
    return {
      ...this.jsonOptions
    }
  }

  jsonOptions (): object {
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
    const temp = this as unknown
    const segment = temp as Segment
    if (segment?.createdBy !== undefined) {
      const polygon = segment.createdBy
      polygon.color = color
      return
    }
    this._color = color
    this.changeColor(this, color)
  }

  /** Épaisseur des tracés */
  get thickness (): number {
    return this._thickness
  }

  /** Change l'épaisseur des tracés */
  set thickness (thickness: number) {
    changeThickness(this, thickness)
    this._thickness = thickness
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

  distancePointer (_: number, __: number): number {
    return Infinity
  }

  /** Modifie la couleur et l'épaisseur de l'élément */
  setVisibilityColorThicknessAndDashed (): void {
    this.isVisible = this._isVisible
    this.color = this._color
    this.thickness = this._thickness
    this.isDashed = this._isDashed
  }

  changeColor (element: Element2D, color: string): void {
    if (element.groupSvg.children.length > 0) {
      for (const line of Array.from(element.groupSvg.children)) {
        line.setAttribute('stroke', color)
      }
    } else { // Le segment ou le cercle ne sont pas des groupes, ce sont des éléments uniques sans children
      element.groupSvg.setAttribute('stroke', color)
    }
  }
}

function changeThickness (element: Element2D, thickness: number): void {
  if (element.groupSvg.children.length > 0) {
    for (const line of Array.from(element.groupSvg.children)) {
      line.setAttribute('stroke-width', `${thickness}`)
    }
  } else { // Le segment par exemple n'est pas un groupe mais un élément unique sans children
    element.groupSvg.setAttribute('stroke-width', `${thickness}`)
  }
}
export default Element2D
