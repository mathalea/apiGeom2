import type Figure from '../Figure'

export default function selectionRectangle (figure: Figure): HTMLDivElement {
  const div = document.createElement('div')
  div.style.position = 'absolute'
  div.style.top = '0'
  div.style.left = '0'
  div.style.border = '1px solid black'
  div.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'
  div.style.pointerEvents = 'none'
  div.style.zIndex = '1000'
  const buttonSvg = document.createElement('button')
  buttonSvg.style.position = 'absolute'
  buttonSvg.style.border = '1px solid black'
  buttonSvg.style.pointerEvents = 'auto'
  buttonSvg.style.zIndex = '1001'
  buttonSvg.innerHTML = 'SVG'
  const buttonLatex = document.createElement('button')
  buttonLatex.style.position = 'absolute'
  buttonLatex.style.border = '1px solid black'
  buttonLatex.style.pointerEvents = 'auto'
  buttonLatex.style.zIndex = '1001'
  buttonLatex.innerHTML = 'LaTeX'
  buttonLatex.style.top = '50px'
  buttonLatex.style.right = '10%'
  buttonLatex.style.cursor = 'pointer'
  buttonSvg.style.cursor = 'pointer'
  buttonLatex.style.backgroundColor = 'white'
  buttonSvg.style.backgroundColor = 'white'
  buttonLatex.style.boxShadow = '0px 0px 5px 0px rgba(0,0,0,0.75)'
  buttonSvg.style.boxShadow = '0px 0px 5px 0px rgba(0,0,0,0.75)'
  const container = figure.container
  const rectangleContainer = container.getBoundingClientRect()
  const containerLeft = rectangleContainer.left
  const containerTop = rectangleContainer.top
  container.appendChild(div)
  div.appendChild(buttonSvg)
  div.appendChild(buttonLatex)
  buttonSvg.style.top = '100px'
  buttonSvg.style.right = '10%'
  buttonSvg.style.cursor = 'pointer'
  div.style.width = `${figure.container.clientWidth - 100}px`
  div.style.height = `${figure.container.clientHeight - 200}px`
  let isNearCorner = false
  let isNearLeftCorner = false
  let isNearRightCorner = false
  let isNearTopCorner = false
  let isNearBottomCorner = false
  let isNearTopLeftCorner = false
  let isNearTopRightCorner = false
  let isNearBottomLeftCorner = false
  let isNearBottomRightCorner = false
  window.addEventListener('mousemove', (event) => {
    const rect = div.getBoundingClientRect()
    const x = event.clientX
    const y = event.clientY
    container.style.cursor = 'default'
    if (Math.abs(x - rect.left) < 10) {
      isNearLeftCorner = true
      container.style.cursor = 'ew-resize'
    } else if (Math.abs(x - rect.right) < 10) {
      isNearRightCorner = true
      container.style.cursor = 'ew-resize'
    } else {
      isNearLeftCorner = false
      isNearRightCorner = false
    }
    if (Math.abs(y - rect.top) < 10) {
      isNearTopCorner = true
      container.style.cursor = 'n-resize'
    } else if (Math.abs(y - rect.bottom) < 10) {
      isNearBottomCorner = true
      container.style.cursor = 's-resize'
    } else {
      isNearTopCorner = false
      isNearBottomCorner = false
    }
    if (isNearLeftCorner && isNearTopCorner) {
      isNearTopLeftCorner = true
      container.style.cursor = 'nw-resize'
    } else if (isNearRightCorner && isNearTopCorner) {
      isNearTopRightCorner = true
      container.style.cursor = 'ne-resize'
    } else if (isNearLeftCorner && isNearBottomCorner) {
      isNearBottomLeftCorner = true
      container.style.cursor = 'sw-resize'
    } else if (isNearRightCorner && isNearBottomCorner) {
      isNearBottomRightCorner = true
      container.style.cursor = 'se-resize'
    } else {
      isNearTopLeftCorner = false
      isNearTopRightCorner = false
      isNearBottomLeftCorner = false
      isNearBottomRightCorner = false
    }
    isNearCorner = isNearLeftCorner || isNearRightCorner || isNearTopCorner || isNearBottomCorner || isNearTopLeftCorner || isNearTopRightCorner || isNearBottomLeftCorner || isNearBottomRightCorner
  })

  window.addEventListener('pointerdown', () => {
    if (isNearCorner) {
      const rect = div.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      const left = rect.left
      const top = rect.top
      const resize = (event: MouseEvent): void => {
        const dx = event.clientX - left
        const dy = event.clientY - top
        if (isNearLeftCorner) {
          div.style.left = `${left + dx - containerLeft}px`
          div.style.width = `${width - dx}px`
        } else if (isNearRightCorner) {
          div.style.width = `${dx}px`
        }
        if (isNearTopCorner) {
          div.style.top = `${top + dy - containerTop}px`
          div.style.height = `${height - dy}px`
        } else if (isNearBottomCorner) {
          div.style.height = `${dy}px`
        }
        if (isNearTopLeftCorner) {
          div.style.left = `${left + dx - containerLeft}px`
          div.style.width = `${width - dx}px`
          div.style.top = `${top + dy}px`
          div.style.height = `${height - dy}px`
        } else if (isNearTopRightCorner) {
          div.style.width = `${dx}px`
          div.style.top = `${top + dy}px`
          div.style.height = `${height - dy}px`
        } else if (isNearBottomLeftCorner) {
          div.style.left = `${left + dx - containerLeft}px`
          div.style.width = `${width - dx}px`
          div.style.height = `${dy}px`
        } else if (isNearBottomRightCorner) {
          div.style.width = `${dx}px`
          div.style.height = `${dy}px`
        }
      }
      const stopResize = (): void => {
        window.removeEventListener('pointermove', resize)
        window.removeEventListener('pointerup', stopResize)
      }
      window.addEventListener('pointermove', resize)
      window.addEventListener('pointerup', stopResize)
    }
  })

  buttonSvg.addEventListener('click', () => {
    const rect = div.getBoundingClientRect()
    const xMin = rect.left - containerLeft
    const yMax = rect.top - containerTop
    const width = rect.width
    const height = rect.height
    figure.ui?.send('SELECTION_AREA_TO_SVG', { xMin, yMax, width, height })
  })

  buttonLatex.addEventListener('click', () => {
    const rect = div.getBoundingClientRect()
    const xMin = rect.left - containerLeft
    const yMax = rect.top - containerTop
    const width = rect.width
    const height = rect.height
    figure.ui?.send('SELECTION_AREA_TO_LATEX', { xMin, yMax, width, height })
  })

  return div
}
