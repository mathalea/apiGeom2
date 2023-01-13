import Figure from '../Figure'
import Point from '../elements/points/Point'
import DynamicNumber from './DynamicNumber'

class Distance extends DynamicNumber {
  /** id du premier point */
  idPoint1: string
  /** id du deuxième point */
  idPoint2: string
  /** Pointeur vers la première extrémité */
  point1: Point
  /** Pointeur vers la deuxième extrémité */
  point2: Point
  constructor (figure: Figure, point1: Point, point2: Point, hasToBeSaved = true) {
    super(figure, hasToBeSaved)
    this.type = 'Distance'
    this.point1 = point1
    this.idPoint1 = point1.id
    this.point2 = point2
    this.idPoint2 = point2.id
    this.point1.subscribe(this)
    this.point2.subscribe(this)
    this.update()
  }

  update (): void {
    try {
      this.value = Math.hypot(this.point1.x - this.point2.x, this.point1.y - this.point2.y)
    } catch (error) {
      console.log('Erreur dans Distance.update()', error)
      // this.exist = false
    }
    this.notify()
  }

  toJSON (): object {
    return {
      type: this.type,
      id: this.id,
      idPoint1: this.idPoint1,
      idPoint2: this.idPoint2
    }
  }
}

export default Distance
