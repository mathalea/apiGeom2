import { ApiGeom } from '../ApiGeom'
import { Element2D } from '../elements/Element2D'
import { Segment } from '../elements/Line/Segment'
import { Point } from '../elements/Point/Point'
import { TextByPoint } from '../elements/Text/TextByPoint'
import { TextByPosition } from '../elements/Text/TextByPosition'

export function loadJson (apiGeom: ApiGeom, json: object): Element2D[] {
  apiGeom.elements.clear()
  apiGeom.svg.innerHTML = ''
  const elements = []
  for (const options of Object.values(json)) {
    if (options.type === 'Point') {
      elements.push(new Point(apiGeom, options.x, options.y, options))
    }
    if (options.type === 'Segment') {
      elements.push(new Segment(apiGeom, options.idPoint1, options.idPoint2, options))
    }
    if (options.type === 'TextByPosition') {
      elements.push(new TextByPosition(apiGeom, options.x, options.y, options.text, options))
    }
    if (options.type === 'TextByPoint') {
      elements.push(new TextByPoint(apiGeom, options.point, options.text, options))
    }
  }
  // Pour la navigation dans l'historique on ne sauvegarde que le premier chargement
  // les autres chargements proviennent de goBack() ou de goForward()
  if (apiGeom.history.length === 0) apiGeom.history.push(apiGeom.json)
  return elements
}
