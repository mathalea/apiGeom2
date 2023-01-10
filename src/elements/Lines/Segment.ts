import { ApiGeom } from '../../ApiGeom'
import { Element2D } from '../Element2D'
import { optionsElement2D } from '../interfaces'
import { Point } from '../Points/Point'

export class Segment extends Element2D {
  /** id de la première extrémité */
  idPoint1: string
  /** id de la deuxième extrémité */
  idPoint2: string
  /** Pointeur vers la première extrémité */
  point1: Point
  /** Pointeur vers la deuxième extrémité */
  point2: Point
  /** Détermine s'il faut afficher les deux extrémités, que celle de gauche ou que celle de droite */
  style?: '' | '|-|' | '|-' | '|-'
  constructor (apiGeom: ApiGeom, point1: string | Point, point2: string | Point, options?: optionsElement2D) {
    super(apiGeom, options)
    this.type = 'Segment'
    if (typeof point1 === 'string') {
      this.idPoint1 = point1
      if (this.apiGeom.elements.has(this.idPoint1)) this.point1 = this.apiGeom.elements.get(this.idPoint1) as Point
      else throw new Error(`Point '${this.idPoint1}' does not exist`)
    } else {
      this.point1 = point1
      this.idPoint1 = point1.id
    }
    if (typeof point2 === 'string') {
      this.idPoint2 = point2
      if (this.apiGeom.elements.has(this.idPoint2)) this.point2 = this.apiGeom.elements.get(this.idPoint2) as Point
      else throw new Error(`Point '${this.idPoint2}' does not exist`)
    } else {
      this.point2 = point2
      this.idPoint2 = point2.id
    }
    this.groupSvg = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    this.point1.subscribe(this)
    this.point2.subscribe(this)
    this.apiGeom.svg.appendChild(this.groupSvg)
    this.update()
    this.setColorThicknessAndDashed()
  }

  /** Renvoie [a, b, c] tels que ax +y + c = 0 est l'équation de la droite passant par point1 et point2 */
  get equation (): [number, number, number] {
    try {
      const a = this.point1.y - this.point2.y
      const b = this.point2.x - this.point1.x
      const c = (this.point1.x - this.point2.x) * this.point1.y + (this.point2.y - this.point1.y) * this.point1.x
      return [a, b, c]
    } catch (error) {
      console.log('Erreur dans Line.equation()', error)
      // this.exist = false
      return [NaN, NaN, NaN]
    }
  }

  update (): void {
    const x1Svg = this.apiGeom.xToSx(this.point1.x)
    const x2Svg = this.apiGeom.xToSx(this.point2.x)
    const y1Svg = this.apiGeom.yToSy(this.point1.y)
    const y2Svg = this.apiGeom.yToSy(this.point2.y)
    this.groupSvg.setAttribute('x1', `${x1Svg}`)
    this.groupSvg.setAttribute('y1', `${y1Svg}`)
    this.groupSvg.setAttribute('x2', `${x2Svg}`)
    this.groupSvg.setAttribute('y2', `${y2Svg}`)
    this.notify()
  }

  toJSON (): object {
    return {
      idPoint1: this.idPoint1,
      idPoint2: this.idPoint2,
      ...super.toJSON()
    }
  }
}
