import type Figure from '../Figure'
import Element2D from '../elements/Element2D'
import { colors, defaultDeltaXModal, defaultDistanceClick } from '../elements/defaultValues'
import TextByPosition from '../elements/text/TextByPosition'
import renderMathInElement from 'katex/dist/contrib/auto-render.js'

export default function handlePointerAction (figure: Figure, event: PointerEvent): void {
  const [pointerX, pointerY] = figure.getPointerCoord(event)
  const [x, y] = [pointerX, pointerY]
  const possibleElements = []
  figure.modal?.remove()
  const elements = [...figure.elements.values()].filter(e => e instanceof Element2D) as Element2D[]
  const elementsFiltered = elements.filter(figure.filter).filter(e => e.type !== 'pointer' && e.isVisible && e.isSelectable)
  for (const element of elementsFiltered) {
    if (element.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < defaultDistanceClick) {
      possibleElements.push(element)
    }
  }
  if (possibleElements.length === 1) {
    sendToMachine(figure, { element: possibleElements[0], x, y })
  } else if (possibleElements.length > 1) {
    const elementText = new TextByPosition(figure, { x: pointerX + defaultDeltaXModal, y: Math.min(pointerY, figure.yMax - 2), text: '', isChild: true, isSelectable: false })
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
      div.innerText = (element.description !== '') ? element.description : element.type + ' ' + element.id
      div.addEventListener('click', () => {
        elementText.remove()
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
      renderMathInElement(div, {
        delimiters: [
          { left: '\\[', right: '\\]', display: true },
          { left: '$', right: '$', display: false }
        ],
        preProcess: (chaine: string) => chaine.replaceAll(String.fromCharCode(160), '\\,'),
        throwOnError: true,
        errorColor: '#CC0000',
        strict: 'warn',
        trust: false
      })
    }
    for (const div of divs) {
      figure.modal.appendChild(div)
    }
    sendToMachine(figure, { element: undefined, x, y, waitingWithModal: true })
  } else {
    sendToMachine(figure, { element: undefined, x, y })
  }
}

function sendToMachine (figure: Figure, { element, x, y, waitingWithModal }: { element?: Element2D, x: number, y: number, waitingWithModal?: boolean }): void {
  if (figure.ui !== undefined) {
    figure.ui.send('clickLocation', { element, x, y, waitingWithModal: waitingWithModal ?? false })
  }
}
