import { Element2D } from '../elements/Element2D'
import { Point } from '../elements/Point'
// import { Segment } from '../elements/Segment'
import { ApiGeom } from '../ApiGeom'

export function moveDrag (element: Element2D, apiGeom: ApiGeom, pointerX: number, pointerY: number): void {
//   const body = document.querySelector('body')
//   if (body !== null) body.style.cursor = 'move'
//   if (element instanceof Segment) {
//       element.notifyPointerDeltaMove(pointerX - apiGeom.startDragCoords.x, pointerY - apiGeom.startDragCoords.y)
//       apiGeom.startDragCoords = { x: pointerX, y: pointerY }
//     } else element.notifyPointerMove(pointerX, pointerY)
    element.notifyPointerMove(pointerX, pointerY)
  }
}

export function actionStartDrag (apiGeom: ApiGeom, pointerX: number, pointerY: number) {
  const pointsNearClick = []
  const textsNearClick = []
  const linesNearClick = []
  for (const e of apiGeom.set) {
    if (e.draggable && (e instanceof Point || e instanceof TextByPosition || e instanceof Line) && e.distancePointer(pointerX, pointerY) * apiGeom.pixelsPerUnit < 15) {
      if (e instanceof Point) pointsNearClick.push(e)
      else if (e instanceof Text) textsNearClick.push(e)
      else if (e instanceof Line) linesNearClick.push(e)
    }
  }
  // On priorise les points sur les lines
  // Si on peut déplacer un point, on le fait
  for (const e of [...pointsNearClick, ...textsNearClick, ...linesNearClick]) {
    if (apiGeom.setInDrag.size < 1) {
      apiGeom.startDragCoords = { x: pointerX, y: pointerY }
      apiGeom.setInDrag.add(e)
      apiGeom.isDraging = true
    }
  }
}

export function stopDrag (apiGeom: ApiGeom) {
  for (const e of apiGeom.setInDrag) {
    if ((e instanceof Point || e instanceof TextByPosition) && e.snapToGrid) {
      const x = Math.round(e.x / apiGeom.dx) * apiGeom.dx
      const y = Math.round(e.y / apiGeom.dy) * apiGeom.dy
      if (e instanceof Point || e instanceof TextByPosition) e.notifyPointerMove(x, y)
    }
  }
  apiGeom.isDraging = false
  apiGeom.setInDrag.clear()
  const body = document.querySelector('body')
  if (body) body.style.cursor = 'default'
}
