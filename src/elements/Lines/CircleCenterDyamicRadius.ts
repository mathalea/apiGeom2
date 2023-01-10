import { ApiGeom } from '../../ApiGeom'
import { DynamicNumber } from '../../dynamicNumbers/DynamicNumber'
import { optionsElement2D } from '../interfaces'
import { Point } from '../Points/Point'
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
  constructor (apiGeom: ApiGeom, center: string | Point, radius: string | DynamicNumber, options?: optionsElement2D) {
    super(apiGeom, center, 1, options)
    this.type = 'CircleDynamicRadius'
    if (typeof center === 'string') {
      this.idCenter = center
      if (this.apiGeom.elements.has(this.idCenter)) this.center = this.apiGeom.elements.get(this.idCenter) as Point
      else throw new Error(`Point '${this.idCenter}' does not exist`)
    } else {
      this.center = center
      this.idCenter = center.id
    }
    if (typeof radius === 'string') {
      this.idRadius = radius
      if (this.apiGeom.elements.has(this.idRadius)) this.radiusDynamic = this.apiGeom.elements.get(this.idRadius) as DynamicNumber
      else throw new Error(`Point '${this.idRadius}' does not exist`)
    } else {
      this.radiusDynamic = radius
      this.idRadius = radius.id
    }
    this.radiusDynamic.subscribe(this)
    this.update()
    this.setColorThicknessAndDashed()
  }

  update (): void {
    if (this.radiusDynamic?.value === undefined) return
    const xSvg = this.apiGeom.xToSx(this.center.x)
    const ySvg = this.apiGeom.yToSy(this.center.y)
    const rSvg = this.apiGeom.pixelsPerUnit * this.radiusDynamic?.value
    this.groupSvg.setAttribute('cx', `${xSvg}`)
    this.groupSvg.setAttribute('cy', `${ySvg}`)
    this.groupSvg.setAttribute('r', `${rSvg}`)
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
