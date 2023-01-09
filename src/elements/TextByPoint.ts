import { ApiGeom } from '../ApiGeom'
import { Point } from './Point'
import { TextByPosition } from './TextByPosition'

/**
 * Créé un texte qui suivra la position d'un point
 */
export class TextByPoint extends TextByPosition {
  point: Point | undefined
  namePoint: string
  /** Décalage vertical par rapport au point */
  dx: number
  /** Décalage vertical par rapport au point */
  dy: number
  constructor (apiGeom: ApiGeom, point: Point | string, text: string, { isLatex = true, color = 'black', dx = 0, dy = 0 }: { isLatex?: boolean, color?: string, dx?: number, dy?: number } = {}) {
    super(apiGeom, 0, 0, text, { isLatex, color })
    this.type = 'TextByPoint'
    this.dx = dx
    this.dy = dy
    if (typeof point === 'string') {
      this.namePoint = point
      if (this.apiGeom.elements.has(this.namePoint)) this.point = this.apiGeom.elements.get(this.namePoint) as Point
      else throw new Error(`Point '${this.namePoint}' does not exist`)
    } else {
      this.point = point
      this.namePoint = point.name
    }
    this.draw()
    this.point.subscribe(this)
  }

  draw (): void {
    if (this.point !== undefined) this.moveTo(this.point?.x + this.dx, this.point.y + this.dy)
  }

  toJSON (): object {
    return {
      point: this.namePoint,
      text: this.text,
      type: this.type,
      name: this.name,
      color: this.color
    }
  }
}
