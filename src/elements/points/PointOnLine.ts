import { similitudeCoord } from '../calculus/Coords'
import { type OptionsPointBy } from '../interfaces'
import type Line from '../lines/Line'
import type Figure from '../../Figure'
import PointByDilate from './PointByDilate'

class PointOnLine extends PointByDilate {
  line: Line
  constructor (figure: Figure, { line, k, shape, ...options }: { line: Line, k?: number } & OptionsPointBy) {
    if (k === undefined) k = Math.random()
    super(figure, { origin: line.point2, center: line.point1, k, shape: '|', ...options })
    this.type = 'PointOnLine'
    this.line = line
    this.isFree = true
    this.line.subscribe(this)
  }

  /** Déplace le point */
  moveTo (x: number, y: number): void {
    // Lieu du clic
    const origin = { x, y }
    // On calcule le nouveau coefficient de l'homothétie par rapport au projeté du lieu où on clic
    try {
      const [a, b, c] = this.line.equation
      const k = 1 / (a * a + b * b)
      let x: number | undefined, y: number | undefined
      if (a === 0) {
        x = origin.x
        y = -c / b
      } else if (b === 0) {
        y = origin.y
        x = -c / a
      } else {
        if (origin.x === undefined || origin.y === undefined) {
          x = NaN
          y = NaN
        } else {
          x = k * (b * b * origin.x - a * b * origin.y - a * c)
          y = k * (-a * b * origin.x + a * a * origin.y + (a * a * c) / b) - c / b
        }
      }
      if (this.line.type === 'Segment') {
        if (x < Math.min(this.line.point1.x, this.line.point2.x)) this.k = (this.line.point1.x < this.line.point2.x) ? 0 : 1
        else if (x > Math.max(this.line.point1.x, this.line.point2.x)) this.k = (this.line.point1.x < this.line.point2.x) ? 1 : 0
        else if (y < Math.min(this.line.point1.y, this.line.point2.y)) this.k = (this.line.point1.y < this.line.point2.y) ? 0 : 1
        else if (y > Math.max(this.line.point1.y, this.line.point2.y)) this.k = (this.line.point1.y < this.line.point2.y) ? 1 : 0
        else this.k = Math.hypot(x - this.line.point1.x, y - this.line.point1.y) / Math.hypot(this.line.point2.x - this.line.point1.x, this.line.point2.y - this.line.point1.y)
      } else if (this.line.type === 'Line') {
        let isPositive = 1
        if (this.line.point1.x < this.line.point2.x && x < this.line.point1.x) isPositive = -1
        else if (this.line.point1.x > this.line.point2.x && x > this.line.point1.x) isPositive = -1
        else if (this.line.point1.y < this.line.point2.y && y < this.line.point1.y) isPositive = -1
        else if (this.line.point1.y > this.line.point2.y && y > this.line.point1.y) isPositive = -1
        this.k = isPositive * Math.hypot(x - this.line.point1.x, y - this.line.point1.y) / Math.hypot(this.line.point2.x - this.line.point1.x, this.line.point2.y - this.line.point1.y)
      } else if (this.line.type === 'Ray') {
        if (this.line.point1.x < this.line.point2.x && x < this.line.point1.x) this.k = 0
        else if (this.line.point1.x > this.line.point2.x && x > this.line.point1.x) this.k = 0
        else if (this.line.point1.y < this.line.point2.y && y < this.line.point1.y) this.k = 0
        else if (this.line.point1.y > this.line.point2.y && y > this.line.point1.y) this.k = 0
        else this.k = Math.hypot(x - this.line.point1.x, y - this.line.point1.y) / Math.hypot(this.line.point2.x - this.line.point1.x, this.line.point2.y - this.line.point1.y)
      }
    } catch (error) {
      console.error('Erreur dans PointOnLine')
    }
    this.update()
  }

  update (): void {
    if (this.shape === '|') {
      const a = { x: this.line.point1.x, y: this.line.point1.y }
      const o = { x: this._x, y: this._y }
      const l = Math.hypot(this.line.point1.x - this._x, this.line.point1.y - this._y)
      const { x: x1, y: y1 } = similitudeCoord(a, o, (1 / l) * this.sizeInPixels / this.figure.pixelsPerUnit * Math.sqrt(2), 90)
      const { x: x2, y: y2 } = similitudeCoord(a, o, (1 / l) * this.sizeInPixels / this.figure.pixelsPerUnit * Math.sqrt(2), -90)
      if (Number.isFinite(x1) && Number.isFinite(x2) && Number.isFinite(y1) && Number.isFinite(y2)) {
        const x1Svg = this.figure.xToSx(x1).toString()
        const x2Svg = this.figure.xToSx(x2).toString()
        const y1Svg = this.figure.yToSy(y1).toString()
        const y2Svg = this.figure.yToSy(y2).toString()
        this.svgLine1.setAttribute('x1', x1Svg)
        this.svgLine1.setAttribute('y1', y1Svg)
        this.svgLine1.setAttribute('x2', x2Svg)
        this.svgLine1.setAttribute('y2', y2Svg)
        this.groupSvg.appendChild(this.svgLine1)
      }
    }
    super.update()
  }

  toJSON (): object {
    return {
      idLine: this.line.id,
      k: this.k,
      ...this.jsonOptions(),
    }
  }
}

export default PointOnLine
