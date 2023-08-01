import type Figure from '../../Figure'
import type { OptionsElement2D } from '../interfaces'
import type Point from '../points/Point'
import Ray from './Ray'

class BisectorByPoints extends Ray {
  pointOnSide1: Point
  pointOnSide2: Point
  pointOnBissector: Point
  constructor (figure: Figure, { origin, pointOnSide1, pointOnSide2, ...options }: { origin: Point, pointOnSide1: Point, pointOnSide2: Point } & OptionsElement2D) {
    let angle = Math.atan2(pointOnSide2.y - origin.y, pointOnSide2.x - origin.x) - Math.atan2(pointOnSide1.y - origin.y, pointOnSide1.x - origin.x)
    if (angle > Math.PI) angle -= 2 * Math.PI
    if (angle < -Math.PI) angle += 2 * Math.PI
    const x = origin.x + Math.cos(angle / 2) * (pointOnSide1.x - origin.x) - Math.sin(angle / 2) * (pointOnSide1.y - origin.y)
    const y = origin.y + Math.sin(angle / 2) * (pointOnSide1.x - origin.x) + Math.cos(angle / 2) * (pointOnSide1.y - origin.y)
    const bisectorPoint = figure.create('Point', { x, y, isChild: true, isSelectable: false, isVisible: false })
    super(figure, { point1: origin, point2: bisectorPoint, ...options })
    this.type = 'BisectorByPoints'
    this.pointOnSide1 = pointOnSide1
    this.pointOnSide2 = pointOnSide2
    this.pointOnBissector = bisectorPoint
    this.pointOnSide1.subscribe(this)
    this.pointOnSide2.subscribe(this)
    this.point2.unsubscribe(this)
  }

  update (): void {
    let angle = Math.atan2(this.pointOnSide2.y - this.point1.y, this.pointOnSide2.x - this.point1.x) - Math.atan2(this.pointOnSide1.y - this.point1.y, this.pointOnSide1.x - this.point1.x)
    if (angle > Math.PI) angle -= 2 * Math.PI
    if (angle < -Math.PI) angle += 2 * Math.PI
    const x = this.point1.x + Math.cos(angle / 2) * (this.pointOnSide1.x - this.point1.x) - Math.sin(angle / 2) * (this.pointOnSide1.y - this.point1.y)
    const y = this.point1.y + Math.sin(angle / 2) * (this.pointOnSide1.x - this.point1.x) + Math.cos(angle / 2) * (this.pointOnSide1.y - this.point1.y)
    this.point2.moveTo(x, y)
    super.update()
  }
}

export default BisectorByPoints
