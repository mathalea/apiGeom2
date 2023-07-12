import type Figure from '../../Figure'
import Element2D from '../Element2D'
import type { OptionsElement2D } from '../interfaces'
import * as math from 'mathjs'
class Graph extends Element2D {
  expression: string
  xMin: number
  xMax: number
  prohibitedValues: number[]
  step: number
  constructor (figure: Figure, { expression, xMin = -10, xMax = 10, prohibitedValues = [], step = 0.01, ...options }: { expression: string, xMin?: number, xMax?: number, prohibitedValues?: number[], step?: number } & OptionsElement2D) {
    super(figure, { ...options })
    this.type = 'Graph'
    this.xMin = xMin
    this.xMax = xMax
    this.expression = expression
    this.prohibitedValues = prohibitedValues
    this.step = step
  }

  draw (): void {
    const points = getListOfPoints({ expression: this.expression, xMin: this.xMin, xMax: this.xMax, step: this.step, prohibitedValues: this.prohibitedValues })
    const pointsCoords = points.map(point => `${this.figure.xToSx(point.x).toString()},${this.figure.yToSy(point.y).toString()}`).join(' ')
    this.groupSvg = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
    this.groupSvg.setAttribute('fill', 'none')
    this.groupSvg.setAttribute('points', pointsCoords)
    this.setVisibilityColorThicknessAndDashed()
  }

  toJSON (): object {
    return {
      type: this.type,
      id: this.id,
      expression: this.expression,
      isChild: this.isChild,
      thickness: this.thickness,
      ...super.toJSON()
    }
  }
}

function getListOfPoints ({ expression, xMin, xMax, prohibitedValues, step }: { expression: string, xMin: number, xMax: number, prohibitedValues: number[], step: number }): Array<{ x: number, y: number }> {
  const points: Array<{ x: number, y: number }> = []
  const fNode = math.parse(expression)
  const f = (x: number): number => fNode.evaluate({ x })
  for (let x = xMin; x < xMax; x += step) {
    if (!prohibitedValues.includes(x)) {
      const point = { x, y: f(x) }
      points.push(point)
    }
  }
  return points
}
export default Graph
