import DynamicNumber from 'dynamicNumbers/DynamicNumber'
import { rotationCoord } from 'elements/calculus/Coords'
import { distance, getLargeSweep } from 'elements/calculus/utils'
import Element2D from 'elements/Element2D'
import { OptionsElement2D } from 'elements/interfaces'
import Point from 'elements/points/Point'
import Figure from '../../Figure'

class Arc extends Element2D {
  start: Point
  center: Point
  dynamicAngle: DynamicNumber
  svgArc: SVGPathElement
  _fillColor!: string
  _fillOpacity!: number
  /** Faut-il tracer les segments pour fermer l'arc de cercle ? */
  addBorders: boolean
  constructor (figure: Figure, { start, center, dynamicAngle, color, fillColor, fillOpacity, addBorders = false, ...options }: { start: Point, center: Point, dynamicAngle: DynamicNumber, addBorders: boolean } & OptionsElement2D) {
    super(figure, { ...options })
    this.start = start
    this.center = center
    this.dynamicAngle = dynamicAngle
    this.addBorders = addBorders
    this._color = color ?? 'black'
    this._fillColor = fillColor ?? 'none'
    this._fillOpacity = this.fillOpacity ?? 1
    this.svgArc = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    this.groupSvg.appendChild(this.svgArc)
    this.start.subscribe(this)
    this.center.subscribe(this)
    this.dynamicAngle.subscribe(this)
  }

  draw (): void {
    this.figure.svg.appendChild(this.groupSvg)
    this.update()
    this.setVisibilityColorThicknessAndDashed()
  }

  update (): void {
    this.notify()
    const radius = this.figure.xToSx(distance(this.start, this.center))
    const [large, sweep] = getLargeSweep(this.dynamicAngle.value)
    const end = rotationCoord(this.start, this.center, this.dynamicAngle.value)
    if (Number.isFinite(this.start.x) &&
      Number.isFinite(this.start.y) &&
      Number.isFinite(end.x) &&
      Number.isFinite(end.y)
    ) {
      let path = `M${this.figure.xToSx(this.start.x)} ${this.figure.yToSy(this.start.y)} A ${radius} ${radius} 0 ${large} ${sweep} ${this.figure.xToSx(end.x)} ${this.figure.yToSy(end.y)}`
      if (this.addBorders) path += `L ${this.figure.xToSx(this.center.x)} ${this.figure.yToSy(this.center.y)} Z`
      this.svgArc.setAttribute('d', path)
    }
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
  get fillOpacity (): number {
    return this._fillOpacity
  }

  /** Change la couleur des tracés de l'élément */
  set fillOpacity (opacity: number) {
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
}

export default Arc
