import { OptionsPointBy } from 'elements/interfaces'
import Line from 'elements/lines/Line'
import Figure from '../../Figure'
import PointByDilate from './PointByDilate'

class PointOnLine extends PointByDilate {
  line: Line
  constructor (figure: Figure, { line, k, ...options }: { line: Line, k?: number } & OptionsPointBy) {
    if (k === undefined) k = Math.random()
    super(figure, { origin: line.point2, center: line.point1, k, ...options })
    this.type = 'PointOnLine'
    this.line = line
    this.isFree = true
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
      console.log('Erreur dans PointOnLine')
    }
    super.update()
  }

  toJSON (): object {
    return {
      idLine: this.line.id,
      k: this.k,
      ...super.toJSON()
    }
  }
}

export default PointOnLine
