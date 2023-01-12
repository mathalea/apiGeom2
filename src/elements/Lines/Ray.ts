import ApiGeom from '../../ApiGeom'
import { optionsLine } from '../interfaces'
import { Point } from '../points/Point'
import { Segment } from './Segment'

/**
 * Trace une demi-droite d'origine point1 et qui passe par point 2
 */
class Ray extends Segment {
  constructor (apiGeom: ApiGeom, { point1, point2, ...options }: optionsLine) {
    super(apiGeom, { point1, point2, ...options })
    this.type = 'Ray'
  }

  update (): void {
    const [x1Svg, y1Svg, x2Svg, y2Svg] = getRayCoordsOut(this.point1, this.point2)
    if (Number.isNaN(x1Svg) || Number.isNaN(x2Svg) || Number.isNaN(y1Svg) || Number.isNaN(y1Svg)) {
      this.groupSvg.removeAttribute('x1')
      this.groupSvg.removeAttribute('x2')
      this.groupSvg.removeAttribute('y1')
      this.groupSvg.removeAttribute('y2')
    } else {
      this.groupSvg.setAttribute('x1', `${this.apiGeom.xToSx(x1Svg)}`)
      this.groupSvg.setAttribute('y1', `${this.apiGeom.yToSy(y1Svg)}`)
      this.groupSvg.setAttribute('x2', `${this.apiGeom.xToSx(x2Svg)}`)
      this.groupSvg.setAttribute('y2', `${this.apiGeom.yToSy(y2Svg)}`)
    }
    this.notify()
  }
}
function getRayCoordsOut (A: Point, B: Point): [number, number, number, number] {
  if (A.x === undefined || A.y === undefined || B.x === undefined || B.y === undefined ||
    Number.isNaN(A.x) || Number.isNaN(A.y) || Number.isNaN(B.x) || Number.isNaN(B.y)) return [NaN, NaN, NaN, NaN]
  try {
    const parentFigure = A.apiGeom
    let pente = Infinity
    if (B.x !== A.x) {
      pente = (B.y - A.y) / (B.x - A.x)
    }
    if (pente === Infinity) {
      if (A.y > B.y) return [A.x, A.y, A.x, parentFigure.yMin] // Si la droite est verticale on prend l'abscisse de A et le bon bord en ordonnée
      else return [A.x, A.y, A.x, parentFigure.yMax] // Ici on sort par en haut
    }
    if (Math.abs(pente) < 10 ** -4) {
      if (A.x > B.x) return [A.x, A.y, parentFigure.xMin, A.y]
      else return [A.x, A.y, parentFigure.xMax, A.y]
    }
    let xOutLeft: number, yOutLeft: number
    let n = 0
    if (B.x > A.x) {
      while (true) {
        xOutLeft = A.x + n
        yOutLeft = A.y + n * pente
        n++
        if (xOutLeft > parentFigure.xMax + 1 || yOutLeft > parentFigure.yMax + 1 || yOutLeft < parentFigure.yMin - 1) break
      }
      return [A.x, A.y, xOutLeft, yOutLeft]
    } else {
      while (true) {
        xOutLeft = A.x - n
        yOutLeft = A.y - n * pente
        n++
        if (xOutLeft < parentFigure.xMin - 1 || yOutLeft > parentFigure.yMax + 1 || yOutLeft < parentFigure.yMin - 1) break
      }
      return [A.x, A.y, xOutLeft, yOutLeft]
    }
  } catch (error) {
    console.log('Erreur dans Ray.getRayCoordsOut', error)
    return [NaN, NaN, NaN, NaN]
  }
}

export default Ray
