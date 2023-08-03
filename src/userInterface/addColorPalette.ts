import type Figure from '../Figure'

export default function addColorPalette (colors: string[], figure: Figure): HTMLDivElement {
  const div = document.createElement('div')
  div.style.display = 'flex'
  div.classList.add('apiGeom-color-palette')
  for (const color of colors) {
    const button = document.createElement('button')
    button.style.backgroundColor = color
    button.style.width = '30px'
    button.style.height = '30px'
    button.style.marginRight = '10px'
    button.style.marginLeft = '4px'
    button.style.marginTop = '10px'
    button.style.cursor = 'pointer'
    button.style.borderRadius = '5px'
    button.style.backgroundColor = color
    button.style.border = '1px solid black'
    button.style.padding = '2px'
    button.addEventListener('click', () => {
      figure.options.color = color
      showSelectedColor(figure)
    })
    div.appendChild(button)
  }
  setTimeout(() => { showSelectedColor(figure) }, 100)
  return div
}

function showSelectedColor (figure: Figure): void {
  const buttons = document.querySelectorAll('.apiGeom-color-palette button')
  for (const element of Array.from(buttons)) {
    const button = element as HTMLButtonElement
    if (button.style.backgroundColor === figure.options.color) {
      button.style.boxShadow = '0px 0px 10px 0px rgba(0,0,0,0.75)'
      button.style.transform = 'scale(1.2) translate(1px, 1px'
    } else {
      button.style.boxShadow = ''
      button.style.transform = ''
    }
  }
}

export { showSelectedColor }
