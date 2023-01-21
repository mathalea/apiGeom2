import Figure from './Figure'

// Créé un espace de travail pour une figure géométrique
const figure = new Figure()

// On affiche le svg dans un div
const div = document.querySelector('#app') as HTMLDivElement
figure.setContainer(div)

// On affiche la sauvegarde au format json dans un div
const divSave = document.querySelector('#save') as HTMLDivElement
figure.divSave = divSave

// Gestion des boutons de navigation
const btnBack = document.querySelector('#btnBack')
btnBack?.addEventListener('click', () => figure.historyGoBack())
const btnForward = document.querySelector('#btnForward')
btnForward?.addEventListener('click', () => figure.historyGoForward())
const btnSave = document.querySelector('#btnSave')
btnSave?.addEventListener('click', () => {
  navigator.clipboard
    .writeText(figure.divSave?.innerText as string)
    .then(() => { console.log('Figure sauvegardée') })
    .catch(() => console.log('Erreur avec l\'accès au presse-papier'))
})
const btnLoad = document.querySelector('#btnLoad')
btnLoad?.addEventListener('click', () => {
  navigator.clipboard
    .readText()
    .then(
      (clipText) => (figure.loadJson(JSON.parse(clipText), true))
    )
    .catch((error) => console.log('Erreur avec le chargement', error))
})

// Création de la figure
const A = figure.create('Point', { x: 0, y: 0, shape: 'x', label: 'A' })
const B = figure.create('Point', { x: 4, y: 1, color: 'blue', label: 'B' })
const C = figure.create('Point', { x: 2, y: 4, color: 'blue', label: 'C' })
const p = figure.create('Polygon', { points: [A, B, C] })
const v = figure.create('VectorByPoints', { point1: B, point2: C })
figure.create('LineByPointVector', { point: A, vector: v })
figure.create('LinePerpendicular', { line: p.segments[0], point: C })
figure.create('LineParallel', { line: p.segments[0], point: C })
figure.create('LineParallel', { line: p.segments[1], point: A })
figure.create('LineParallel', { line: p.segments[2], point: B })
A.remove()
figure.refreshSave()
const M = figure.create('Point', { x: 0, y: 0, shape: 'x', label: 'M' })
figure.create('Polygon', { points: [M, B, C] })
// figure.create('LineParallel', { line: p2.segments[2], point: B })
figure.history = []
figure.refreshSave()
