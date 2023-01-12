import { ApiGeom } from '../ApiGeom'
import { Distance } from '../dynamicNumbers/Distance'
import { DynamicNumber } from '../dynamicNumbers/DynamicNumber'
import { Element2D } from '../elements/Element2D'
import { Circle } from '../elements/lines/Circle'
import { CircleCenterDynamicRadius } from '../elements/lines/CircleCenterDyamicRadius'
import { CircleCenterPoint } from '../elements/lines/CircleCenterPoint'
import { Line } from '../elements/lines/Line'
import { Ray } from '../elements/lines/Ray'
import { Segment } from '../elements/lines/Segment'
import { Middle } from '../elements/points/Middle'
import { Point } from '../elements/points/Point'
import { PointIntersectionLL } from '../elements/points/PointIntersectionLL'
import { DisplayDistance } from '../elements/text/DisplayDistance'
import { TextByPoint } from '../elements/text/TextByPoint'
import { TextByPosition } from '../elements/text/TextByPosition'

/**
 * Analyse l'objet de la sauvegarde et si le type est pris en charge alors on créé l'élément
 * @param apiGeom - Espace de travail
 * @param json - Objet
 * @param eraseHistory - Faut-il repartir d'un historique vide ? Oui pour un chargement, non pour l'utilisation de undo et redo
 * @returns - Tableau avec tous les éléments créés
 */
export function loadJson (apiGeom: ApiGeom, json: object, eraseHistory = false): Array<Element2D | DynamicNumber> {
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
      elements.push(new Point(apiGeom, { x: options.x, y: options.y, ...options }))
    }
    if (options.type === 'Middle') {
      const point1 = apiGeom.elements.get(options.idPoint1) as Point
      const point2 = apiGeom.elements.get(options.idPoint2) as Point
      elements.push(new Middle(apiGeom, { point1, point2, ...options }))
    }
    if (options.type === 'PointIntersectionLL') {
      const line1 = apiGeom.elements.get(options.idLine1) as Line
      const line2 = apiGeom.elements.get(options.idLine2) as Line
      elements.push(new PointIntersectionLL(apiGeom, { line1, line2, ...options }))
    }
    if (options.type === 'Segment') {
      const point1 = apiGeom.elements.get(options.idPoint1) as Point
      const point2 = apiGeom.elements.get(options.idPoint2) as Point
      elements.push(new Segment(apiGeom, { point1, point2, ...options }))
    }
    if (options.type === 'Line') {
      const point1 = apiGeom.elements.get(options.idPoint1) as Point
      const point2 = apiGeom.elements.get(options.idPoint2) as Point
      elements.push(new Line(apiGeom, { point1, point2, ...options }))
    }
    if (options.type === 'Ray') {
      const point1 = apiGeom.elements.get(options.idPoint1) as Point
      const point2 = apiGeom.elements.get(options.idPoint2) as Point
      elements.push(new Ray(apiGeom, { point1, point2, ...options }))
    }
    if (options.type === 'Circle') {
      const center = apiGeom.elements.get(options.idCenter) as Point
      elements.push(new Circle(apiGeom, { center, radius: options.radius, ...options }))
    }
    if (options.type === 'CircleCenterPoint') {
      const center = apiGeom.elements.get(options.idCenter) as Point
      const point = apiGeom.elements.get(options.idPoint1) as Point
      elements.push(new CircleCenterPoint(apiGeom, { center, point, ...options }))
    }
    if (options.type === 'CircleDynamicRadius') {
      const center = apiGeom.elements.get(options.idCenter) as Point
      const radius = apiGeom.elements.get(options.idRadius) as Distance
      elements.push(new CircleCenterDynamicRadius(apiGeom, { center, radius, ...options }))
    }
    if (options.type === 'Distance') {
      const point1 = apiGeom.elements.get(options.idPoint1) as Point
      const point2 = apiGeom.elements.get(options.idPoint2) as Point
      elements.push(new Distance(apiGeom, point1, point2, options))
    }
    if (options.type === 'TextByPosition') {
      elements.push(new TextByPosition(apiGeom, { x: options.x, y: options.y, text: options.text, ...options }))
    }
    if (options.type === 'TextByPoint') {
      const point = apiGeom.elements.get(options.idPoint) as Point
      elements.push(new TextByPoint(apiGeom, { point, text: options.text, ...options }))
    }
    if (options.type === 'DisplayDistance') {
      const point1 = apiGeom.elements.get(options.idPoint1) as Point
      const point2 = apiGeom.elements.get(options.idPoint2) as Point
      elements.push(new DisplayDistance(apiGeom, options.x, options.y, point1, point2, options))
    }
  }
  // Pour la navigation dans l'historique on ne sauvegarde que le premier chargement
  // les autres chargements proviennent de goBack() ou de goForward()
  if (apiGeom.history.length === 0) apiGeom.history.push(apiGeom.json)
  return elements
}
