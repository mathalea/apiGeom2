import type Figure from '../../Figure'
import Point from './Point'
import type Graph from '../calculus/Graph'

class PointOnGraph extends Point {
  graph: Graph
  constructor (figure: Figure, { graph, x = 1, abscissa = false, ordinate = false, ...options }:
  { graph: Graph
    x?: number
    abscissa?: boolean
    ordinate?: boolean
    shape?: 'x' | 'o' | '' | '|'
    size?: number
    label?: string
    labelDxInPixels?: number
    labelDyInPixels?: number
    color?: string
    thickness?: number
    isChild?: boolean
    isFree?: boolean
    isVisible?: boolean
    id?: string }) {
    super(figure, { x, y: graph.f(x), ...options })
    this.type = 'PointOnGraph'
    this.graph = graph
    this.graph.subscribe(this)
  }

  get x (): number {
    return this._x
  }

  set x (x) {
    if (x > this.figure.xMax || x < this.figure.xMin || this.graph.f(x) > this.figure.yMax || this.graph.f(x) < this.figure.yMin) return
    this._x = x
    this._y = this.graph.f(x)
    this.update()
  }

  get y (): number {
    return this.graph.f(this.x)
  }

  moveTo (x: number): void {
    this.x = x
    // y est en lecture seule
  }

  toJSON (): object {
    return {
      ...this.jsonOptions(),
      idGraph: this.graph.id,
      x: Number(this.x.toFixed(4)),
      label: this.label,
      shape: this.shape,
      sizeInPixels: this.sizeInPixels
    }
  }
}

export default PointOnGraph
