import { ApiGeom } from '../../ApiGeom'
import { Element2D } from '../Element2D'
import katex from 'katex'
import { optionsText } from '../interfaces'

/**
 * Créé un div contenant un texte qui est mis au dessus du svg
 * par défaut KaTeX s'occupe du rendu du div
 */
export class TextByPosition extends Element2D {
  private _x: number
  private _y: number
  /** Détermine s'il faut utiliser KaTeX pour le rendu du texte */
  readonly isLatex: boolean
  private _text!: string
  /** Le texte est mis dans un div qui s'affichera par dessus le SVG */
  div: HTMLDivElement

  constructor (apiGeom: ApiGeom, { x, y, text, isLatex = true, color = 'black', hasToBeSaved = true }: optionsText) {
    super(apiGeom, { hasToBeSaved })
    this.type = 'TextByPosition'
    this.div = document.createElement('div')
    this.div.style.position = 'absolute'
    this.div.style.pointerEvents = 'none'
    this._x = x
    this._y = y
    this.isLatex = isLatex
    this.text = text
    this.apiGeom.div?.appendChild(this.div)
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
    this.div.style.left = this.apiGeom.xToSx(x - this.apiGeom.xMin).toString() + 'px'
    this._x = x
  }

  get y (): number {
    return this._y
  }

  set y (y: number) {
    this.div.style.bottom = this.apiGeom.yToSy(-y + this.apiGeom.yMin).toString() + 'px'
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
    this.apiGeom.div?.appendChild(this.div)
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
