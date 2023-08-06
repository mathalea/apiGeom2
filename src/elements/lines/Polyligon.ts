import type Figure from '../../Figure'
import Element2D from '../Element2D'
import { type OptionsElement2D } from '../interfaces'
import type Point from '../points/Point'
import type Vector from '../vector/Vector'
import type Segment from './Segment'

/**
 * Trace une polygone
 */
class Polygon extends Element2D {
  /** Liste des sommets */
  points: Point[]
  /** Liste des côtés */
  readonly segments: Segment[]
  /** Forme des sommets */
  shape: 'x' | 'o' | ''
  _fillColor = 'none'
  _fillOpacity = 0.5
  /** Est-ce qu'on créé un segment pour chaque côté ? */
  isBuiltWithSegments: boolean
  constructor (figure: Figure, { points, shape = '', fillColor = 'none', fillOpacity = figure.options.fillOpacity, isBuiltWithSegments = true, ...options }: { points: Point[], fillColor?: string, fillOpacity?: number, shape?: 'x' | 'o' | '', isBuiltWithSegments?: boolean } & OptionsElement2D) {
    super(figure, options)
    this.type = 'Polygon'
    this.points = points
    this.shape = shape
    this.segments = []
    this.fillColor = fillColor
    this.fillOpacity = fillOpacity
    this.isBuiltWithSegments = isBuiltWithSegments
    for (const point of points) {
      point.subscribe(this)
      if (!this.isChild) point.color = ''
    }
  }

  draw (): void {
    this.groupSvg = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
    this.groupSvg.setAttribute('fill', this.fillColor ?? 'none')
    this.groupSvg.setAttribute('fill-opacity', this.fillOpacity.toString())
    this.setVisibilityColorThicknessAndDashed()
    if (this.isBuiltWithSegments) {
      this.createSegments()
    }
    this.update()
  }

  /** Créer un segment caché pour chacun des côtés du polygone et ainsi permettre de placer des milieux, tracer des perpendiculaires... */
  createSegments (): void {
    for (let i = 0; i < this.points.length; i++) {
      const point1 = this.points.at(i % this.points.length) as Point
      const point2 = this.points.at((i + 1) % this.points.length) as Point
      const segment = this.figure.create('Segment', { point1, point2, isChild: true, id: this.id + '_segment' + i.toString(), color: '' })
      this.segments.push(segment)
    }
    for (const segment of this.segments) {
      segment.createdBy = this
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

  /** Couleur de remplissage au format HTML */
  get fillColor (): string {
    return this._fillColor
  }

  /** Change la couleur des tracés de l'élément */
  set fillColor (color: string) {
    this._fillColor = color
    this.groupSvg.setAttribute('fill', this._fillColor)
  }

  /** Couleur de remplissage au format HTML */
  get fillOpacity (): number {
    return this._fillOpacity ?? this.figure.options.fillOpacity
  }

  /** Change la couleur des tracés de l'élément */
  set fillOpacity (opacity: number) {
    this._fillOpacity = opacity
    if (opacity !== undefined) this.groupSvg.setAttribute('fill-opacity', opacity.toString())
  }

  toJSON (): object {
    const idPoints = []
    for (const point of this.points) {
      idPoints.push(point.id)
    }
    return {
      ...this.jsonOptions(),
      idPoints
    }
  }

  remove (): void {
    super.remove()
    for (const segment of this.segments) {
      segment.remove()
    }
  }

  createTranslated ({ vector, ...options }: { vector: Vector } & OptionsElement2D): Polygon {
    const newPoints = []
    let idPoint = 0
    for (const point of this.points) {
      const newPoint = this.figure.create('PointByTranslation', { origin: point, vector, shape: '', id: this.id + '_' + idPoint.toString() })
      idPoint++
      if (point.label !== undefined) newPoint.label = point.label + "'"
      newPoints.push(newPoint)
    }
    return this.figure.create('Polygon', { points: newPoints, ...options })
  }

  translateByPoints ({ point1, point2, ...options }: { point1: Point, point2: Point } & OptionsElement2D): Polygon {
    const newPoints = []
    for (const point of this.points) {
      newPoints.push(point.translateByPoints({ point1, point2 }))
    }
    return this.figure.create('Polygon', { points: newPoints, ...options })
  }

  get latex (): string {
    let result = '% Polygone ' + this.points.reduce((acc, point) => acc + point.label, '')
    result += '\n \\draw '
    for (const point of this.points) {
      result += `(${point.x.toFixed(2)},${point.y.toFixed(2)}) -- `
    }
    result += ' cycle;'
    return result
  }
}

export default Polygon

function allCoordsAreNumber (points: Point[]): boolean {
  for (const point of points) {
    if (!Number.isFinite(point.x) || !Number.isFinite(point.y)) return false
  }
  return true
}
