import type Figure from '../../Figure'
import { type OptionsVectorPerpendicular } from '../interfaces'
import type Line from '../lines/Line'
import type Point from '../points/Point'
import Vector from './Vector'

class VectorUnitPerpendicular extends Vector {
  /** Origine de la représentation vecteur */
  origin: Point
  /** Droite perpendiculaire au vecteur */
  line: Line
  constructor (figure: Figure, { origin, line, ...options }: OptionsVectorPerpendicular) {
    const [x, y] = line.equation
    super(figure, { x, y, origin, ...options })
    this.type = 'VectorPerpendicular'
    this.line = line
    this.origin = origin
    line.subscribe(this)
    origin.subscribe(this)
  }

  update (): void {
    this.notify()
    const [x, y] = this.line.equation
    this.x = x
    this.y = y
    if (this.end !== undefined) {
      this.end.x = this.origin.x + this.x
      this.end.y = this.origin.y + this.y
    }
  }

  toJSON (): object {
    return {
      ...this.jsonOptions(),
      idOrigin: this.origin.id,
      idLine: this.line.id
    }
  }
}

export default VectorUnitPerpendicular
