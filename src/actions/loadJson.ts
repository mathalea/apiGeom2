import Figure from '../Figure'
import Distance from '../dynamicNumbers/Distance'
import DynamicNumber from '../dynamicNumbers/DynamicNumber'
import Element2D from '../elements/Element2D'
import Circle from '../elements/lines/Circle'
import CircleCenterDynamicRadius from '../elements/lines/CircleCenterDyamicRadius'
import CircleCenterPoint from '../elements/lines/CircleCenterPoint'
import Line from '../elements/lines/Line'
import Ray from '../elements/lines/Ray'
import Segment from '../elements/lines/Segment'
import Middle from '../elements/points/Middle'
import Point from '../elements/points/Point'
import PointIntersectionLL from '../elements/points/PointIntersectionLL'
import DisplayDistance from '../elements/text/DisplayDistance'
import TextByPoint from '../elements/text/TextByPoint'
import TextByPosition from '../elements/text/TextByPosition'

/**
 * Analyse l'objet de la sauvegarde et si le type est pris en charge alors on créé l'élément
 * @param figure - Espace de travail
 * @param json - Objet
 * @param eraseHistory - Faut-il repartir d'un historique vide ? Oui pour un chargement, non pour l'utilisation de undo et redo
 * @returns - Tableau avec tous les éléments créés
 */
export function loadJson (figure: Figure, json: object, eraseHistory = false): Array<Element2D | DynamicNumber> {
  if (eraseHistory) {
    figure.history = []
    figure.historyIndex = -1
  }
  figure.elements.clear()
  if (figure.div !== null) figure.div.innerHTML = ''
  figure.clearHtml()
  figure.div?.appendChild(figure.svg)
  const elements = []
  for (const options of Object.values(json)) {
    if (options.type === 'Point') {
      elements.push(new Point(figure, { x: options.x, y: options.y, ...options }))
    }
    if (options.type === 'Middle') {
      const point1 = figure.elements.get(options.idPoint1) as Point
      const point2 = figure.elements.get(options.idPoint2) as Point
      elements.push(new Middle(figure, { point1, point2, ...options }))
    }
    if (options.type === 'PointIntersectionLL') {
      const line1 = figure.elements.get(options.idLine1) as Line
      const line2 = figure.elements.get(options.idLine2) as Line
      elements.push(new PointIntersectionLL(figure, { line1, line2, ...options }))
    }
    if (options.type === 'Segment') {
      const point1 = figure.elements.get(options.idPoint1) as Point
      const point2 = figure.elements.get(options.idPoint2) as Point
      elements.push(new Segment(figure, { point1, point2, ...options }))
    }
    if (options.type === 'Line') {
      const point1 = figure.elements.get(options.idPoint1) as Point
      const point2 = figure.elements.get(options.idPoint2) as Point
      elements.push(new Line(figure, { point1, point2, ...options }))
    }
    if (options.type === 'Ray') {
      const point1 = figure.elements.get(options.idPoint1) as Point
      const point2 = figure.elements.get(options.idPoint2) as Point
      elements.push(new Ray(figure, { point1, point2, ...options }))
    }
    if (options.type === 'Circle') {
      const center = figure.elements.get(options.idCenter) as Point
      elements.push(new Circle(figure, { center, radius: options.radius, ...options }))
    }
    if (options.type === 'CircleCenterPoint') {
      const center = figure.elements.get(options.idCenter) as Point
      const point = figure.elements.get(options.idPoint1) as Point
      elements.push(new CircleCenterPoint(figure, { center, point, ...options }))
    }
    if (options.type === 'CircleDynamicRadius') {
      const center = figure.elements.get(options.idCenter) as Point
      const radius = figure.elements.get(options.idRadius) as Distance
      elements.push(new CircleCenterDynamicRadius(figure, { center, radius, ...options }))
    }
    if (options.type === 'Distance') {
      const point1 = figure.elements.get(options.idPoint1) as Point
      const point2 = figure.elements.get(options.idPoint2) as Point
      elements.push(new Distance(figure, point1, point2, options))
    }
    if (options.type === 'TextByPosition') {
      elements.push(new TextByPosition(figure, { x: options.x, y: options.y, text: options.text, ...options }))
    }
    if (options.type === 'TextByPoint') {
      const point = figure.elements.get(options.idPoint) as Point
      elements.push(new TextByPoint(figure, { point, text: options.text, ...options }))
    }
    if (options.type === 'DisplayDistance') {
      const point1 = figure.elements.get(options.idPoint1) as Point
      const point2 = figure.elements.get(options.idPoint2) as Point
      elements.push(new DisplayDistance(figure, options.x, options.y, point1, point2, options))
    }
  }
  // Pour la navigation dans l'historique on ne sauvegarde que le premier chargement
  // les autres chargements proviennent de goBack() ou de goForward()
  if (figure.history.length === 0) figure.history.push(figure.json)
  return elements
}
