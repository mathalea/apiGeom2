import Figure from '../../Figure'
import { OptionsPointByTranslation } from '../interfaces'
import Vector from '../vector/Vector'
import Point from './Point'

/**
 * Créé un nouveau point image d'un autre dans une translation
 */
class PointByTranslation extends Point {
  origin: Point
  vector: Vector
  constructor (figure: Figure, { origin, vector, ...options }: OptionsPointByTranslation) {
    const x = origin.x + vector.x
    const y = origin.y + vector.y
    super(figure, { x, y, isFree: false, ...options })
    this.type = 'PointByTranslation'
    this.origin = origin
    this.vector = vector
    this.origin.subscribe(this)
    this.vector.subscribe(this)
  }

  update (): void {
    this._x = this.origin.x + this.vector.x
    this._y = this.origin.y + this.vector.y
    super.update()
  }

  toJSON (): object {
    return {
      type: this.type,
      idOrigin: this.origin.id,
      idVector: this.vector.id,
      ...super.toJSON()
    }
  }
}

export default PointByTranslation
