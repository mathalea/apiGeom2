import type Figure from '../Figure'
import Element2D from '../elements/Element2D'
import { colors, defaultDeltaXModal, defaultDistanceClick } from '../elements/defaultValues'
import Point from '../elements/points/Point'
import TextByPosition from '../elements/text/TextByPosition'

export default function handlePointerAction (figure: Figure, event: PointerEvent): void {
  const [pointerX, pointerY] = figure.getPointerCoord(event)
  const [x, y] = [pointerX, pointerY]
  if (figure.filter === undefined) {
    figure.filter = (e) => e instanceof Element2D
  }
  const possibleElements = []
  figure.modal?.remove()
  const elements = [...figure.elements.values()].filter(e => e instanceof Element2D) as Element2D[]
  const elementsFiltered = elements.filter(figure.filter)
  for (const element of elementsFiltered) {
    if (element.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < defaultDistanceClick) {
      possibleElements.push(element)
    }
  }
  if (possibleElements.length === 1) {
    if (figure.pointerAction === 'drag' && possibleElements[0] instanceof Point && figure.container !== null) {
      figure.pointInDrag = possibleElements[0]
      figure.container.style.cursor = 'move'
    }
    sendToMachine(figure, { element: possibleElements[0], x, y })
  } else if (possibleElements.length > 1) {
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
        if (figure.pointerAction === 'drag' && element instanceof Point && figure.container !== null) {
          figure.pointInDrag = element
          figure.container.style.cursor = 'move'
        }
        sendToMachine(figure, { element, x, y })
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
    sendToMachine(figure, { element: undefined, x, y })
  }
}

function sendToMachine (figure: Figure, { element, x, y }: { element?: Element2D, x: number, y: number }): void {
  if (figure.machine !== undefined) {
    figure.machine.send('clickLocation', { element, x, y })
  }
}
