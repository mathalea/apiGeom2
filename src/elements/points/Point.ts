import Figure from '../../Figure'
import { defaultSize } from '../defaultValues'
import Element2D from '../Element2D'
import Line from '../lines/Line'
import TextByPoint from '../text/TextByPoint'

/**
 * Trace un point et ajoute un éventuel label à partir de la propriété label
 */
class Point extends Element2D {
  protected _x: number
  protected _y: number
  /** Nom que l'on affiche à côté du point */
  private _label?: string
  /** Croix, rond ou rien */
  private _shape: 'x' | 'o' | '' | '|'
  /** Taille du point, correspond à ce qui est ajouté dans les 4 directions pour faire la croix ou au rayon du rond */
  private _size: number
  /** Le point est-il librement déplaçable ? */
  isFree: boolean
  /** Elément SVG pour le premier trait de la croix */
  protected svgLine1!: SVGLineElement
  /** Elément SVG pour le deuxième trait de la croix */
  protected svgLine2!: SVGLineElement
  /** Elément SVG pour rond */
  private svgCircle!: SVGCircleElement
  /** Affichage du nom du point */
  elementTextLabel?: TextByPoint
  /** Décalage vertical pour le nom du point */
  labelDx: number
  /** Décalage horizontal pour le nom du point */
  labelDy: number
  constructor (figure: Figure, { x, y, shape, size, label, labelDx, labelDy, isFree = true, color, thickness, isChild, isVisible, id }:
  { x: number
    y: number
    shape?: 'x' | 'o' | '' | '|'
    size?: number
    label?: string
    labelDx?: number
    labelDy?: number
    color?: string
    thickness?: number
    isChild?: boolean
    isFree?: boolean
    isVisible?: boolean
    id?: string }) {
    super(figure, { color, thickness, isChild, id })
    this.type = 'Point'
    this._shape = shape ?? 'x'
    this._size = size ?? defaultSize
    this._thickness = thickness ?? defaultSize
    this.labelDx = labelDx ?? 0.2
    this.labelDy = labelDy ?? 0.2
    this._x = x
    this._y = y
    this._label = label
    this.isFree = isFree
    this._isVisible = isVisible ?? true
  }

  draw (): void {
    // Les deux traits qui forment la croix du point
    this.svgLine1 = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    this.svgLine2 = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    // Le cercle, si le point est représenté par un rond
    this.svgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    // Le groupe parent de la représentation du point
    this.groupSvg = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    this.setVisibilityColorThicknessAndDashed()
    if (this.isVisible) {
      this.shape = this._shape
      this.label = this._label
    }
    this.update()
  }

  update (): void {
    this.notify()
    if (Number.isNaN(this._x) || Number.isNaN(this._y)) {
      this.svgCircle.remove()
      this.svgLine1.remove()
      this.svgLine2.remove()
      this.elementTextLabel?.hide()
      return
    }
    if (this.elementTextLabel === undefined || this.elementTextLabel.x > this.figure.xMax || this.elementTextLabel.y > this.figure.yMax || this.elementTextLabel.x < this.figure.xMin || this.elementTextLabel.y < this.figure.yMin) {
      this.elementTextLabel?.hide()
    } else this.elementTextLabel?.show()
    if (this._shape === 'x') {
      const x1Svg = this.figure.xToSx(this._x - this._size)
      const x2Svg = this.figure.xToSx(this._x + this._size)
      const x3Svg = this.figure.xToSx(this._x + this._size)
      const x4Svg = this.figure.xToSx(this._x - this._size)
      const y1Svg = this.figure.yToSy(this._y - this._size)
      const y2Svg = this.figure.yToSy(this._y + this._size)
      const y3Svg = this.figure.yToSy(this._y - this._size)
      const y4Svg = this.figure.yToSy(this._y + this._size)
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
      const xSvg = this.figure.xToSx(this._x)
      const ySvg = this.figure.yToSy(this._y)
      const rSvg = this.figure.pixelsPerUnit * this._size
      this.svgCircle.setAttribute('cx', `${xSvg}`)
      this.svgCircle.setAttribute('cy', `${ySvg}`)
      this.svgCircle.setAttribute('r', `${rSvg}`)
      this.svgLine1.remove()
      this.svgLine2.remove()
      this.groupSvg.appendChild(this.svgCircle)
    } else if (this._shape === '') {
      this.svgLine1.remove()
      this.svgLine2.remove()
      this.svgCircle.remove()
    }
  }

  isOnline (line: Line): boolean {
    const [a, b, c] = line.equation
    let result = (Math.abs(a * this.x + b * this.y + c) < 10 ** -6)
    if (line.type === 'Segment' && (this.x < Math.min(line.point1.x, line.point2.x) || this.x > Math.max(line.point1.x, line.point2.x) || this.y < Math.min(line.point1.y, line.point2.y) || this.y > Math.max(line.point1.y, line.point2.y))) {
      result = false
    }
    if (line.type === 'Ray') {
      // Direction gauche droite
      if (line.point1.x < line.point2.x && this.x < line.point1.x) {
        result = false
      }
      // Direction droite gauche
      if (line.point1.x > line.point2.x && this.x > line.point1.x) {
        result = false
      }
      // Direction bas haut
      if (line.point1.y < line.point2.y && this.y < line.point1.y) {
        result = false
      }
      // Direction haut bas
      if (line.point1.y > line.point2.y && this.y > line.point1.y) {
        result = false
      }
    }
    return result
  }

  get shape (): 'x' | 'o' | '' | '|' {
    return this._shape
  }

  set shape (shape) {
    this._shape = shape
    if (this._shape === 'x') {
      this.figure.svg.appendChild(this.groupSvg)
      this.svgCircle.remove()
      this.groupSvg.appendChild(this.svgLine1)
      this.groupSvg.appendChild(this.svgLine2)
    } else if (this._shape === 'o') {
      this.figure.svg.appendChild(this.groupSvg)
      this.svgLine1.remove()
      this.svgLine2.remove()
      this.groupSvg.appendChild(this.svgCircle)
    } else if (this._shape === '') {
      this.groupSvg.remove()
      this.svgLine1.remove()
      this.svgLine2.remove()
      this.svgCircle.remove()
    }
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

  get label (): string | undefined {
    return this._label
  }

  set label (label: string | undefined) {
    this._label = label
    if (label !== undefined) this.elementTextLabel = this.figure.create('TextByPoint', { point: this, text: '$' + label + '$', isChild: true, dx: this.labelDx, dy: this.labelDy, id: this.id + '_label' })
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

  get isVisible (): boolean {
    return this._isVisible
  }

  set isVisible (isVisible) {
    this._isVisible = isVisible
    this.isVisible ? this.elementTextLabel?.show() : this.elementTextLabel?.hide()
    super.isVisible = isVisible
  }

  toJSON (): object {
    return {
      type: this.type,
      id: this.id,
      isChild: this.isChild,
      x: this.x,
      y: this.y,
      label: this.label,
      shape: this.shape,
      size: this.size,
      thickness: this.thickness,
      ...super.toJSON()
    }
  }
}

export default Point
