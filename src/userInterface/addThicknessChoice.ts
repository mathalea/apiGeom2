import type Figure from '../Figure'

export default function addThicknessChoice (figure: Figure): HTMLDivElement {
  const div = document.createElement('div')
  div.style.marginTop = '30px'
  div.style.fontWeight = 'bold'
  const title = document.createElement('div')
  title.style.marginBottom = '10px'
  title.textContent = `Épaisseur : ${figure.options.thickness}`
  const range = document.createElement('input')
  range.type = 'range'
  range.value = `${figure.options.thickness}`
  range.min = '1'
  range.max = '4'
  div.appendChild(title)
  div.appendChild(range)
  range.addEventListener('input', () => {
    figure.options.thickness = Number(range.value)
    title.textContent = `Épaisseur : ${figure.options.thickness}`
  })
  return div
}
