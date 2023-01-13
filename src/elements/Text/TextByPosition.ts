import Figure from '../../Figure'
import Element2D from '../Element2D'
import katex from 'katex'
import { optionsText } from '../interfaces'

/**
 * Créé un div contenant un texte qui est mis au dessus du svg
 * par défaut KaTeX s'occupe du rendu du div
 */
class TextByPosition extends Element2D {
  private _x!: number
  private _y!: number
  /** Détermine s'il faut utiliser KaTeX pour le rendu du texte */
  readonly isLatex: boolean
  private _text!: string
  /** Le texte est mis dans un div qui s'affichera par dessus le SVG */
  div: HTMLDivElement

  constructor (figure: Figure, { x, y, text, isLatex = true, color = 'black', hasToBeSaved = true }: optionsText) {
    super(figure, { hasToBeSaved })
    this.type = 'TextByPosition'
    this.div = document.createElement('div')
    this.div.style.position = 'absolute'
    this.div.style.pointerEvents = 'none'
    this.x = x
    this.y = y
    this.isLatex = isLatex
    this.text = text
    this.figure.div?.appendChild(this.div)
    if (color !== 'black') this.div.style.color = color
  }

  get text (): string {
    return this._text
  }

  set text (text: string) {
    this._text = text
    if (this.isLatex) katex.render(text, this.div)
    else this.div.innerHTML = text
  }

  get x (): number {
    return this._x
  }

  set x (x: number) {
    this.div.style.left = this.figure.xToSx(x - this.figure.xMin).toString() + 'px'
    this._x = x
  }

  get y (): number {
    return this._y
  }

  set y (y: number) {
    this.div.style.bottom = this.figure.yToSy(-y + this.figure.yMin).toString() + 'px'
    this._y = y
  }

  /** Déplace le texte aux coordonnées données */
  moveTo (x: number, y: number): void {
    this.x = x
    this.y = y
  }

  hide (): void {
    this.div.remove()
  }

  show (): void {
    this.figure.div?.appendChild(this.div)
  }

  toJSON (): object {
    return {
      type: this.type,
      x: this.x,
      y: this.y,
      text: this.text,
      name: this.id,
      color: this.color
    }
  }
}

export default TextByPosition
