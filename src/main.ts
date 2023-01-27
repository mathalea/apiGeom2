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
const A = figure.create('Point', { x: 0, y: 0, shape: 'o', label: 'A' })
const B = figure.create('Point', { x: 0, y: 3, color: 'blue', label: 'B' })
const s = figure.create('Segment', { point1: A, point2: B })
const l = figure.create('Line', { point1: A, point2: B })
const r = figure.create('Ray', { point1: A, point2: B })
figure.create('PointOnLine', { line: s, k: 0.25, label: 'S' })
figure.create('PointOnLine', { line: l, k: 0.5, label: 'L' })
figure.create('PointOnLine', { line: r, k: 0.75, label: 'R' })
figure.refreshSave()
