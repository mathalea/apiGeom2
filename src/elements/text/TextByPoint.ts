import type Figure from '../../Figure'
import { type OptionsRestrictedText } from '../interfaces'
import type Point from '../points/Point'
import TextByPosition from './TextByPosition'

/**
 * Créé un texte qui suivra la position d'un point
 */
export class TextByPoint extends TextByPosition {
  /** Point sur lequel apparaitra le texte */
  point: Point
  /** Décalage vertical par rapport au point */
  dxInPixels: number
  /** Décalage vertical par rapport au point */
  dyInPixels: number
  constructor (figure: Figure, { point, text, dxInPixels = 0, dyInPixels = 0, color = 'black', isChild, id }: OptionsRestrictedText) {
    super(figure, { x: point.x, y: point.y, text, color, isChild, id, dxInPixels, dyInPixels })
    this.type = 'TextByPoint'
    this.dxInPixels = dxInPixels
    this.dyInPixels = dyInPixels
    this.point = point
    this.point.subscribe(this)
  }

  update (): void {
    if (this.point?.x !== undefined && this.point?.y !== undefined) super.moveTo(this.point?.x, this.point.y)
    this.notify()
  }

  /** Déplace le texte aux coordonnées données */
  moveTo (x: number, y: number): void {
    const [oldX, oldY] = [this.x, this.y]
    this.dxInPixels = Math.round(this.figure.xToSx(x - this.point.x) / this.figure.options.moveTextGrid) * this.figure.options.moveTextGrid
    this.dyInPixels = Math.round(this.figure.yToSy(this.point.y - y) / this.figure.options.moveTextGrid) * this.figure.options.moveTextGrid
    this.point.labelDxInPixels = this.dxInPixels
    this.point.labelDyInPixels = this.dyInPixels
    this.x = oldX
    this.y = oldY
  }

  toJSON (): object {
    return {
      ...this.jsonOptions(),
      point: this.point.id,
      text: this.text
    }
  }
}

export default TextByPoint
