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
const A = geo.create('Point', { x: -5, y: 0, shape: 'x', label: 'A' })
const B = geo.create('Point', { x: -2, y: 0, color: 'blue', label: 'B' })
const C = geo.create('Point', { x: 3, y: 0, color: 'blue', label: 'C' })
const D = geo.create('Point', { x: 4, y: 0, color: 'blue', label: 'D' })
const c1 = geo.create('CircleCenterPoint', { center: A, point: B })
const c2 = geo.create('CircleCenterPoint', { center: C, point: D })
const M = geo.create('PointIntersectionCC', { circle1: c1, circle2: c2, thickness: 3, color: 'blue' })
const N = geo.create('PointIntersectionCC', { circle1: c1, circle2: c2, thickness: 3, n: 2, color: 'green', shape: 'o' })
geo.create('Segment', { point1: M, point2: N })
geo.refreshSave()
