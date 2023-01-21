import Figure from '../Figure'
import Distance from '../dynamicNumbers/Distance'
import Line from '../elements/lines/Line'
import Point from '../elements/points/Point'
import DynamicNumber from '../dynamicNumbers/DynamicNumber'
import Vector from '../elements/vector/Vector'
import Circle from '../elements/lines/Circle'

/**
 * Analyse l'objet de la sauvegarde et si le type est pris en charge alors on créé l'élément
 * @param figure - Espace de travail
 * @param json - Objet
 * @param eraseHistory - Faut-il repartir d'un historique vide ? Oui pour un chargement, non pour l'utilisation de undo et redo
 * @returns - Tableau avec tous les éléments créés
 */
export function loadJson (figure: Figure, json: object, eraseHistory = false): void {
  if (eraseHistory) {
    figure.history = []
    figure.historyIndex = -1
  }
  figure.elements.clear()
  if (figure.container != null) figure.container.innerHTML = ''
  figure.clearHtml()
  figure.container?.appendChild(figure.svg)
  for (const options of Object.values(json)) {
    // if (options.isChild === true) continue
    if (options.type === 'Point') {
      figure.create('Point', { x: options.x, y: options.y, ...options })
    }
    if (options.type === 'PointByTranslation') {
      const origin = figure.elements.get(options.idOrigin) as Point
      const vector = figure.elements.get(options.idVector) as Vector
      figure.create('PointByTranslation', { origin, vector, ...options })
    }
    if (options.type === 'PointByDilate') {
      const origin = figure.elements.get(options.idOrigin) as Point
      const center = figure.elements.get(options.idCenter) as Point
      figure.create('PointByDilate', { origin, center, ...options })
    }
    if (options.type === 'PointByRotation') {
      const origin = figure.elements.get(options.idOrigin) as Point
      const center = figure.elements.get(options.idCenter) as Point
      figure.create('PointByRotation', { origin, center, ...options })
    }
    if (options.type === 'PointByDynamicRotation') {
      const origin = figure.elements.get(options.idOrigin) as Point
      const center = figure.elements.get(options.idCenter) as Point
      const dynamicAngle = figure.elements.get(options.idDynamicAngle) as Point
      figure.create('PointByDynamicRotation', { origin, center, dynamicAngle, ...options })
    }
    if (options.type === 'Middle') {
      const point1 = figure.elements.get(options.idPoint1) as Point
      const point2 = figure.elements.get(options.idPoint2) as Point
      figure.create('Middle', { point1, point2, ...options })
    }
    if (options.type === 'PointIntersectionLL') {
      const line1 = figure.elements.get(options.idLine1) as Line
      const line2 = figure.elements.get(options.idLine2) as Line
      figure.create('PointIntersectionLL', { line1, line2, ...options })
    }
    if (options.type === 'PointIntersectionCC') {
      const circle1 = figure.elements.get(options.idCircle1) as Circle
      const circle2 = figure.elements.get(options.idCircle2) as Circle
      figure.create('PointIntersectionCC', { circle1, circle2, ...options })
    }
    if (options.type === 'PointsIntersectionCC') {
      const circle1 = figure.elements.get(options.idCircle1) as Circle
      const circle2 = figure.elements.get(options.idCircle2) as Circle
      figure.create('PointsIntersectionCC', { circle1, circle2, ...options })
    }
    if (options.type === 'PointIntersectionLC') {
      const line = figure.elements.get(options.idLine) as Line
      const circle = figure.elements.get(options.idCircle) as Circle
      figure.create('PointIntersectionLC', { line, circle, ...options })
    }
    if (options.type === 'PointsIntersectionLC') {
      const line = figure.elements.get(options.idLine) as Line
      const circle = figure.elements.get(options.idCircle) as Circle
      figure.create('PointsIntersectionLC', { line, circle, ...options })
    }
    if (options.type === 'Segment') {
      const point1 = figure.elements.get(options.idPoint1) as Point
      const point2 = figure.elements.get(options.idPoint2) as Point
      figure.create('Segment', { point1, point2, ...options })
    }
    if (options.type === 'Line') {
      const point1 = figure.elements.get(options.idPoint1) as Point
      const point2 = figure.elements.get(options.idPoint2) as Point
      figure.create('Line', { point1, point2, ...options })
    }
    if (options.type === 'Ray') {
      const point1 = figure.elements.get(options.idPoint1) as Point
      const point2 = figure.elements.get(options.idPoint2) as Point
      figure.create('Ray', { point1, point2, ...options })
    }
    if (options.type === 'Circle') {
      const center = figure.elements.get(options.idCenter) as Point
      figure.create('Circle', { center, radius: options.radius, ...options })
    }
    if (options.type === 'CircleCenterPoint') {
      const center = figure.elements.get(options.idCenter) as Point
      const point = figure.elements.get(options.idPoint) as Point
      figure.create('CircleCenterPoint', { center, point, ...options })
    }
    if (options.type === 'CircleDynamicRadius') {
      const center = figure.elements.get(options.idCenter) as Point
      const radius = figure.elements.get(options.idRadius) as Distance
      figure.create('CircleCenterDynamicRadius', { center, radius, ...options })
    }
    if (options.type === 'Distance') {
      const point1 = figure.elements.get(options.idPoint1) as Point
      const point2 = figure.elements.get(options.idPoint2) as Point
      figure.create('Distance', { point1, point2, ...options })
    }
    if (options.type === 'TextByPosition') {
      figure.create('TextByPosition', { x: options.x, y: options.y, text: options.text, ...options })
    }
    if (options.type === 'TextByPoint') {
      const point = figure.elements.get(options.idPoint) as Point
      figure.create('TextByPoint', { point, text: options.text, ...options })
    }
    if (options.type === 'TextDynamicByPosition') {
      const dynamicNumber = figure.elements.get(options.idDynamicNumber) as DynamicNumber
      figure.create('TextDynamicByPosition', { dynamicNumber, ...options })
    }
    if (options.type === 'Vector') {
      const origin = figure.elements.get(options.idOrigin)
      figure.create('Vector', { origin, ...options })
    }
    if (options.type === 'VectorByPoints') {
      const origin = figure.elements.get(options.idOrigin)
      const point1 = figure.elements.get(options.idPoint1)
      const point2 = figure.elements.get(options.idPoint2)
      figure.create('VectorByPoints', { point1, point2, origin, ...options })
    }
    if (options.type === 'VectorPerpendicular') {
      const origin = figure.elements.get(options.idOrigin)
      const line = figure.elements.get(options.idLine)
      figure.create('VectorPerpendicular', { origin, line, ...options })
    }
    if (options.type === 'LineByPointVector') {
      const vector = figure.elements.get(options.idVector)
      const point = figure.elements.get(options.idPoint)
      figure.create('LineByPointVector', { vector, point, ...options })
    }
    if (options.type === 'LineParallel') {
      const line = figure.elements.get(options.idLine)
      const point = figure.elements.get(options.idPoint)
      figure.create('LineParallel', { line, point, ...options })
    }
    if (options.type === 'LinePerpendicular') {
      const line = figure.elements.get(options.idLine)
      const point = figure.elements.get(options.idPoint)
      figure.create('LinePerpendicular', { line, point, ...options })
    }
    if (options.type === 'Polyline') {
      const points = []
      for (const idPoint of options.idPoints) {
        points.push(figure.elements.get(idPoint))
      }
      figure.create('Polyline', { points, ...options })
    }
    if (options.type === 'Polygon') {
      const points = []
      for (const idPoint of options.idPoints) {
        points.push(figure.elements.get(idPoint))
      }
      figure.create('Polygon', { points, ...options })
    }
  }
  // Pour la navigation dans l'historique on ne sauvegarde que le premier chargement
  // les autres chargements proviennent de goBack() ou de goForward()
  if (figure.history.length === 0) figure.history.push(figure.json)
}
