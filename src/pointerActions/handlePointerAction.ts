import { ApiGeom } from '../ApiGeom'
import { defaultDistanceClick } from '../elements/defaultValues'
import { Point } from '../elements/points/Point'

export function getClickedElement (apiGeom: ApiGeom, pointerX: number, pointerY: number, distanceInPixels = defaultDistanceClick): Point | undefined {
  const possibleElements = []
  for (const element of apiGeom.elements.values()) {
    if (element instanceof Point && element.distancePointer(pointerX, pointerY) * apiGeom.pixelsPerUnit < distanceInPixels) {
      possibleElements.push(element)
    }
  }
  return possibleElements.at(-1)
}
