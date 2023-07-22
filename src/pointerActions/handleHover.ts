import type Figure from '../Figure'
import Element2D from '../elements/Element2D'
import { defaultDistanceClick } from '../elements/defaultValues'

export default function handleHover (figure: Figure, pointerX: number, pointerY: number): void {
  const elements = [...figure.elements.values()].filter(e => e instanceof Element2D) as Element2D[]
  for (const element of elements) {
    element.isHover = (
      element.type !== 'pointer' &&
      element.isVisible &&
      element.isSelectable &&
      figure.filter(element) &&
      element.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < defaultDistanceClick
    )
  }
}
