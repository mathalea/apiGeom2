import type Figure from '../../Figure'
import Element2D from '../Element2D'
import { type OptionsElement2D } from '../interfaces'

class Grid extends Element2D {
  axeX: boolean
  axeY: boolean
  grid: boolean
  subGrid: boolean
  labelX: boolean
  labelY: boolean
  stepX: number
  stepY: number
  constructor (figure: Figure, { axeX = true, axeY = true, grid = true, subGrid = false, labelX = false, labelY = false, stepX = 1, stepY = 1, ...options }: {
    axeX?: boolean
    axeY?: boolean
    grid?: boolean
    subGrid?: boolean
    labelX?: boolean
    labelY?: boolean
    stepX?: number
    stepY?: number
  } & OptionsElement2D = {}) {
    super(figure, { ...options })
    this.type = 'Grid'
    this.axeX = axeX
    this.axeY = axeY
    this.grid = grid
    this.subGrid = subGrid
    this.labelX = labelX
    this.labelY = labelY
    this.stepX = stepX
    this.stepY = stepY
  }

  draw (): void {
    if (this.axeX) {
      const svgAxeX = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      svgAxeX.setAttribute('x1', this.figure.xToSx(this.figure.xMin).toString())
      svgAxeX.setAttribute('y1', this.figure.yToSy(0).toString())
      svgAxeX.setAttribute('x2', this.figure.xToSx(this.figure.xMax).toString())
      svgAxeX.setAttribute('y2', this.figure.yToSy(0).toString())
      svgAxeX.setAttribute('stroke', 'black')
      svgAxeX.setAttribute('stroke-width', '1')
      this.groupSvg.appendChild(svgAxeX)
    }
    if (this.axeY) {
      const svgAxeY = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      svgAxeY.setAttribute('x1', this.figure.xToSx(0).toString())
      svgAxeY.setAttribute('y1', this.figure.yToSy(this.figure.yMin).toString())
      svgAxeY.setAttribute('x2', this.figure.xToSx(0).toString())
      svgAxeY.setAttribute('y2', this.figure.yToSy(this.figure.yMax).toString())
      svgAxeY.setAttribute('stroke', 'black')
      svgAxeY.setAttribute('stroke-width', '1')
      this.groupSvg.appendChild(svgAxeY)
    }
    if (this.grid) {
      const svgGrid = document.createElementNS('http://www.w3.org/2000/svg', 'g')
      svgGrid.setAttribute('stroke', 'black')
      svgGrid.setAttribute('stroke-width', '0.5')
      svgGrid.setAttribute('stroke-dasharray', '1 1')
      this.groupSvg.appendChild(svgGrid)
      for (let x = this.figure.xMin; x <= this.figure.xMax; x += this.stepX) {
        const svgLine = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        svgLine.setAttribute('x1', this.figure.xToSx(x).toString())
        svgLine.setAttribute('y1', this.figure.yToSy(this.figure.yMin).toString())
        svgLine.setAttribute('x2', this.figure.xToSx(x).toString())
        svgLine.setAttribute('y2', this.figure.yToSy(this.figure.yMax).toString())
        svgGrid.appendChild(svgLine)
      }
      for (let y = this.figure.yMin; y <= this.figure.yMax; y += this.stepY) {
        const svgLine = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        svgLine.setAttribute('x1', this.figure.xToSx(this.figure.xMin).toString())
        svgLine.setAttribute('y1', this.figure.yToSy(y).toString())
        svgLine.setAttribute('x2', this.figure.xToSx(this.figure.xMax).toString())
        svgLine.setAttribute('y2', this.figure.yToSy(y).toString())
        svgGrid.appendChild(svgLine)
      }
    }
    this.setVisibilityColorThicknessAndDashed()
    this.update()
  }

  toJSON (): object {
    return {
      type: this.type,
      id: this.id,
      axeX: this.axeX,
      axeY: this.axeY,
      grid: this.grid,
      subGrid: this.subGrid,
      labelX: this.labelX,
      labelY: this.labelY,
      stepX: this.stepX,
      stepY: this.stepY,
      ...super.toJSON()
    }
  }
}

export default Grid
