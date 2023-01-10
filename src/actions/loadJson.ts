import { ApiGeom } from '../ApiGeom'
import { Distance } from '../dynamicNumbers/Distance'
import { Element2D } from '../elements/Element2D'
import { Circle } from '../elements/Lines/Circle'
import { CircleCenterDynamicRadius } from '../elements/Lines/CircleCenterDyamicRadius'
import { Line } from '../elements/Lines/Line'
import { Ray } from '../elements/Lines/Ray'
import { Segment } from '../elements/Lines/Segment'
import { Point } from '../elements/Points/Point'
import { DisplayDistance } from '../elements/Text/DisplayDistance'
import { TextByPoint } from '../elements/Text/TextByPoint'
import { TextByPosition } from '../elements/Text/TextByPosition'

export function loadJson (apiGeom: ApiGeom, json: object, eraseHistory = false): Element2D[] {
  if (eraseHistory) {
    apiGeom.history = []
    apiGeom.historyIndex = -1
  }
  apiGeom.elements.clear()
  if (apiGeom.div !== null) apiGeom.div.innerHTML = ''
  apiGeom.clearHtml()
  apiGeom.div?.appendChild(apiGeom.svg)
  const elements = []
  for (const options of Object.values(json)) {
    if (options.type === 'Point') {
      elements.push(new Point(apiGeom, options.x, options.y, options))
    }
    if (options.type === 'Segment') {
      elements.push(new Segment(apiGeom, options.idPoint1, options.idPoint2, options))
    }
    if (options.type === 'Line') {
      elements.push(new Line(apiGeom, options.idPoint1, options.idPoint2, options))
    }
    if (options.type === 'Ray') {
      elements.push(new Ray(apiGeom, options.idPoint1, options.idPoint2, options))
    }
    if (options.type === 'Circle') {
      elements.push(new Circle(apiGeom, options.idCenter, options.radius, options))
    }
    if (options.type === 'CircleDynamicRadius') {
      elements.push(new CircleCenterDynamicRadius(apiGeom, options.idCenter, options.idRadius, options))
    }
    if (options.type === 'Distance') {
      elements.push(new Distance(apiGeom, options.idPoint1, options.idPoint2, options))
    }
    if (options.type === 'TextByPosition') {
      elements.push(new TextByPosition(apiGeom, options.x, options.y, options.text, options))
    }
    if (options.type === 'TextByPoint') {
      elements.push(new TextByPoint(apiGeom, options.point, options.text, options))
    }
    if (options.type === 'DisplayDistance') {
      elements.push(new DisplayDistance(apiGeom, options.x, options.y, options.point1, options.point2, options))
    }
  }
  // Pour la navigation dans l'historique on ne sauvegarde que le premier chargement
  // les autres chargements proviennent de goBack() ou de goForward()
  if (apiGeom.history.length === 0) apiGeom.history.push(apiGeom.json)
  return elements
}
