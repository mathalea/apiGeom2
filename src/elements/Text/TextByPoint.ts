import { ApiGeom } from '../../ApiGeom'
import { optionsRestrictedText } from '../interfaces'
import { Point } from '../points/Point'
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
  constructor (apiGeom: ApiGeom, { point, text, isLatex = true, dx = 0, dy = 0, color = 'back', hasToBeSaved }: optionsRestrictedText) {
    super(apiGeom, { x: point.x + dx, y: point.y + dy, text, isLatex, color, hasToBeSaved })
    this.type = 'TextByPoint'
    this.dx = dx
    this.dy = dy
    this.point = point
    this.idPoint = point.id
    this.update()
    this.point.subscribe(this)
  }

  update (): void {
    if (this.point?.x !== undefined && this.point?.y !== undefined) this.moveTo(this.point?.x + this.dx, this.point.y + this.dy)
  }

  toJSON (): object {
    return {
      type: this.type,
      point: this.idPoint,
      text: this.text,
      id: this.id,
      color: this.color
    }
  }
}
