import { ApiGeom } from '../../ApiGeom'
import { Distance } from '../../dynamicNumbers/Distance'
import { Point } from '../points/Point'
import { TextByPosition } from './TextByPosition'

/**
 * Affiche en temps réel la distance entre deux points
 */
export class DisplayDistance extends TextByPosition {
  idPoint1: string
  point1: Point
  idPoint2: string
  point2: Point
  distance: Distance
  constructor (apiGeom: ApiGeom, x: number, y: number, point1: Point, point2: Point, { isLatex = true, color = 'black', hasToBeSaved }: { isLatex?: boolean, color?: string, dx?: number, dy?: number, hasToBeSaved?: boolean } = {}) {
    super(apiGeom, { x: NaN, y: NaN, text: '', isLatex, color, hasToBeSaved })
    this.type = 'DisplayDistance'
    this.x = x
    this.y = y
    this.point1 = point1
    this.idPoint1 = point1.id
    this.point2 = point2
    this.idPoint2 = point2.id
    this.distance = new Distance(apiGeom, point1, point2, hasToBeSaved = false)
    this.update()
    this.point1.subscribe(this)
    this.point2.subscribe(this)
  }

  update (): void {
    if (Number.isNaN(this.distance.value)) {
      this.text = ''
    } else {
      let text = ''
      if (this.point1.name !== undefined && this.point2.name !== undefined && this.point1.name.length > 0 && this.point2.name.length > 0) {
        text = `${this.point1.name + this.point2.name}`
      }
      if (this.distance.value.toString().includes('.')) text += ' \\approx '
      else {
        text += ' = '
      }
      text += Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2, minimumFractionDigits: 0 }).format(this.distance.value)
      this.text = text
    }
  }

  toJSON (): object {
    return {
      type: this.type,
      idPoint1: this.idPoint1,
      idPoint2: this.idPoint2,
      x: this.x,
      y: this.y,
      id: this.id,
      color: this.color
    }
  }
}
