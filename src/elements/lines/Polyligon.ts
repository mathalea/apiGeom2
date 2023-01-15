import Figure from '../../Figure'
import Element2D from '../Element2D'
import { OptionsPolygon } from '../interfaces'
import Point from '../points/Point'

/**
 * Trace une ligne brisée
 */
class Polygon extends Element2D {
  /** Liste des sommets */
  points: Point[]
  constructor (figure: Figure, { points, ...options }: OptionsPolygon) {
    super(figure, options)
    this.type = 'Polygon'
    this.points = points
    for (const point of points) {
      point.subscribe(this)
    }
  }

  draw (): void {
    this.groupSvg = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
    this.figure.svg.appendChild(this.groupSvg)
    this.groupSvg.setAttribute('fill', 'none')
    this.setColorThicknessAndDashed()
    this.update()
  }

  update (): void {
    this.notify()
    if (!allCoordsAreNumber(this.points)) {
      this.groupSvg.removeAttribute('points')
    } else {
      let pointsCoords = ''
      for (const point of this.points) {
        pointsCoords += `${this.figure.xToSx(point.x).toString()},${this.figure.yToSy(point.y).toString()} `
      }
      this.groupSvg.setAttribute('points', pointsCoords)
    }
  }

  toJSON (): object {
    const idPoints = []
    for (const point of this.points) {
      idPoints.push(point.id)
    }
    return {
      type: this.type,
      idPoints,
      ...super.toJSON()
    }
  }
}

export default Polygon

function allCoordsAreNumber (points: Point[]): boolean {
  for (const point of points) {
    if (!Number.isFinite(point.x) || !Number.isFinite(point.y)) return false
  }
  return true
}
