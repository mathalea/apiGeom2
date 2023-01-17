import Figure from '../../Figure'
import Element2D from '../Element2D'
import { OptionsElement2D, OptionsPolygon } from '../interfaces'
import Point from '../points/Point'
import Vector from '../vector/Vector'
import Segment from './Segment'

/**
 * Trace une polygone
 */
class Polygon extends Element2D {
  /** Liste des sommets */
  points: Point[]
  /** Liste des côtés */
  readonly segments: Segment[]
  constructor (figure: Figure, { points, ...options }: OptionsPolygon) {
    super(figure, options)
    this.type = 'Polygon'
    this.points = points
    this.segments = []
    for (const point of points) {
      point.subscribe(this)
    }
  }

  draw (): void {
    this.groupSvg = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
    this.groupSvg.setAttribute('fill', 'none')
    this.setVisibilityColorThicknessAndDashed()
    this.createSegments()
    this.update()
  }

  /** Créer un segment caché pour chacun des côtés du polygone et ainsi permettre de placer des milieux, tracer des perpendiculaires... */
  createSegments (): void {
    for (let i = 0; i < this.points.length; i++) {
      const point1 = this.points.at(i % this.points.length) as Point
      const point2 = this.points.at((i + 1) % this.points.length) as Point
      this.segments.push(this.figure.create('Segment', { point1, point2, isChild: true, isVisible: false }))
    }
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
      isChild: this.isChild,
      ...super.toJSON()
    }
  }

  translate ({ vector, ...options }: { vector: Vector } & OptionsElement2D): Polygon {
    const newPoints = []
    for (const point of this.points) {
      const newPoint = this.figure.create('PointByTranslation', { origin: point, vector, shape: '' })
      if (point.label !== undefined) newPoint.label = point.label + "'"
      newPoints.push(newPoint)
    }
    return this.figure.create('Polygon', { points: newPoints, ...options })
  }
}

export default Polygon

function allCoordsAreNumber (points: Point[]): boolean {
  for (const point of points) {
    if (!Number.isFinite(point.x) || !Number.isFinite(point.y)) return false
  }
  return true
}
