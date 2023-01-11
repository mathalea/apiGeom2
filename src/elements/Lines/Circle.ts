import { ApiGeom } from '../../ApiGeom'
import { Element2D } from '../Element2D'
import { optionsElement2D } from '../interfaces'
import { Point } from '../points/Point'

/**
 * Trace un cercle dont on connait le centre et le rayon
 */
export class Circle extends Element2D {
  /** id de la première extrémité */
  idCenter: string
  /** Rayon du cercle */
  private _radius: number
  /** Couleur de remplissage du cercle */
  private _fillColor: string | 'none'
  /** Opacité de remplissage entre 0 et 1 */
  private _fillOpacity?: number
  /** Pointeur vers la première extrémité */
  center: Point
  constructor (apiGeom: ApiGeom, center: string | Point, radius: number, options?: optionsElement2D) {
    super(apiGeom, options)
    this.type = 'Circle'
    this._radius = radius
    if (typeof center === 'string') {
      this.idCenter = center
      if (this.apiGeom.elements.has(this.idCenter)) this.center = this.apiGeom.elements.get(this.idCenter) as Point
      else throw new Error(`Point '${this.idCenter}' does not exist`)
    } else {
      this.center = center
      this.idCenter = center.id
    }
    if (options?.fillColor !== undefined) this._fillColor = options.fillColor
    else this._fillColor = 'none'
    if (options?.fillOpacity !== undefined) this._fillOpacity = options.fillOpacity
    if (options?.isDashed !== undefined) this._isDashed = options.isDashed
    this.groupSvg = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    this.center.subscribe(this)
    this.apiGeom.svg.appendChild(this.groupSvg)
    this.update()
    this.setColorThicknessAndDashed()
  }

  get radius (): number {
    return this._radius
  }

  set radius (radius: number) {
    this._radius = radius
    this.update()
  }

  /** Couleur au format HTML */
  get color (): string {
    return this._color
  }

  /** Change la couleur des tracés de l'élément */
  set color (color: string) {
    this._color = color
    this.groupSvg.setAttribute('stroke', color)
  }

  /** Couleur de remplissage au format HTML */
  get fillColor (): string {
    return this._fillColor
  }

  /** Change la couleur des tracés de l'élément */
  set fillColor (color: string) {
    this._fillColor = color
    this.groupSvg.setAttribute('fill', this._fillColor)
  }

  /** Couleur de remplissage au format HTML */
  get fillOpacity (): number | undefined {
    return this._fillOpacity
  }

  /** Change la couleur des tracés de l'élément */
  set fillOpacity (opacity: number | undefined) {
    this._fillOpacity = opacity
    if (opacity !== undefined) this.groupSvg.setAttribute('fill-opacity', opacity.toString())
  }

  /** Modifie la couleur et l'épaisseur de l'élément */
  setColorThicknessAndDashed (): void {
    this.color = this._color
    this.fillColor = this._fillColor
    if (this._fillOpacity !== undefined) this.fillOpacity = this._fillOpacity
    if (this._isDashed !== undefined) this.isDashed = this._isDashed
    this.isDashed = this._isDashed
  }

  update (): void {
    if (this.center.x === undefined || this.center.y === undefined || Number.isNaN(this.center.x) || Number.isNaN(this.center.y)) {
      this.groupSvg.removeAttribute('r')
    } else {
      const xSvg = this.apiGeom.xToSx(this.center.x)
      const ySvg = this.apiGeom.yToSy(this.center.y)
      const rSvg = this.apiGeom.pixelsPerUnit * this._radius
      this.groupSvg.setAttribute('cx', `${xSvg}`)
      this.groupSvg.setAttribute('cy', `${ySvg}`)
      this.groupSvg.setAttribute('r', `${rSvg}`)
    }
    this.notify()
  }

  toJSON (): object {
    return {
      type: this.type,
      idCenter: this.idCenter,
      radius: this._radius,
      fillColor: this.fillColor,
      fillOpacity: this.fillOpacity,
      ...super.toJSON()
    }
  }
}
