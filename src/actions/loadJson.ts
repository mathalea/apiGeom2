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
      elements.push(new Point(apiGeom, options.x, options.y, options))
    }
    if (options.type === 'Middle') {
      elements.push(new Middle(apiGeom, options.idPoint1, options.idPoint2, options))
    }
    if (options.type === 'PointIntersectionLL') {
      elements.push(new PointIntersectionLL(apiGeom, options.idLine1, options.idLine2, options))
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
    if (options.type === 'CircleCenterPoint') {
      elements.push(new CircleCenterPoint(apiGeom, options.idCenter, options.idPoint, options))
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
