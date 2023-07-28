import type Figure from '../../Figure'
import type Circle from '../lines/Circle'
import Point from './Point'

class PointOnCircle extends Point {
  figure: Figure
  circle: Circle
  angleWithHorizontal: number
  constructor (figure: Figure, { circle, angleWithHorizontal, ...options }: { circle: Circle, angleWithHorizontal?: number }) {
    if (angleWithHorizontal === undefined) angleWithHorizontal = Math.random() * 2 * Math.PI
    super(figure, { x: circle.center.x + circle.radius * Math.cos(angleWithHorizontal), y: circle.center.y + circle.radius * Math.sin(angleWithHorizontal), ...options })
    this.figure = figure
    this.circle = circle
    this.angleWithHorizontal = angleWithHorizontal
    this.isFree = true
    this.circle.subscribe(this)
  }

  moveTo (x: number, y: number): void {
    const angleWithHorizontal = Math.atan2(y - this.circle.center.y, x - this.circle.center.x)
    this.angleWithHorizontal = angleWithHorizontal
    this.x = this.circle.center.x + this.circle.radius * Math.cos(angleWithHorizontal)
    this.y = this.circle.center.y + this.circle.radius * Math.sin(angleWithHorizontal)
    this.update()
  }

  update (): void {
    this._x = this.circle.center.x + this.circle.radius * Math.cos(this.angleWithHorizontal)
    this._y = this.circle.center.y + this.circle.radius * Math.sin(this.angleWithHorizontal)
    super.update()
  }
}

export default PointOnCircle
