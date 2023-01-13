import Figure from '../Figure'
import { defaultDistanceClick } from '../elements/defaultValues'
import Point from '../elements/_points/Point'

export function getClickedElement (figure: Figure, pointerX: number, pointerY: number, distanceInPixels = defaultDistanceClick): Point | undefined {
  const possibleElements = []
  for (const element of figure.elements.values()) {
    if (element instanceof Point && element.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < distanceInPixels) {
      possibleElements.push(element)
    }
  }
  return possibleElements.at(-1)
}
