import Figure from '../../Figure'
import Point from '../points/Point'
import Element2D from '../Element2D'
import Segment from '../lines/Segment'

class Vector extends Element2D {
  x: number
  y: number
  /** Origine pour la représentation du vecteur */
  readonly origin?: Point
  /** Extrémité de la représentation du vecteur */
  end?: Point
  /** Représentation du vecteur */
  representation?: Segment
  constructor (figure: Figure, { x, y, origin, color, thickness, isDashed, isChild, isVisible }: { x: number, y: number, origin?: Point, color?: string, thickness?: number, isDashed?: boolean, isVisible?: boolean, isChild?: boolean }) {
    super(figure, { color, thickness, isDashed, isChild, isVisible })
    this.type = 'Vector'
    this.x = x
    this.y = y
    this.origin = origin
  }

  draw (): void {
    if (this.origin !== undefined) {
      this.origin.subscribe(this)
      this.end = this.figure.create('Point', { x: this.origin.x + this.x, y: this.origin.y + this.y, shape: '', isFree: false, isChild: true })
      this.representation = this.figure.create('Segment', { point1: this.origin, point2: this.end, isChild: true, color: this.color, thickness: this.thickness, isDashed: this.isDashed, isVisible: this.isVisible })
    }
  }

  update (): void {
    this.notify()
    if (this.origin !== undefined && this.end !== undefined) {
      this.end.x = this.origin.x + this.x
      this.end.y = this.origin.y + this.y
    }
  }

  get color (): string {
    return this._color
  }

  set color (color: string) {
    this._color = color
    if (this.representation !== undefined) {
      this.representation.color = color
    }
  }

  get thickness (): number {
    return this._thickness
  }

  set thickness (thickness: number) {
    this._thickness = thickness
    if (this.representation !== undefined) {
      this.representation.thickness = thickness
    }
  }

  get isDashed (): boolean {
    return this._isDashed
  }

  set isDashed (isDashed: boolean) {
    this._isDashed = isDashed
    if (this.representation !== undefined) {
      this.representation.isDashed = isDashed
    }
  }

  toJSON (): object {
    return {
      isChild: this.isChild,
      type: this.type,
      x: this.x,
      y: this.y,
      idOrigin: this.origin?.id,
      ...super.toJSON()
    }
  }
}

export default Vector
