import Figure from '../../Figure'
import DynamicNumber from '../../dynamicNumbers/DynamicNumber'
import { optionsCircleCenterDynamicRadius } from '../interfaces'
import Point from '../points/Point'
import Circle from './Circle'

class CircleCenterDynamicRadius extends Circle {
  /** id de la première extrémité */
  idCenter: string
  /** Centre du cercle */
  center: Point
  /** Rayon du cercle */
  readonly radiusDynamic: DynamicNumber
  /** id du rayon du cercle */
  readonly idRadius: string
  constructor (figure: Figure, { center, radius, ...options }: optionsCircleCenterDynamicRadius) {
    super(figure, { center, radius: radius.value, ...options })
    this.type = 'CircleDynamicRadius'
    this.center = center
    this.idCenter = center.id
    this.radiusDynamic = radius
    this.idRadius = radius.id
    this.radiusDynamic.subscribe(this)
    this.update()
    this.setColorThicknessAndDashed()
  }

  update (): void {
    if (this.radiusDynamic?.value === undefined || this.center.x === undefined || this.center.y === undefined) return
    const xSvg = this.figure.xToSx(this.center.x)
    const ySvg = this.figure.yToSy(this.center.y)
    const rSvg = this.figure.pixelsPerUnit * this.radiusDynamic?.value
    this.groupSvg.setAttribute('cx', `${xSvg}`)
    this.groupSvg.setAttribute('cy', `${ySvg}`)
    this.groupSvg.setAttribute('r', `${rSvg}`)
    this.notify()
  }

  toJSON (): object {
    return {
      type: this.type,
      id: this.id,
      idCenter: this.idCenter,
      idRadius: this.idRadius,
      color: this.color,
      thickness: this.thickness,
      fillColor: this.fillColor,
      fillOpacity: this.fillOpacity,
      isDashed: this.isDashed
    }
  }
}

export default CircleCenterDynamicRadius
