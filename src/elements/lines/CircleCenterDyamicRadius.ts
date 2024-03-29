import type Figure from '../../Figure'
import type DynamicNumber from '../../dynamicNumbers/DynamicNumber'
import { type OptionsCircleCenterDynamicRadius, type OptionsElement2D } from '../interfaces'
import type Point from '../points/Point'
import Circle from './Circle'
import type Vector from '../vector/Vector'

class CircleCenterDynamicRadius extends Circle {
  /** Centre du cercle */
  center: Point
  /** Rayon du cercle */
  readonly radiusDynamic: DynamicNumber
  constructor (figure: Figure, { center, radius, ...options }: OptionsCircleCenterDynamicRadius) {
    super(figure, { center, radius: radius.value, ...options })
    this.type = 'CircleDynamicRadius'
    this.center = center
    this.radiusDynamic = radius
    this.radiusDynamic.subscribe(this)
    this.update()
    this.setVisibilityColorThicknessAndDashed()
  }

  update (): void {
    if (this.radiusDynamic?.value === undefined || this.center.x === undefined || this.center.y === undefined) return
    const xSvg = this.figure.xToSx(this.center.x)
    const ySvg = this.figure.yToSy(this.center.y)
    const rSvg = this.figure.pixelsPerUnit * this.radiusDynamic?.value
    this._radius = this.radiusDynamic.value
    this.groupSvg.setAttribute('cx', `${xSvg}`)
    this.groupSvg.setAttribute('cy', `${ySvg}`)
    if (Number.isFinite(rSvg)) this.groupSvg.setAttribute('r', `${rSvg}`)
    this.notify()
  }

  translate ({ vector, ...options }: { vector: Vector } & OptionsElement2D): CircleCenterDynamicRadius {
    const newCenter = this.figure.create('PointByTranslation', { origin: this.center, vector, shape: this.center.shape })
    if (this.center.label !== undefined) newCenter.label = this.center.label + "'"
    const newCircle = this.figure.create('CircleCenterDynamicRadius', { center: newCenter, radius: this.radiusDynamic, ...options })
    return newCircle
  }

  toJSON (): object {
    return {
      ...this.jsonOptions(),
      idCenter: this.center.id,
      idRadius: this.radiusDynamic.id,
      fillColor: this.fillColor,
      fillOpacity: this.fillOpacity
    }
  }
}

export default CircleCenterDynamicRadius
