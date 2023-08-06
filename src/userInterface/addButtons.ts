import type { eventName } from '../uiMachine'
import bisectorByPoints from '../assets/svg/bisectorByPoints.svg'
import circle from '../assets/svg/circle.svg'
import circleCompass from '../assets/svg/circleCompass.svg'
import circlePoint from '../assets/svg/circlePoint.svg'
import cursor from '../assets/svg/cursor.svg'
import dilate from '../assets/svg/dilate.svg'
import drag from '../assets/svg/drag.svg'
import dragAll from '../assets/svg/dragAll.svg'
import grid from '../assets/svg/grid.svg'
import hide from '../assets/svg/hide.svg'
import latex from '../assets/svg/latex.svg'
import line from '../assets/svg/line.svg'
import lineParallel from '../assets/svg/lineParallel.svg'
import linePerpendicular from '../assets/svg/linePerpendicular.svg'
import markAngle from '../assets/svg/markAngle.svg'
import matkSegment from '../assets/svg/markSegment.svg'
import mesureAngle from '../assets/svg/mesureAngle.svg'
import mesureSegment from '../assets/svg/mesureSegment.svg'
import moveLabel from '../assets/svg/moveLabel.svg'
import middle from '../assets/svg/middle.svg'
import namePoint from '../assets/svg/namePoint.svg'
import open from '../assets/svg/open.svg'
import perpendicularBisector from '../assets/svg/perpendicularBisector.svg'
import point from '../assets/svg/point.svg'
import pointIntersection from '../assets/svg/pointIntersection.svg'
import pointOn from '../assets/svg/pointOn.svg'
import polygon from '../assets/svg/polygon.svg'
import ray from '../assets/svg/ray.svg'
import redo from '../assets/svg/redo.svg'
import reflection from '../assets/svg/reflection.svg'
import reflectionOverLine from '../assets/svg/reflectionOverLine.svg'
import remove from '../assets/svg/remove.svg'
import rotate from '../assets/svg/rotate.svg'
import save from '../assets/svg/save.svg'
import segment from '../assets/svg/segment.svg'
import setOptions from '../assets/svg/setOptions.svg'
import translation from '../assets/svg/translation.svg'
import undo from '../assets/svg/undo.svg'

import type Figure from '../Figure'

const availableIcons = new Map<string, { url: string, tooltip: string }>([
  ['BISECTOR_BY_POINTS', { url: bisectorByPoints, tooltip: 'Bissectrice' }],
  ['CIRCLE_RADIUS', { url: circle, tooltip: 'Cercle centre-rayon' }],
  ['CIRCLE_COMPASS', { url: circleCompass, tooltip: 'Cercle par report de longueur' }],
  ['CIRCLE_CENTER_POINT', { url: circlePoint, tooltip: 'Cercle centre-point' }],
  ['CURSOR', { url: cursor, tooltip: 'Curseur' }],
  ['DILATE', { url: dilate, tooltip: 'Homothétie' }],
  ['DRAG', { url: drag, tooltip: 'Déplacer les points' }],
  ['DRAG_ALL', { url: dragAll, tooltip: 'Déplacer la figure' }],
  ['GRID', { url: grid, tooltip: 'Afficher le repère' }],
  ['HIDE', { url: hide, tooltip: 'Masquer un élément' }],
  ['LATEX', { url: latex, tooltip: 'Export LaTeX' }],
  ['LINE', { url: line, tooltip: 'Droite' }],
  ['LINE_PARALLEL', { url: lineParallel, tooltip: 'Droite parallèle' }],
  ['LINE_PERPENDICULAR', { url: linePerpendicular, tooltip: 'Droite perpendiculaire' }],
  ['MARK_ANGLE', { url: markAngle, tooltip: 'Coder un angle' }],
  ['MARK_SEGMENT', { url: matkSegment, tooltip: 'Coder un segment' }],
  ['MESURE_ANGLE', { url: mesureAngle, tooltip: 'Mesurer un angle' }],
  ['MESURE_SEGMENT', { url: mesureSegment, tooltip: 'Mesurer une distance' }],
  ['MIDDLE', { url: middle, tooltip: 'Milieu' }],
  ['MOVE_LABEL', { url: moveLabel, tooltip: 'Déplacer le nom d\'un point' }],
  ['NAME_POINT', { url: namePoint, tooltip: 'Renommer un point' }],
  ['OPEN', { url: open, tooltip: 'Charger un fichier' }],
  ['PERPENDICULAR_BISECTOR', { url: perpendicularBisector, tooltip: 'Médiatrice' }],
  ['POINT', { url: point, tooltip: 'Point' }],
  ['POINT_INTERSECTION', { url: pointIntersection, tooltip: 'Point à l\'intersection' }],
  ['POINT_ON', { url: pointOn, tooltip: 'Point sur' }],
  ['POLYGON', { url: polygon, tooltip: 'Polygone' }],
  ['RAY', { url: ray, tooltip: 'Demi-droite' }],
  ['REDO', { url: redo, tooltip: 'Rétablir' }],
  ['REFLECTION', { url: reflection, tooltip: 'Symétrie centrale' }],
  ['REFLECTION_OVER_LINE', { url: reflectionOverLine, tooltip: 'Symétrie axiale' }],
  ['REMOVE', { url: remove, tooltip: 'Supprimer' }],
  ['ROTATE', { url: rotate, tooltip: 'Rotation' }],
  ['SAVE', { url: save, tooltip: 'Sauvegarder' }],
  ['SEGMENT', { url: segment, tooltip: 'Segment' }],
  ['SET_OPTIONS', { url: setOptions, tooltip: 'Modifier le style' }],
  ['TRANSLATION', { url: translation, tooltip: 'Translation' }],
  ['UNDO', { url: undo, tooltip: 'Annuler la dernière action' }]
])

export default function addButtons (list: string, figure: Figure): HTMLDivElement {
  const div = document.createElement('div')
  const buttons = list.split(' ')
  for (const key of buttons) {
    const button = key.toUpperCase()
    if (!availableIcons.has(button)) {
      console.error(`Le bouton ${button} n'existe pas`)
      continue
    }
    const img = document.createElement('img')
    const icon = availableIcons.get(button)
    if (icon == null) {
      console.error(`L'icône pour le bouton ${button} n'existe pas`)
      continue
    }
    img.src = icon.url
    img.title = icon.tooltip
    img.style.width = '40px'
    img.style.height = '40px'
    img.style.margin = '4px'
    img.style.cursor = 'pointer'
    img.style.borderRadius = '5px'
    img.style.border = '1px solid black'
    img.style.backgroundColor = 'white'
    img.style.boxShadow = '0px 0px 5px 0px rgba(0,0,0,0.75)'
    img.style.padding = '2px'
    img.onmouseover = () => {
      img.style.boxShadow = '0px 0px 10px 0px rgba(0,0,0,0.75)'
    }
    img.onmouseout = () => {
      img.style.boxShadow = '0px 0px 5px 0px rgba(0,0,0,0.75)'
    }
    img.onclick = () => { figure.ui?.send(button as eventName) }
    figure.buttons.set(button as eventName, img)
    div.appendChild(img)
  }
  return div
}
