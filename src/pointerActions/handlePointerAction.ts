import type Figure from '../Figure'
import Element2D from '../elements/Element2D'
import { colors, defaultDeltaXModal, defaultDistanceClick } from '../elements/defaultValues'
import Point from '../elements/points/Point'
import TextByPosition from '../elements/text/TextByPosition'

export function getClickedPoint (figure: Figure, pointerX: number, pointerY: number, distanceInPixels = defaultDistanceClick): Point | undefined {
  const possibleElements = []
  figure.modal?.remove()
  for (const element of figure.elements.values()) {
    if (element instanceof Point && element.isFree && element.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < distanceInPixels) {
      possibleElements.push(element)
    }
  }
  if (possibleElements.length === 1) return possibleElements[0]
  else if (possibleElements.length > 1) {
    const elementText = new TextByPosition(figure, { x: pointerX + defaultDeltaXModal, y: Math.min(pointerY, figure.yMax - 2), text: '' })
    elementText.draw()
    figure.modal = elementText.div
    figure.modal.style.pointerEvents = 'auto'
    figure.modal.style.padding = '10px'
    figure.modal.style.overflowY = 'auto'
    figure.modal.style.backgroundColor = colors.titlelight
    figure.modal.style.color = colors.title
    figure.modal.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
    figure.modal.style.touchAction = 'none'
    figure.modal.innerText = 'Quel élément souhaitez-vous sélectionner ?'
    const divs = []
    for (const element of possibleElements) {
      const div = document.createElement('div')
      if (element.label !== undefined) div.innerText = element.label
      else div.innerText = element.id
      div.addEventListener('click', () => {
        figure.pointInDrag = element
        elementText.remove()
      })
      div.addEventListener('mouseenter', () => {
        div.style.backgroundColor = colors.lightest
      })
      div.addEventListener('mouseleave', () => {
        div.style.backgroundColor = colors.titlelight
      })
      div.style.marginTop = '5px'
      div.style.marginLeft = '10px'
      div.style.userSelect = 'none'
      div.style.cursor = 'default'
      divs.push(div)
    }
    for (const div of divs) {
      figure.modal.appendChild(div)
    }
    return undefined
  }
  return undefined
}

export function getClickedElement ({ figure, pointerX, pointerY, distanceInPixels = defaultDistanceClick, filter }: { figure: Figure, pointerX: number, pointerY: number, distanceInPixels?: number, filter?: (e: Element2D) => boolean }): Element2D | undefined {
  if (filter === undefined) {
    filter = (e) => e instanceof Element2D
  }
  const possibleElements = []
  figure.modal?.remove()
  const elements = [...figure.elements.values()].filter(e => e instanceof Element2D) as Element2D[]
  const elementsFiltered = elements.filter(filter)
  for (const element of elementsFiltered) {
    if (element.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < distanceInPixels) {
      possibleElements.push(element)
    }
  }
  if (possibleElements.length === 1) return possibleElements[0]
  else if (possibleElements.length > 1) {
    const elementText = new TextByPosition(figure, { x: pointerX + defaultDeltaXModal, y: Math.min(pointerY, figure.yMax - 2), text: '' })
    elementText.draw()
    figure.modal = elementText.div
    figure.modal.style.pointerEvents = 'auto'
    figure.modal.style.padding = '10px'
    figure.modal.style.overflowY = 'auto'
    figure.modal.style.backgroundColor = colors.titlelight
    figure.modal.style.color = colors.title
    figure.modal.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
    figure.modal.style.touchAction = 'none'
    figure.modal.innerText = 'Quel élément souhaitez-vous sélectionner ?'
    const divs = []
    for (const element of possibleElements) {
      const div = document.createElement('div')
      if (element?.label !== undefined) div.innerText = element.label
      else div.innerText = element.id
      div.addEventListener('click', () => {
        elementText.remove()
        element.color = 'blue'
        return element
      })
      div.addEventListener('mouseenter', () => {
        div.style.backgroundColor = colors.lightest
      })
      div.addEventListener('mouseleave', () => {
        div.style.backgroundColor = colors.titlelight
      })
      div.style.marginTop = '5px'
      div.style.marginLeft = '10px'
      div.style.userSelect = 'none'
      div.style.cursor = 'default'
      divs.push(div)
    }
    for (const div of divs) {
      figure.modal.appendChild(div)
    }
    return undefined
  }
  return undefined
}

export default function handlePointerAction (figure: Figure, event: PointerEvent): void {
  const [pointerX, pointerY] = figure.getPointerCoord(event)
  const element = getClickedElement({ figure, pointerX, pointerY, filter: figure.filter })
  if (figure.machine !== undefined) {
    figure.machine.send('clickLocation', { detail: { x: pointerX, y: pointerY, type: element?.type, element } })
  }
  if (figure.pointerAction === 'drag') {
    if (element !== undefined && element instanceof Point && figure.container !== null) {
      figure.pointInDrag = element
      figure.container.style.cursor = 'move'
    }
  }
}
