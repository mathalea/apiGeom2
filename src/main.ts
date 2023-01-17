import Figure from './Figure'

// Créé un espace de travail pour une figure géométrique
const geo = new Figure()

// On affiche le svg dans un div
const div = document.querySelector('#app') as HTMLDivElement
geo.div = div

// On affiche la sauvegarde au format json dans un div
const divSave = document.querySelector('#save') as HTMLDivElement
geo.divSave = divSave

// Gestion des boutons de navigation
const btnBack = document.querySelector('#btnBack')
btnBack?.addEventListener('click', () => geo.historyGoBack())
const btnForward = document.querySelector('#btnForward')
btnForward?.addEventListener('click', () => geo.historyGoForward())
const btnSave = document.querySelector('#btnSave')
btnSave?.addEventListener('click', () => {
  navigator.clipboard
    .writeText(geo.divSave?.innerText as string)
    .then(() => { console.log('Figure sauvegardée') })
    .catch(() => console.log('Erreur avec l\'accès au presse-papier'))
})
const btnLoad = document.querySelector('#btnLoad')
btnLoad?.addEventListener('click', () => {
  navigator.clipboard
    .readText()
    .then(
      (clipText) => (geo.loadJson(JSON.parse(clipText), true))
    )
    .catch((error) => console.log('Erreur avec le chargement', error))
})

// Création de la figure
const A = geo.create('Point', { x: 0, y: 0, shape: 'x', labelDx: -0.6, labelDy: 0.3, label: 'A' })
const B = geo.create('Point', { x: 7, y: 2, color: 'blue', label: 'B' })
const C = geo.create('Point', { x: 3, y: 5, label: 'C' })
const p = geo.create('Polygon', { points: [A, B, C], color: 'purple', thickness: 2 })
const a = geo.create('Middle', { point1: B, point2: C, shape: '' })
const b = geo.create('Middle', { point1: A, point2: C, shape: '' })
const c = geo.create('Middle', { point1: A, point2: B, shape: '' })
const mediatrice1 = geo.create('LinePerpendicular', { line: p.segments[0], point: c, isDashed: true })
const mediatrice2 = geo.create('LinePerpendicular', { line: p.segments[1], point: a, isDashed: true })
geo.create('LinePerpendicular', { line: p.segments[2], point: b, isDashed: true })
const O = geo.create('PointIntersectionLL', { line1: mediatrice1, line2: mediatrice2, label: 'O', shape: 'o' })
geo.create('CircleCenterPoint', { center: O, point: A, thickness: 2, color: 'blue' })
geo.refreshSave()
