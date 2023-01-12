import { ApiGeom } from '../../ApiGeom'
import { DynamicNumber } from '../../dynamicNumbers/DynamicNumber'
import { optionsElement2D } from '../interfaces'
import { Point } from '../points/Point'
import { Circle } from './Circle'

export class CircleCenterDynamicRadius extends Circle {
  /** id de la première extrémité */
  idCenter: string
  /** Centre du cercle */
  center: Point
  /** Rayon du cercle */
  readonly radiusDynamic: DynamicNumber
  /** id du rayon du cercle */
  readonly idRadius: string
  constructor (apiGeom: ApiGeom, center: Point, radius: DynamicNumber, options?: optionsElement2D) {
    super(apiGeom, center, 1, options)
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
    const xSvg = this.apiGeom.xToSx(this.center.x)
    const ySvg = this.apiGeom.yToSy(this.center.y)
    const rSvg = this.apiGeom.pixelsPerUnit * this.radiusDynamic?.value
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
