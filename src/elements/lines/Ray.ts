import Figure from '../../Figure'
import { OptionsLine } from '../interfaces'
import Point from '../points/Point'
import Segment from './Segment'

/**
 * Trace une demi-droite d'origine point1 et qui passe par point 2
 */
class Ray extends Segment {
  constructor (figure: Figure, { point1, point2, ...options }: OptionsLine) {
    super(figure, { point1, point2, ...options })
    this.type = 'Ray'
  }

  update (): void {
    const [x1Svg, y1Svg, x2Svg, y2Svg] = getRayCoordsOut(this.point1, this.point2)
    if (Number.isNaN(x1Svg) || Number.isNaN(x2Svg) || Number.isNaN(y1Svg) || Number.isNaN(y1Svg)) {
      this.svgLine.removeAttribute('x1')
      this.svgLine.removeAttribute('x2')
      this.svgLine.removeAttribute('y1')
      this.svgLine.removeAttribute('y2')
    } else {
      this.svgLine.setAttribute('x1', `${this.figure.xToSx(x1Svg)}`)
      this.svgLine.setAttribute('y1', `${this.figure.yToSy(y1Svg)}`)
      this.svgLine.setAttribute('x2', `${this.figure.xToSx(x2Svg)}`)
      this.svgLine.setAttribute('y2', `${this.figure.yToSy(y2Svg)}`)
    }
    if (this.shape?.at(0) === '|') {
      this.drawBorder1()
    } else {
      this.svgBorder1.remove()
    }
    if (this.shape?.at(-1) === '|') {
      this.drawBorder2()
    } else {
      this.svgBorder2.remove()
    }
    this.notify()
  }
}
function getRayCoordsOut (A: Point, B: Point): [number, number, number, number] {
  if (A.x === undefined || A.y === undefined || B.x === undefined || B.y === undefined ||
    Number.isNaN(A.x) || Number.isNaN(A.y) || Number.isNaN(B.x) || Number.isNaN(B.y)) return [NaN, NaN, NaN, NaN]
  try {
    const parentFigure = A.figure
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
