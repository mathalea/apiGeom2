import Figure from '../../Figure'
import Element2D from '../Element2D'
import { OptionsPolyline } from '../interfaces'
import Point from '../points/Point'

/**
 * Trace une ligne brisée
 */
class Polyline extends Element2D {
  /** Liste des sommets */
  points: Point[]
  /** Détermine s'il faut afficher les deux extrémités, que celle de gauche ou que celle de droite */
  shape?: '' | '|-|' | '|-' | '|-'
  constructor (figure: Figure, { points, ...options }: OptionsPolyline) {
    super(figure, options)
    this.type = 'Polyline'
    this.points = points
    for (const point of points) {
      point.subscribe(this)
    }
  }

  draw (): void {
    this.groupSvg = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
    this.groupSvg.setAttribute('fill', 'none')
    this.setVisibilityColorThicknessAndDashed()
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

export default Polyline

function allCoordsAreNumber (points: Point[]): boolean {
  for (const point of points) {
    if (!Number.isFinite(point.x) || !Number.isFinite(point.y)) return false
  }
  return true
}
