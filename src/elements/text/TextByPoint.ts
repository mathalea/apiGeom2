import Figure from '../../Figure'
import { OptionsRestrictedText } from '../interfaces'
import Point from '../points/Point'
import TextByPosition from './TextByPosition'

/**
 * Créé un texte qui suivra la position d'un point
 */
export class TextByPoint extends TextByPosition {
  /** Point sur lequel apparaitra le texte */
  point: Point
  /** Décalage vertical par rapport au point */
  dx: number
  /** Décalage vertical par rapport au point */
  dy: number
  constructor (figure: Figure, { point, text, dx = 0, dy = 0, color = 'back', isChild }: OptionsRestrictedText) {
    super(figure, { x: point.x + dx, y: point.y + dy, text, color, isChild })
    this.type = 'TextByPoint'
    this.dx = dx
    this.dy = dy
    this.point = point
    this.point.subscribe(this)
  }

  update (): void {
    if (this.point?.x !== undefined && this.point?.y !== undefined) this.moveTo(this.point?.x + this.dx, this.point.y + this.dy)
    this.notify()
  }

  toJSON (): object {
    return {
      type: this.type,
      isChild: this.isChild,
      point: this.point.id,
      text: this.text,
      id: this.id,
      color: this.color
    }
  }
}

export default TextByPoint
