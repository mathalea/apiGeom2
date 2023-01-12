import { FigurePlus } from './FigurePlus'
import DisplayDistance from './elements/text/DisplayDistance'

// Créé un espace de travail pour une figure géométrique
const geo = new FigurePlus()

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
const A = geo.point(-2, 1, { label: 'A' })
const B = geo.point(5, 1.3, { label: 'B' })
const C = geo.point(1, 0, { label: 'C' })
const D = geo.point(7, 3, { label: 'D' })
const E = geo.point(-2, -5, { label: 'E' })

const AB = geo.ray(A, B, { isDashed: true })
const CD = geo.line(C, D, { thickness: 2, color: 'blue' })
const O = geo.pointIntersectionLL(AB, CD, { size: 0.1, color: 'orange', label: 'O' })
const c = geo.circle(O, 3)
const OA = geo.ray(E, O)
const M = geo.middle(O, E, { label: 'M' })
const display = new DisplayDistance(geo, -6, -3, A, O)
// Sauvegarde de la figure et affichage de cette sauvegarde
geo.refreshSave()

// Pour éviter les alertes unused vars...
const doNothing = (a: object): object => { return a }
doNothing({ A, B, AB, CD, O, c, OA, M, display })
