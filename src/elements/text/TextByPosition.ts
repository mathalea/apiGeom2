import type Figure from '../../Figure'
import Element2D from '../Element2D'
import renderMathInElement from 'katex/dist/contrib/auto-render.js'
import 'katex/dist/katex.min.css'
import { type OptionsText } from '../interfaces'
import { round } from '../../lib/format'

/**
 * Créé un div contenant un texte qui est mis au dessus du svg
 * par défaut KaTeX s'occupe du rendu du div
 */
class TextByPosition extends Element2D {
  private _x!: number
  private _y!: number
  dxInPixels: number
  dyInPixels: number
  fontSize: string
  _color: string
  /** Détermine s'il faut utiliser KaTeX pour le rendu du texte */
  private _text!: string
  /** Le texte est mis dans un div qui s'affichera par dessus le SVG */
  div!: HTMLDivElement
  /** Ancrage du texte */
  anchor: 'topLeft' | 'topRight' | 'topCenter' | 'bottomLeft' | 'bottomRight' | 'bottomCenter' | 'middleLeft' | 'middleRight' | 'middleCenter'
  /** Angle avec l'horizontal exprimé en degrés */
  _angleWithHorizontalInDegres = 0

  constructor (figure: Figure, { x, y, text, color = 'black', fontSize = figure.options.fontSize, isChild = false, id, anchor = 'middleCenter', dxInPixels = 0, dyInPixels = 0 }: OptionsText) {
    super(figure, { isChild, id })
    this.type = 'TextByPosition'
    this._x = x
    this._y = y
    this.fontSize = fontSize
    this.dxInPixels = dxInPixels
    this.dyInPixels = dyInPixels
    this._text = text
    this._color = color
    this.anchor = anchor
  }

  draw (): void {
    this.div = document.createElement('div')
    this.div.style.position = 'absolute'
    this.div.style.pointerEvents = 'none'
    this.figure.container?.appendChild(this.div)
    if (this.color !== 'black') this.div.style.color = this.color
    this.text = this._text
    this.x = this._x
    this.y = this._y
  }

  remove (): void {
    this.figure.elements.delete(this.id)
    this.div.remove()
    for (const element of this.observers) {
      element.remove()
    }
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
    let styleTransform = ''
    if (this.anchor.includes('Left')) {
      this.div.style.left = this.figure.xToSx(x - this.figure.xMin).toString() + 'px'
    } else if (this.anchor.includes('Right')) {
      this.div.style.right = this.figure.xToSx(-x + this.figure.xMax).toString() + 'px'
    } else if (this.anchor.includes('Center')) {
      this.div.style.left = this.figure.xToSx(x - this.figure.xMin).toString() + 'px'
      styleTransform += 'translateX(-50%)'
    }
    if (this.anchor.includes('middle')) {
      styleTransform += 'translateY(-50%)'
    }
    if (this.dxInPixels !== 0 || this.dyInPixels !== 0) {
      styleTransform += ` translate(${this.dxInPixels.toString()}px, ${-this.dyInPixels.toString()}px)`
    }
    this.div.style.fontSize = this.fontSize
    this.div.style.transform = styleTransform
    this._x = x
  }

  get y (): number {
    return this._y
  }

  set y (y: number) {
    if (this.anchor.includes('top')) {
      this.div.style.top = this.figure.yToSy(y - this.figure.yMax).toString() + 'px'
    } else if (this.anchor.includes('bottom')) {
      this.div.style.bottom = this.figure.yToSy(-y + this.figure.yMin).toString() + 'px'
    } else if (this.anchor.includes('middle')) {
      this.div.style.top = this.figure.yToSy(y - this.figure.yMax).toString() + 'px'
    }
    this._y = y
  }

  set angleWithHorizontalInDegres (angle: number) {
    this._angleWithHorizontalInDegres = angle
    this.div.style.transform = `rotate(${angle}deg)`
  }

  get angleWithHorizontalInDegres (): number {
    return this._angleWithHorizontalInDegres
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
    this.figure.container?.appendChild(this.div)
  }

  toJSON (): object {
    return {
      ...this.jsonOptions(),
      x: round(this.x),
      y: round(this.y),
      text: this.text,
      name: this.id,
      color: this.color
    }
  }

  get latexOptions (): string {
    const superOptions = super.latexOptions
    const options = (superOptions === '') ? [] : superOptions.substring(1, superOptions.length - 1).split(',')
    let alignment = ''
    if (this.dyInPixels > 0) alignment = 'above'
    else if (this.dyInPixels < 0) alignment = 'below'
    if (this.dxInPixels > 0) alignment += ' right'
    else if (this.dxInPixels < 0) alignment += ' left'
    if (alignment !== '') options.push(alignment)
    return options.join(',')
  }

  get latex (): string {
    return `\\node[${this.latexOptions}] at (${this.x},${this.y}) {${this.text}};`
  }
}

export default TextByPosition
