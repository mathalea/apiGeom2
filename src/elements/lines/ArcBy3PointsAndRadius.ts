import { type OptionsElement2D } from '../interfaces'
import type Point from '../points/Point'
import type Figure from '../../Figure'
import Arc from './Arc'

class ArcBy3PointsAndRadius extends Arc {
  radius: number
  constructor (figure: Figure, { start, center, end, radius, addBorders = true, ...options }: { start: Point, center: Point, end: Point, radius: number, addBorders?: boolean } & OptionsElement2D) {
    const tempLine = figure.create('Segment', { point1: start, point2: center, isChild: true, isVisible: false })
    const newStart = figure.create('PointOnLineAtDistance', { line: tempLine, distance: radius, shape: start.shape })
    const dynamicAngle = figure.create('Angle', { start: newStart, center, end })
    super(figure, { start: newStart, center, dynamicAngle, addBorders, ...options })
    this.radius = radius
  }
}

export default ArcBy3PointsAndRadius
