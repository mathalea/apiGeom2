import { ApiGeom } from '../../ApiGeom'
import { Point } from '../Points/Point'
import { TextByPosition } from './TextByPosition'

/**
 * Créé un texte qui suivra la position d'un point
 */
export class TextByPoint extends TextByPosition {
  point: Point | undefined
  idPoint: string
  /** Décalage vertical par rapport au point */
  dx: number
  /** Décalage vertical par rapport au point */
  dy: number
  constructor (apiGeom: ApiGeom, point: Point | string, text: string, { isLatex = true, color = 'black', dx = 0, dy = 0, hasToBeSaved }: { isLatex?: boolean, color?: string, dx?: number, dy?: number, hasToBeSaved?: boolean } = {}) {
    super(apiGeom, 0, 0, text, { isLatex, color, hasToBeSaved })
    this.type = 'TextByPoint'
    this.dx = dx
    this.dy = dy
    if (typeof point === 'string') {
      this.idPoint = point
      if (this.apiGeom.elements.has(this.idPoint)) this.point = this.apiGeom.elements.get(this.idPoint) as Point
      else throw new Error(`Point '${this.idPoint}' does not exist`)
    } else {
      this.point = point
      this.idPoint = point.id
    }
    this.draw()
    this.point.subscribe(this)
  }

  draw (): void {
    if (this.point !== undefined) this.moveTo(this.point?.x + this.dx, this.point.y + this.dy)
  }

  toJSON (): object {
    return {
      point: this.idPoint,
      text: this.text,
      type: this.type,
      id: this.id,
      color: this.color
    }
  }
}
