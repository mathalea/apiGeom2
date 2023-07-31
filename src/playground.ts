import Figure from './Figure'
import { interpret } from 'xstate'
import ui from './uiMachine'

// On affiche le svg dans un div
const div = document.querySelector('#app') as HTMLDivElement
const figure = new Figure({ width: 0.95 * (document.documentElement.clientWidth - 200), height: 0.8 * window.innerHeight })
const machineWithContext = ui.withContext({ figure })
figure.ui = interpret(machineWithContext).start()

// On affiche la sauvegarde au format json dans un div
const divSave = document.querySelector('#save') as HTMLDivElement
figure.divSave = divSave

// Gestion des boutons de navigation
const btnBack = document.querySelector('#btnBack')
btnBack?.addEventListener('click', () => { figure.historyGoBack() })
const btnForward = document.querySelector('#btnForward')
btnForward?.addEventListener('click', () => { figure.historyGoForward() })
const btnLoad = document.querySelector('#btnLoad')
btnLoad?.addEventListener('click', () => {
  navigator.clipboard
    .readText()
    .then(
      (clipText) => { figure.loadJson(JSON.parse(clipText), true) }
    )
    .catch((error) => { console.log('Erreur avec le chargement', error) })
})

const divButtons = document.querySelector('#buttons') as HTMLDivElement
divButtons.appendChild(figure.addButtons('SAVE UNDO REDO'))
divButtons.appendChild(figure.addButtons('DRAG HIDE REMOVE'))
divButtons.appendChild(figure.addButtons('POINT POINT_ON POINT_INTERSECTION MIDDLE'))
divButtons.appendChild(figure.addButtons('SEGMENT LINE RAY POLYGON'))
divButtons.appendChild(figure.addButtons('LINE_PARALLEL LINE_PERPENDICULAR'))
divButtons.appendChild(figure.addButtons('PERPENDICULAR_BISECTOR BISECTOR_BY_POINTS'))
divButtons.appendChild(figure.addButtons('CIRCLE_CENTER_POINT CIRCLE_RADIUS'))

// Création de la figure

figure.setContainer(div)

figure.create('Point', { x: 0, y: 0, label: 'A' })
figure.create('Point', { x: 3, y: 0, label: 'B' })
figure.create('Point', { x: 0, y: 3, label: 'C' })
