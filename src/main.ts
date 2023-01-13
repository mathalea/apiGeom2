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
const A = geo.create('Point', { x: 0, y: 0, shape: 'o', label: 'A_1', labelDx: -0.6, labelDy: 0.3 })
const B = geo.create('Point', { x: 7, y: 2, color: 'blue', label: '\\mathcal{B}' })
const C = geo.create('Point', { x: 3, y: 6, label: 'C' })
const AB = geo.create('Distance', { point1: A, point2: B })
AB.display({ x: -3, y: -3, textBefore: 'AB~\\approx~', textAfter: '~\\text{cm}', maximumFractionDigits: 1 })
geo.create('Ray', { point1: A, point2: B })
geo.create('Segment', { point1: B, point2: C })
geo.create('Line', { point1: A, point2: C })
const O1 = geo.create('Middle', { point1: A, point2: B, label: 'O_1' })
const O2 = geo.create('Middle', { point1: A, point2: C, label: 'O_2' })
const O3 = geo.create('Middle', { point1: C, point2: B, label: 'O_3' })
geo.create('Segment', { point1: C, point2: O1 })
geo.create('Segment', { point1: B, point2: O2 })
geo.create('Segment', { point1: A, point2: O3 })

geo.refreshSave()
