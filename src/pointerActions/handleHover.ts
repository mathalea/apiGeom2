import type Figure from '../Figure'
import Element2D from '../elements/Element2D'
import { defaultDistanceClick } from '../elements/defaultValues'

export default function handleHover (figure: Figure, pointerX: number, pointerY: number): void {
  const elements = [...figure.elements.values()].filter(e => e instanceof Element2D) as Element2D[]
  const elementsFiltered = elements.filter(figure.filter).filter(e => e.type !== 'pointer' && e.isVisible && e.isSelectable)
  for (const element of elementsFiltered) {
    element.isHover = (element.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < defaultDistanceClick)
  }
}
