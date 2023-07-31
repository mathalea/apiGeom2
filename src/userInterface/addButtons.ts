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
import middle from '../assets/svg/middle.svg'
import namePoint from '../assets/svg/namePoint.svg'
import perpendicularBisector from '../assets/svg/perpendicularBisector.svg'
import point from '../assets/svg/point.svg'
import pointIntersection from '../assets/svg/pointIntersection.svg'
import pointOn from '../assets/svg/pointOn.svg'
import polygon from '../assets/svg/polygon.svg'
import ray from '../assets/svg/ray.svg'
import redo from '../assets/svg/redo.svg'
import remove from '../assets/svg/remove.svg'
import save from '../assets/svg/save.svg'
import segment from '../assets/svg/segment.svg'
import undo from '../assets/svg/undo.svg'

import type Figure from '../Figure'

const availableIcons = new Map([
  ['BISECTOR_BY_POINTS', bisectorByPoints],
  ['CIRCLE_RADIUS', circle],
  ['CIRCLE_COMPASS', circleCompass],
  ['CIRCLE_CENTER_POINT', circlePoint],
  ['CURSOR', cursor],
  ['DILATE', dilate],
  ['DRAG', drag],
  ['DRAG_ALL', dragAll],
  ['GRID', grid],
  ['HIDE', hide],
  ['LATEX', latex],
  ['LINE', line],
  ['LINE_PARALLEL', lineParallel],
  ['LINE_PERPENDICULAR', linePerpendicular],
  ['MARK_ANGLE', markAngle],
  ['MARK_SEGMENT', matkSegment],
  ['MESURE_ANGLE', mesureAngle],
  ['MESURE_SEGMENT', mesureSegment],
  ['MIDDLE', middle],
  ['NAME_POINT', namePoint],
  ['PERPENDICULAR_BISECTOR', perpendicularBisector],
  ['POINT', point],
  ['POINT_INTERSECTION', pointIntersection],
  ['POINT_ON', pointOn],
  ['POLYGON', polygon],
  ['RAY', ray],
  ['REDO', redo],
  ['REMOVE', remove],
  ['SAVE', save],
  ['SEGMENT', segment],
  ['UNDO', undo]
])

export default function addButtons (list: string, figure: Figure): HTMLDivElement {
  const div = document.createElement('div')
  const buttons = list.split(' ')
  for (const button of buttons) {
    if (!availableIcons.has(button)) {
      console.error(`Le bouton ${button} n'existe pas`)
      continue
    }
    const img = document.createElement('img')
    img.src = availableIcons.get(button) as string
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
