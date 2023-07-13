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
    labelDx?: number
    labelDy?: number
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
      type: this.type,
      idGraph: this.graph.id,
      x: this.x,
      id: this.id,
      isChild: this.isChild,
      label: this.label,
      shape: this.shape,
      size: this.size,
      color: this.color,
      isDashed: this.isDashed
    }
  }
}

export default PointOnGraph
