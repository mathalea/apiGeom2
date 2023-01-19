import Figure from '../../Figure'
import Element2D from '../Element2D'
import { Binome, OptionsElement2D, OptionsLine } from '../interfaces'
import Point from '../points/Point'
import Vector from '../vector/Vector'

/**
 * Trace un segment qui a pour extrémités deux points donnés
 * Si un point a des coordonnées non définies alors le segment est effacé momentannément
 * C'est la classe parent de celles qui permettent de tracer une droite ou une demi-droite
 */
class Segment extends Element2D {
  /** Première extrémité du segment */
  point1: Point
  /** Deuxième extrémité du segment */
  point2: Point
  /** Détermine s'il faut afficher les deux extrémités, que celle de gauche ou que celle de droite */
  shape?: '' | '|-|' | '|-' | '|-'
  constructor (figure: Figure, { point1, point2, ...options }: OptionsLine) {
    super(figure, options)
    this.type = 'Segment'
    this.point1 = point1
    this.point2 = point2
    this.point1.subscribe(this)
    this.point2.subscribe(this)
  }

  draw (): void {
    this.groupSvg = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    this.setVisibilityColorThicknessAndDashed()
    this.update()
  }

  translate ({ vector, ...options }: { vector: Vector } & OptionsElement2D): Segment {
    const newPoint1 = this.figure.create('PointByTranslation', { vector, origin: this.point1 })
    const newPoint2 = this.figure.create('PointByTranslation', { vector, origin: this.point2 })
    const type = this.type as 'Line' | 'Segment' | 'Ray'
    const result = this.figure.create(type, { point1: newPoint1, point2: newPoint2, ...options }) as Segment
    return result
  }

  update (): void {
    this.notify()
    if (this.point1.x === undefined || this.point1.y === undefined || this.point2.x === undefined || this.point2.y === undefined ||
      Number.isNaN(this.point1.x) || Number.isNaN(this.point1.y) || Number.isNaN(this.point2.x) || Number.isNaN(this.point2.y)) {
      this.groupSvg.removeAttribute('x1')
      this.groupSvg.removeAttribute('x2')
      this.groupSvg.removeAttribute('y1')
      this.groupSvg.removeAttribute('y2')
    } else {
      const x1Svg = this.figure.xToSx(this.point1.x)
      const x2Svg = this.figure.xToSx(this.point2.x)
      const y1Svg = this.figure.yToSy(this.point1.y)
      const y2Svg = this.figure.yToSy(this.point2.y)
      this.groupSvg.setAttribute('x1', `${x1Svg}`)
      this.groupSvg.setAttribute('y1', `${y1Svg}`)
      this.groupSvg.setAttribute('x2', `${x2Svg}`)
      this.groupSvg.setAttribute('y2', `${y2Svg}`)
    }
  }

  /** Renvoie [a, b, c] tels que ax + by + c = 0 est l'équation de la droite passant par point1 et point2 */
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

  /**
   * Vecteur directeur de la droite
   */
  get unitVectorBinome (): Binome {
    try {
      const [a, b] = this.equation
      return { x: b, y: -a }
    } catch (error) {
      console.log('Erreur dans Line.normal()', error)
      return { x: NaN, y: NaN }
    }
  }

  /**
   * Vecteur normal à la droite
   */
  get unitPerpendicularVectorBinome (): Binome {
    try {
      const [a, b] = this.equation
      return { x: a, y: b }
    } catch (error) {
      console.log('Erreur dans Line.directeur()', error)
      return { x: NaN, y: NaN }
    }
  }

  toJSON (): object {
    return {
      type: this.type,
      isChild: this.isChild,
      idPoint1: this.point1.id,
      idPoint2: this.point2.id,
      shape: this.shape,
      ...super.toJSON()
    }
  }
}

export default Segment
