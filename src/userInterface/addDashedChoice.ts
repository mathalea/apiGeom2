import type Figure from '../Figure'
import noDashed from '../assets/svg/noDashed.svg'
import dashed from '../assets/svg/dashed.svg'

export default function addDashedChoice (figure: Figure): HTMLDivElement {
  const div = document.createElement('div')
  div.style.display = 'flex'
  div.classList.add('apiGeom-dashed-choice')
  for (const choice of ['noDashed', 'dashed']) {
    const img = document.createElement('img')
    img.src = choice === 'noDashed' ? noDashed : dashed
    img.title = choice === 'noDashed' ? 'Trait plein' : 'Pointillés'
    img.style.width = '30px'
    img.style.height = '30px'
    img.style.margin = '10px'
    img.style.marginLeft = '4px'
    img.style.marginTop = '30px'
    img.style.cursor = 'pointer'
    img.style.borderRadius = '5px'
    img.style.border = '1px solid black'
    img.style.padding = '2px'
    img.addEventListener('click', () => {
      figure.options.isDashed = choice === 'dashed'
      showSelectedStyle(figure)
    })
    img.id = choice
    div.appendChild(img)
  }
  setTimeout(() => { showSelectedStyle(figure) }, 100)
  return div
}

function showSelectedStyle (figure: Figure): void {
  const dashed = document.querySelectorAll('.apiGeom-dashed-choice img#dashed')
  const noDashed = document.querySelectorAll('.apiGeom-dashed-choice img#noDashed')
  if (figure.options.isDashed) {
    for (const element of Array.from(noDashed)) {
      const image = element as HTMLImageElement
      image.style.boxShadow = ''
      image.style.transform = ''
    }
    for (const element of Array.from(dashed)) {
      const image = element as HTMLImageElement
      image.style.boxShadow = '0px 0px 10px 0px rgba(0,0,0,0.75)'
      image.style.transform = 'scale(1.2) translate(1px, 1px'
    }
  } else {
    for (const element of Array.from(dashed)) {
      const image = element as HTMLImageElement
      image.style.boxShadow = ''
      image.style.transform = ''
    }
    for (const element of Array.from(noDashed)) {
      const image = element as HTMLImageElement
      image.style.boxShadow = '0px 0px 10px 0px rgba(0,0,0,0.75)'
      image.style.transform = 'scale(1.2) translate(1px, 1px'
    }
  }
}

export { showSelectedStyle }
