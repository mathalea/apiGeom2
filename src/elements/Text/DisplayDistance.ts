import { ApiGeom } from '../../ApiGeom'
import { Distance } from '../../dynamicNumbers/Distance'
import { Point } from '../Points/Point'
import { TextByPosition } from './TextByPosition'

/**
 * Créé un texte qui suivra la position d'un point
 */
export class DisplayDistance extends TextByPosition {
  idPoint1: string
  point1: Point
  idPoint2: string
  point2: Point
  distance: Distance
  constructor (apiGeom: ApiGeom, x: number, y: number, point1: Point | string, point2: Point | string, { isLatex = true, color = 'black', hasToBeSaved }: { isLatex?: boolean, color?: string, dx?: number, dy?: number, hasToBeSaved?: boolean } = {}) {
    super(apiGeom, 0, 0, '', { isLatex, color, hasToBeSaved })
    this.type = 'DisplayDistance'
    this.x = x
    this.y = y
    if (typeof point1 === 'string') {
      this.idPoint1 = point1
      if (this.apiGeom.elements.has(this.idPoint1)) this.point1 = this.apiGeom.elements.get(this.idPoint1) as Point
      else throw new Error(`Point '${this.idPoint1}' does not exist`)
    } else {
      this.point1 = point1
      this.idPoint1 = point1.id
    }
    if (typeof point2 === 'string') {
      this.idPoint2 = point2
      if (this.apiGeom.elements.has(this.idPoint2)) this.point2 = this.apiGeom.elements.get(this.idPoint2) as Point
      else throw new Error(`Point '${this.idPoint2}' does not exist`)
    } else {
      this.point2 = point2
      this.idPoint2 = point2.id
    }
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
      point1: this.idPoint1,
      point2: this.idPoint2,
      x: this.x,
      y: this.y,
      id: this.id,
      color: this.color
    }
  }
}
