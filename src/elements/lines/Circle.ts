import type Figure from '../../Figure'
import Element2D from '../Element2D'
import { distance } from '../calculus/Coords'
import { type OptionsCircle, type OptionsElement2D } from '../interfaces'
import type Point from '../points/Point'
import type Vector from '../vector/Vector'

/**
 * Trace un cercle dont on connait le centre et le rayon
 */
class Circle extends Element2D {
  /** Rayon du cercle */
  _radius: number
  /** Couleur de remplissage du cercle */
  private _fillColor: string | 'none'
  /** Opacité de remplissage entre 0 et 1 */
  private _fillOpacity?: number
  /** Pointeur vers la première extrémité */
  center: Point
  constructor (figure: Figure, { center, radius, ...options }: OptionsCircle) {
    super(figure, options)
    this.type = 'Circle'
    this._radius = radius
    this.center = center
    if (options?.fillColor !== undefined) this._fillColor = options.fillColor
    else this._fillColor = 'none'
    if (options?.fillOpacity !== undefined) this._fillOpacity = options.fillOpacity
    if (options?.isDashed !== undefined) this._isDashed = options.isDashed
  }

  draw (): void {
    this.groupSvg = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    this.center.subscribe(this)
    this.setVisibilityColorThicknessAndDashed()
    this.update()
  }

  get radius (): number {
    return this._radius
  }

  set radius (radius: number) {
    this._radius = radius
    this.update()
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
  setVisibilityColorThicknessAndDashed (): void {
    this.color = this._color
    this.fillColor = this._fillColor
    if (this._fillOpacity !== undefined) this.fillOpacity = this._fillOpacity
    if (this._isDashed !== undefined) this.isDashed = this._isDashed
    this.isDashed = this._isDashed
    this.isVisible = this._isVisible
  }

  update (): void {
    if (this.center.x === undefined || this.center.y === undefined || Number.isNaN(this.center.x) || Number.isNaN(this.center.y)) {
      this.groupSvg.removeAttribute('r')
    } else {
      const xSvg = this.figure.xToSx(this.center.x)
      const ySvg = this.figure.yToSy(this.center.y)
      const rSvg = this.figure.pixelsPerUnit * this._radius
      this.groupSvg.setAttribute('cx', `${xSvg}`)
      this.groupSvg.setAttribute('cy', `${ySvg}`)
      this.groupSvg.setAttribute('r', `${rSvg}`)
    }
    this.notify()
  }

  translate ({ vector, ...options }: { vector: Vector } & OptionsElement2D): Circle {
    const shape = this.center.shape
    const newCenter = this.figure.create('PointByTranslation', { origin: this.center, vector, shape })
    if (this.center.label !== undefined) newCenter.label = this.center.label + "'"
    const newCircle = this.figure.create('Circle', { center: newCenter, radius: this.radius, ...options })
    return newCircle
  }

  translateByPoints ({ point1, point2, ...options }: { point1: Point, point2: Point } & OptionsElement2D): Circle {
    const newCenter = this.figure.create('PointByTranslationByPoints', { point1, point2, origin: this.center, isChild: true })
    const result = this.figure.create('Circle', { center: newCenter, radius: this.radius, isChild: true, ...options })
    return result
  }

  distancePointer (x: number, y: number): number {
    const pointerCoords = { x, y }
    const distanceToCenter = distance(pointerCoords, this.center)
    return Math.abs(distanceToCenter - this.radius)
  }

  toJSON (): object {
    return {
      ...this.jsonOptions(),
      idCenter: this.center.id,
      radius: this._radius,
      fillColor: this.fillColor,
      fillOpacity: this.fillOpacity
    }
  }

  get latex (): string {
    let result = '% Cercle ' + this.id
    result += `\n\\draw${this.latexOptions} (${this.center.x}, ${this.center.y}) circle (${this.radius});`
    return result
  }

  get description (): string {
    const centerName = this.center.label !== '' ? this.center.label : this.center.id
    return `Cercle de centre ${centerName} et de rayon ${this.radius} cm`
  }
}

export default Circle
