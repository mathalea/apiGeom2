import Figure from './Figure'
import * as math from 'mathjs'

// Créé un espace de travail pour une figure géométrique
const figure = new Figure({ pixelsPerUnit: 50, xMin: -5, yMin: -3, xScale: 0.5 })

// On affiche le svg dans un div
const div = document.querySelector('#app') as HTMLDivElement
div.style.marginTop = '50px'

// On affiche la sauvegarde au format json dans un div
const divSave = document.querySelector('#save') as HTMLDivElement
figure.divSave = divSave

// Gestion des boutons de navigation
const btnBack = document.querySelector('#btnBack')
btnBack?.addEventListener('click', () => { figure.historyGoBack() })
const btnForward = document.querySelector('#btnForward')
btnForward?.addEventListener('click', () => { figure.historyGoForward() })
const btnSave = document.querySelector('#btnSave')
btnSave?.addEventListener('click', () => {
  navigator.clipboard
    .writeText(figure.divSave?.innerText as string)
    .then(() => { console.log('Figure sauvegardée') })
    .catch(() => { console.log('Erreur avec l\'accès au presse-papier') })
})
const btnLoad = document.querySelector('#btnLoad')
btnLoad?.addEventListener('click', () => {
  navigator.clipboard
    .readText()
    .then(
      (clipText) => { figure.loadJson(JSON.parse(clipText), true) }
    )
    .catch((error) => { console.log('Erreur avec le chargement', error) })
})
figure.setContainer(div)

// Création de la figure
const f = 'x^3/10 + x*sin(x)'
const f2 = math.derivative(f, 'x').toString()

const graph = figure.create('Graph', { expression: f, thickness: 2, color: 'blue', step: 0.1 })
figure.create('Graph', { expression: f2, thickness: 2, color: 'green', step: 0.1 })
const M = figure.create('PointOnGraph', { graph, thickness: 2, color: 'red', label: 'M' })
M.createSegmentToAxeX()
M.createSegmentToAxeY()
figure.create('Grid', {})
