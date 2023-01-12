import ApiGeom from '../../ApiGeom'
import { defaultSize } from '../defaultValues'
import { Element2D } from '../Element2D'
import { optionsPoint } from '../interfaces'
import { TextByPoint } from '../text/TextByPoint'

/**
 * Trace un point et ajoute un éventuel label à partir de la propriété name
 */
class Point extends Element2D {
  protected _x: number
  protected _y: number
  /** Nom que l'on affiche à côté du point */
  private _name?: string | undefined
  /** Croix, rond ou rien */
  private _shape: 'x' | 'o' | ''
  /** Taille du point, correspond à ce qui est ajouté dans les 4 directions pour faire la croix ou au rayon du rond */
  private _size: number
  /** Elément SVG pour le premier trait de la croix */
  readonly svgLine1: SVGLineElement
  /** Elément SVG pour le deuxième trait de la croix */
  readonly svgLine2: SVGLineElement
  /** Elément SVG pour rond */
  readonly svgCircle: SVGCircleElement
  /** Affichage du nom du point */
  label?: TextByPoint
  constructor (apiGeom: ApiGeom, { x, y, ...options }: optionsPoint) {
    super(apiGeom, options)
    this.type = 'Point'
    this._shape = options?.shape ?? 'x'
    this._size = options?.size ?? defaultSize
    // Les deux traits qui forment la croix du point
    this.svgLine1 = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    this.svgLine2 = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    // Le cercle, si le point est représenté par un rond
    this.svgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    // Le groupe parent de la représentation du point
    this.groupSvg = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    this.apiGeom.svg.appendChild(this.groupSvg)
    this._x = x
    this._y = y
    this.update()
    this.setColorThicknessAndDashed()
    if (options?.name !== undefined) this.name = options.name
  }

  update (): void {
    this.notify()
    if (Number.isNaN(this._x) || Number.isNaN(this._y)) {
      this.svgCircle.remove()
      this.svgLine1.remove()
      this.svgLine2.remove()
      this.label?.hide()
      return
    }
    if (this.label === undefined || this.label.x > this.apiGeom.xMax || this.label.y > this.apiGeom.yMax || this.label.x < this.apiGeom.xMin || this.label.y < this.apiGeom.yMin) {
      this.label?.hide()
    } else this.label?.show()
    if (this._shape === 'x') {
      const x1Svg = this.apiGeom.xToSx(this._x - this._size)
      const x2Svg = this.apiGeom.xToSx(this._x + this._size)
      const x3Svg = this.apiGeom.xToSx(this._x + this._size)
      const x4Svg = this.apiGeom.xToSx(this._x - this._size)
      const y1Svg = this.apiGeom.yToSy(this._y - this._size)
      const y2Svg = this.apiGeom.yToSy(this._y + this._size)
      const y3Svg = this.apiGeom.yToSy(this._y - this._size)
      const y4Svg = this.apiGeom.yToSy(this._y + this._size)
      this.svgLine1.setAttribute('x1', `${x1Svg}`)
      this.svgLine1.setAttribute('y1', `${y1Svg}`)
      this.svgLine1.setAttribute('x2', `${x2Svg}`)
      this.svgLine1.setAttribute('y2', `${y2Svg}`)
      this.svgLine2.setAttribute('x1', `${x3Svg}`)
      this.svgLine2.setAttribute('y1', `${y3Svg}`)
      this.svgLine2.setAttribute('x2', `${x4Svg}`)
      this.svgLine2.setAttribute('y2', `${y4Svg}`)
      this.svgCircle.remove()
      this.groupSvg.appendChild(this.svgLine1)
      this.groupSvg.appendChild(this.svgLine2)
    } else if (this._shape === 'o') {
      const xSvg = this.apiGeom.xToSx(this._x)
      const ySvg = this.apiGeom.yToSy(this._y)
      const rSvg = this.apiGeom.pixelsPerUnit * this._size
      this.svgCircle.setAttribute('cx', `${xSvg}`)
      this.svgCircle.setAttribute('cy', `${ySvg}`)
      this.svgCircle.setAttribute('r', `${rSvg}`)
      this.svgLine1.remove()
      this.svgLine2.remove()
      this.groupSvg.appendChild(this.svgCircle)
    } else {
      this.svgLine1.remove()
      this.svgLine2.remove()
      this.svgCircle.remove()
    }
  }

  get shape (): 'x' | 'o' | '' {
    return this._shape
  }

  set shape (shape) {
    this._shape = shape
    this.update()
  }

  get size (): number {
    return this._size
  }

  set size (size) {
    this._size = size
    this.update()
  }

  get color (): string {
    return this._color
  }

  set color (color) {
    this._color = color
    this.svgCircle.setAttribute('fill', color)
    this.svgLine1.setAttribute('stroke', color)
    this.svgLine2.setAttribute('stroke', color)
    this.svgCircle.setAttribute('stroke', color)
  }

  get x (): number {
    return this._x
  }

  set x (x) {
    this._x = x
    this.update()
  }

  get y (): number {
    return this._y
  }

  set y (y) {
    this._y = y
    this.update()
  }

  get name (): string | undefined {
    return this._name
  }

  set name (name: string | undefined) {
    this._name = name
    if (name !== undefined) this.label = new TextByPoint(this.apiGeom, { point: this, text: name, hasToBeSaved: false })
  }

  /** Déplace le point */
  moveTo (x: number, y: number): void {
    this.x = x
    this.y = y
  }

  /** Distance entre un point et le pointeur de la souris exprimée dans les unités du repère */
  distancePointer (pointerX: number, pointerY: number): number {
    if (this._x === undefined || this._y === undefined) return Infinity
    return Math.hypot(this._x - pointerX, this._y - pointerY)
  }

  toJSON (): object {
    return {
      type: this.type,
      x: this.x,
      y: this.y,
      name: this.name,
      shape: this.shape,
      size: this.size,
      ...super.toJSON()
    }
  }
}

export default Point
