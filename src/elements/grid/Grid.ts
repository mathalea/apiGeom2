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
  subGridDivisions: number
  constructor (figure: Figure, { axeX = true, axeY = true, grid = true, subGrid = false, labelX = true, labelY = true, stepX = 1, stepY = 1, subGridDivisions = 5, ...options }: {
    axeX?: boolean
    axeY?: boolean
    grid?: boolean
    subGrid?: boolean
    labelX?: boolean
    labelY?: boolean
    stepX?: number
    stepY?: number
    subGridDivisions?: number
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
    this.subGridDivisions = subGridDivisions
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
      // Thicks
      for (let x = 0; x <= this.figure.xMax; x += this.stepX) {
        const svgLine = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        svgLine.setAttribute('x1', this.figure.xToSx(x).toString())
        svgLine.setAttribute('y1', this.figure.yToSy(-0.1).toString())
        svgLine.setAttribute('x2', this.figure.xToSx(x).toString())
        svgLine.setAttribute('y2', this.figure.yToSy(0.1).toString())
        svgLine.setAttribute('stroke', 'black')
        svgLine.setAttribute('stroke-width', '1')
        this.groupSvg.appendChild(svgLine)
      }
      for (let x = 0; x >= this.figure.xMin; x -= this.stepX) {
        const svgLine = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        svgLine.setAttribute('x1', this.figure.xToSx(x).toString())
        svgLine.setAttribute('y1', this.figure.yToSy(-0.1).toString())
        svgLine.setAttribute('x2', this.figure.xToSx(x).toString())
        svgLine.setAttribute('y2', this.figure.yToSy(0.1).toString())
        svgLine.setAttribute('stroke', 'black')
        svgLine.setAttribute('stroke-width', '1')
        this.groupSvg.appendChild(svgLine)
      }
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
      // Thicks
      for (let y = 0; y <= this.figure.yMax; y += this.stepY) {
        const svgLine = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        svgLine.setAttribute('x1', this.figure.xToSx(-0.1).toString())
        svgLine.setAttribute('y1', this.figure.yToSy(y).toString())
        svgLine.setAttribute('x2', this.figure.xToSx(0.1).toString())
        svgLine.setAttribute('y2', this.figure.yToSy(y).toString())
        svgLine.setAttribute('stroke', 'black')
        svgLine.setAttribute('stroke-width', '1')
        this.groupSvg.appendChild(svgLine)
      }
      for (let y = 0; y >= this.figure.yMin; y -= this.stepY) {
        const svgLine = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        svgLine.setAttribute('x1', this.figure.xToSx(-0.1).toString())
        svgLine.setAttribute('y1', this.figure.yToSy(y).toString())
        svgLine.setAttribute('x2', this.figure.xToSx(0.1).toString())
        svgLine.setAttribute('y2', this.figure.yToSy(y).toString())
        svgLine.setAttribute('stroke', 'black')
        svgLine.setAttribute('stroke-width', '1')
        this.groupSvg.appendChild(svgLine)
      }
      this.groupSvg.appendChild(svgAxeY)
    }
    if (this.grid) {
      const svgGrid = document.createElementNS('http://www.w3.org/2000/svg', 'g')
      svgGrid.setAttribute('stroke', 'gray')
      svgGrid.setAttribute('stroke-opacity', '0.5')
      this.groupSvg.appendChild(svgGrid)
      for (let x = 0; x <= this.figure.xMax; x += this.stepX) {
        const svgLine = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        svgLine.setAttribute('x1', this.figure.xToSx(x).toString())
        svgLine.setAttribute('y1', this.figure.yToSy(this.figure.yMin).toString())
        svgLine.setAttribute('x2', this.figure.xToSx(x).toString())
        svgLine.setAttribute('y2', this.figure.yToSy(this.figure.yMax).toString())
        svgLine.setAttribute('stroke-width', '0.5')
        svgGrid.appendChild(svgLine)
      }
      for (let x = 0; x >= this.figure.xMin; x -= this.stepX) {
        const svgLine = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        svgLine.setAttribute('x1', this.figure.xToSx(x).toString())
        svgLine.setAttribute('y1', this.figure.yToSy(this.figure.yMin).toString())
        svgLine.setAttribute('x2', this.figure.xToSx(x).toString())
        svgLine.setAttribute('y2', this.figure.yToSy(this.figure.yMax).toString())
        svgLine.setAttribute('stroke-width', '0.5')
        svgGrid.appendChild(svgLine)
      }
      for (let y = 0; y <= this.figure.yMax; y += this.stepY) {
        const svgLine = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        svgLine.setAttribute('x1', this.figure.xToSx(this.figure.xMin).toString())
        svgLine.setAttribute('y1', this.figure.yToSy(y).toString())
        svgLine.setAttribute('x2', this.figure.xToSx(this.figure.xMax).toString())
        svgLine.setAttribute('y2', this.figure.yToSy(y).toString())
        svgLine.setAttribute('stroke-width', '0.5')
        svgGrid.appendChild(svgLine)
      }
      for (let y = 0; y >= this.figure.yMin; y -= this.stepY) {
        const svgLine = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        svgLine.setAttribute('x1', this.figure.xToSx(this.figure.xMin).toString())
        svgLine.setAttribute('y1', this.figure.yToSy(y).toString())
        svgLine.setAttribute('x2', this.figure.xToSx(this.figure.xMax).toString())
        svgLine.setAttribute('y2', this.figure.yToSy(y).toString())
        svgLine.setAttribute('stroke-width', '0.5')
        svgGrid.appendChild(svgLine)
      }
    }
    if (this.subGrid) {
      const svgSubGrid = document.createElementNS('http://www.w3.org/2000/svg', 'g')
      svgSubGrid.setAttribute('stroke', 'gray')
      svgSubGrid.setAttribute('stroke-opacity', '0.2')
      this.groupSvg.appendChild(svgSubGrid)
      for (let x = this.figure.xMin; x <= this.figure.xMax; x += this.stepX / this.subGridDivisions) {
        const svgLine = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        svgLine.setAttribute('x1', this.figure.xToSx(x).toString())
        svgLine.setAttribute('y1', this.figure.yToSy(this.figure.yMin).toString())
        svgLine.setAttribute('x2', this.figure.xToSx(x).toString())
        svgLine.setAttribute('y2', this.figure.yToSy(this.figure.yMax).toString())
        svgLine.setAttribute('stroke-width', '0.25')
        svgSubGrid.appendChild(svgLine)
      }
      for (let y = this.figure.yMin; y <= this.figure.yMax; y += this.stepY / this.subGridDivisions) {
        const svgLine = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        svgLine.setAttribute('x1', this.figure.xToSx(this.figure.xMin).toString())
        svgLine.setAttribute('y1', this.figure.yToSy(y).toString())
        svgLine.setAttribute('x2', this.figure.xToSx(this.figure.xMax).toString())
        svgLine.setAttribute('y2', this.figure.yToSy(y).toString())
        svgLine.setAttribute('stroke-width', '0.25')
        svgSubGrid.appendChild(svgLine)
      }
    }
    if (this.labelX) {
      for (let x = 0; x <= this.figure.xMax; x += this.stepX) {
        this.figure.create('TextByPosition', { text: `$${x.toString()}$`, fontSize: '8pt', x, y: 0, isChild: true, anchor: 'topCenter', dyInPixels: 3 })
      }
      for (let x = -this.stepX; x >= this.figure.xMin; x -= this.stepX) {
        this.figure.create('TextByPosition', { text: `$${x.toString()}$`, fontSize: '8pt', x, y: 0, isChild: true, anchor: 'topCenter', dyInPixels: 3 })
      }
    }
    if (this.labelY) {
      for (let y = 0; y <= this.figure.yMax; y += this.stepY) {
        this.figure.create('TextByPosition', { text: `$${y.toString()}$`, fontSize: '8pt', x: 0, y, isChild: true, anchor: 'middleRight', dxInPixels: -10, dyInPixels: 2 })
      }
      for (let y = 0; y >= this.figure.yMin; y -= this.stepY) {
        this.figure.create('TextByPosition', { text: `$${y.toString()}$`, fontSize: '8pt', x: 0, y, isChild: true, anchor: 'middleRight', dxInPixels: -10, dyInPixels: 2 })
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
