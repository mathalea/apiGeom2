import type Figure from '../../Figure'
import Point from './Point'

/**
 * Trace le milieu défini par deux points
 */
class Middle extends Point {
  /** Première extrémité */
  point1: Point
  /** Deuxième extrémité */
  point2: Point
  constructor (figure: Figure, { point1, point2, ...options }: {
    point1: Point
    point2: Point
    shape?: 'x' | 'o' | ''
    size?: number
    isChild?: boolean
    isVisible?: boolean
    isSelectable?: boolean
    label?: string
    labelDxInPixels?: number
    labelDyInPixels?: number
  }) {
    const [x, y] = coordsMiddle(point1, point2)
    super(figure, { x, y, isFree: false, ...options })
    this.type = 'Middle'
    this.point1 = point1
    this.point2 = point2
    this.point1.subscribe(this)
    this.point2.subscribe(this)
  }

  update (): void {
    if (this.point1?.x === undefined || this.point2?.x === undefined || this.point1?.y === undefined || this.point2?.y === undefined ||
        Number.isNaN(this.point1.x) || Number.isNaN(this.point1.y) || (Number.isNaN(this.point2.x) || Number.isNaN(this.point2.y))) {
      this._x = NaN
      this._y = NaN
    } else {
      this._x = (this.point1.x + this.point2.x) / 2
      this._y = (this.point1.y + this.point2.y) / 2
    }
    super.update()
    this.notify()
  }

  toJSON (): object {
    return {
      ...this.jsonOptions(),
      idPoint1: this.point1.id,
      idPoint2: this.point2.id
    }
  }

  get description (): string {
    const point1Name = this.point1.label !== '' ? this.point1.label : this.point1.id
    const point2Name = this.point2.label !== '' ? this.point2.label : this.point2.id
    return `Milieu de $[${point1Name}${point2Name}]$`
  }
}

function coordsMiddle (point1: Point, point2: Point): [number, number] {
  if (Number.isNaN(point1.x) || Number.isNaN(point1.y) || Number.isNaN(point2.x) || Number.isNaN(point2.y)) return [NaN, NaN]
  return [(point1.x + point2.x) / 2, (point1.y + point2.y) / 2]
}

export default Middle
