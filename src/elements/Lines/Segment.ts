import ApiGeom from '../../ApiGeom'
import { Element2D } from '../Element2D'
import { optionsLine } from '../interfaces'
import Point from '../points/Point'

/**
 * Trace un segment qui a pour extrémités deux points donnés
 * Si un point a des coordonnées non définies alors le segment est effacé momentannément
 * C'est la classe parent de celles qui permettent de tracer une droite ou une demi-droite
 */
class Segment extends Element2D {
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
  constructor (apiGeom: ApiGeom, { point1, point2, ...options }: optionsLine) {
    super(apiGeom, options)
    this.type = 'Segment'
    this.point1 = point1
    this.idPoint1 = point1.id
    this.point2 = point2
    this.idPoint2 = point2.id
    this.groupSvg = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    this.point1.subscribe(this)
    this.point2.subscribe(this)
    this.apiGeom.svg.appendChild(this.groupSvg)
    this.update()
    this.setColorThicknessAndDashed()
  }

  /** Renvoie [a, b, c] tels que ax +y + c = 0 est l'équation de la droite passant par point1 et point2 */
  get equation (): [number, number, number] {
    if (this.point1.x === undefined || this.point1.y === undefined || this.point2.x === undefined || this.point2.y === undefined) return [NaN, NaN, NaN]
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
    if (this.point1.x === undefined || this.point1.y === undefined || this.point2.x === undefined || this.point2.y === undefined ||
      Number.isNaN(this.point1.x) || Number.isNaN(this.point1.y) || Number.isNaN(this.point2.x) || Number.isNaN(this.point2.y)) {
      this.groupSvg.removeAttribute('x1')
      this.groupSvg.removeAttribute('x2')
      this.groupSvg.removeAttribute('y1')
      this.groupSvg.removeAttribute('y2')
    } else {
      const x1Svg = this.apiGeom.xToSx(this.point1.x)
      const x2Svg = this.apiGeom.xToSx(this.point2.x)
      const y1Svg = this.apiGeom.yToSy(this.point1.y)
      const y2Svg = this.apiGeom.yToSy(this.point2.y)
      this.groupSvg.setAttribute('x1', `${x1Svg}`)
      this.groupSvg.setAttribute('y1', `${y1Svg}`)
      this.groupSvg.setAttribute('x2', `${x2Svg}`)
      this.groupSvg.setAttribute('y2', `${y2Svg}`)
    }
    this.notify()
  }

  toJSON (): object {
    return {
      type: this.type,
      idPoint1: this.idPoint1,
      idPoint2: this.idPoint2,
      ...super.toJSON()
    }
  }
}

export default Segment
