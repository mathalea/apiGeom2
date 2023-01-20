import Figure from '../../Figure'
import Element2D from '../Element2D'
import renderMathInElement from 'katex/dist/contrib/auto-render.js'
import 'katex/dist/katex.min.css'
import { OptionsText } from '../interfaces'

/**
 * Créé un div contenant un texte qui est mis au dessus du svg
 * par défaut KaTeX s'occupe du rendu du div
 */
class TextByPosition extends Element2D {
  private _x!: number
  private _y!: number
  _color: string
  /** Détermine s'il faut utiliser KaTeX pour le rendu du texte */
  private _text!: string
  /** Le texte est mis dans un div qui s'affichera par dessus le SVG */
  div!: HTMLDivElement

  constructor (figure: Figure, { x, y, text, color = 'black', isChild = false }: OptionsText) {
    super(figure, { isChild })
    this.type = 'TextByPosition'
    this._x = x
    this._y = y
    this._text = text
    this._color = color
  }

  draw (): void {
    this.div = document.createElement('div')
    this.div.style.position = 'absolute'
    this.div.style.pointerEvents = 'none'
    this.figure.div?.appendChild(this.div)
    if (this.color !== 'black') this.div.style.color = this.color
    this.text = this._text
    this.x = this._x
    this.y = this._y
  }

  get text (): string {
    return this._text
  }

  set text (text: string) {
    this._text = text
    this.div.innerHTML = text
    renderMathInElement(this.div, {
      delimiters: [
        { left: '\\[', right: '\\]', display: true },
        { left: '$', right: '$', display: false }
      ],
      preProcess: (chaine: string) => chaine.replaceAll(String.fromCharCode(160), '\\,'),
      throwOnError: true,
      errorColor: '#CC0000',
      strict: 'warn',
      trust: false
    })
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
      isChild: this.isChild,
      x: this.x,
      y: this.y,
      text: this.text,
      name: this.id,
      color: this.color
    }
  }
}

export default TextByPosition
