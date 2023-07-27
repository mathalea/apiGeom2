import type { eventName, eventOptions } from '../uiMachine'

export function createDialoxBoxRadius (ui?: { send: (e: eventName, opt?: eventOptions) => void }): HTMLDialogElement {
  const dialog = document.createElement('dialog')
  dialog.style.border = '1px solid black'
  dialog.style.backgroundColor = 'white'
  dialog.style.padding = '20px'
  const label = document.createElement('label')
  label.innerHTML = 'Rayon : '
  const input = document.createElement('input')
  input.type = 'number'
  input.style.marginLeft = '10px'
  const button = document.createElement('button')
  button.innerHTML = 'Valider'
  button.style.marginLeft = '10px'
  dialog.appendChild(label)
  dialog.appendChild(input)
  dialog.appendChild(button)
  document.body.appendChild(dialog)
  dialog.addEventListener('close', () => {
    if (ui != null) {
      ui.send('RADIUS', { radius: Number(input.value) })
    }
  })
  button.addEventListener('click', () => {
    dialog.close()
  })
  input.addEventListener('keyup', e => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      e.preventDefault()
      dialog.close()
    }
  })
  return dialog
}
