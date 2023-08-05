import Figure from '../Figure'

export function createDialoxBoxRadius (figure: Figure): HTMLDialogElement {
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
    if (figure.ui != null) {
      figure.ui.send('RADIUS', { radius: Number(input.value) })
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

export function createDialoxBoxK (figure: Figure): HTMLDialogElement {
  const dialog = document.createElement('dialog')
  dialog.style.border = '1px solid black'
  dialog.style.backgroundColor = 'white'
  dialog.style.padding = '20px'
  const label = document.createElement('label')
  label.innerHTML = 'Coefficient de l\'homothétie : '
  const input = document.createElement('input')
  input.type = 'number'
  input.min = '-10'
  input.max = '10'
  input.style.marginLeft = '10px'
  const button = document.createElement('button')
  button.innerHTML = 'Valider'
  button.style.marginLeft = '10px'
  dialog.appendChild(label)
  dialog.appendChild(input)
  dialog.appendChild(button)
  document.body.appendChild(dialog)
  dialog.addEventListener('close', () => {
    if (figure.ui != null) {
      figure.ui.send('DILATE_COEF', { coefficient: Number(input.value) })
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

export function createDialoxBoxName (figure: Figure): HTMLDialogElement {
  const dialog = document.createElement('dialog')
  dialog.style.border = '1px solid black'
  dialog.style.backgroundColor = 'white'
  dialog.style.padding = '20px'
  const label = document.createElement('label')
  // Si le label est "Nom du point" alors Safari propose de l'autocomplétion même si on a mis autocomplete="off"
  // Hack : on met un nom contenant search pour bloquer l'autocompletion
  label.innerHTML = 'Nom du point'
  const input = document.createElement('input')
  input.type = 'text'
  input.name = 'search'
  input.style.marginLeft = '10px'
  input.setAttribute('autocomplete', 'off')
  input.setAttribute('spellcheck', 'false')
  input.setAttribute('autocorrect', 'off')
  input.setAttribute('autocapitalize', 'none')

  const button = document.createElement('button')
  button.innerHTML = 'Valider'
  button.style.marginLeft = '10px'
  dialog.appendChild(label)
  dialog.appendChild(input)
  dialog.appendChild(button)
  document.body.appendChild(dialog)
  dialog.addEventListener('close', () => {
    if (figure.ui != null) {
      figure.ui.send('TEXT_FROM_DIALOG', { text: input.value })
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

export function createDialoxBoxAngle (figure: Figure): HTMLDialogElement {
  const dialog = document.createElement('dialog')
  dialog.style.border = '1px solid black'
  dialog.style.backgroundColor = 'white'
  dialog.style.padding = '20px'
  const label = document.createElement('label')
  label.innerHTML = 'Angle (en degrés) : '
  const input = document.createElement('input')
  input.type = 'number'
  input.style.marginLeft = '10px'
  input.value = '90'
  const choice = document.createElement('select')
  choice.style.marginLeft = '10px'
  choice.innerHTML = '<option value="-1">Sens horaire</option><option value="1">Sens anti-horaire</option>'
  const button = document.createElement('button')
  button.innerHTML = 'Valider'
  button.style.marginLeft = '10px'
  dialog.appendChild(label)
  dialog.appendChild(input)
  dialog.appendChild(choice)
  dialog.appendChild(button)
  document.body.appendChild(dialog)
  dialog.addEventListener('close', () => {
    const angle = Number(input.value) * parseInt(choice.value)
    if (figure.ui != null) {
      figure.ui.send('ANGLE', { angle })
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
