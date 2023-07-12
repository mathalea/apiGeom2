import type Figure from '../../Figure'
import Element2D from '../Element2D'
import type { OptionsElement2D } from '../interfaces'

class Graph extends Element2D {
  f: (x: number) => number
  xMin: number
  xMax: number
  prohibitedValues: number[]
  step: number
  constructor (figure: Figure, { f, xMin = -10, xMax = 10, prohibitedValues = [], step = 0.01, ...options }: { f: (x: number) => number, xMin?: number, xMax?: number, prohibitedValues?: number[], step?: number } & OptionsElement2D) {
    super(figure, { ...options })
    this.xMin = xMin
    this.xMax = xMax
    this.f = f
    this.prohibitedValues = prohibitedValues
    this.step = step
  }

  draw (): void {
    const points = getListOfPoints({ f: this.f, xMin: this.xMin, xMax: this.xMax, step: this.step, prohibitedValues: this.prohibitedValues })
    const pointsCoords = points.map(point => `${this.figure.xToSx(point.x).toString()},${this.figure.yToSy(point.y).toString()}`).join(' ')
    this.groupSvg = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
    this.groupSvg.setAttribute('fill', 'none')
    this.groupSvg.setAttribute('points', pointsCoords)
    this.setVisibilityColorThicknessAndDashed()
  }
}

function getListOfPoints ({ f, xMin, xMax, prohibitedValues, step }: { f: (x: number) => number, xMin: number, xMax: number, prohibitedValues: number[], step: number }): Array<{ x: number, y: number }> {
  const points: Array<{ x: number, y: number }> = []
  for (let x = xMin; x < xMax; x += step) {
    if (!prohibitedValues.includes(x)) {
      const point = { x, y: f(x) }
      points.push(point)
    }
  }
  return points
}
export default Graph
