import { ApiGeomPlus } from './ApiGeomPlus'
import { Middle } from './elements/Points/Middle'
import { DisplayDistance } from './elements/Text/DisplayDistance'

// Créé un espace de travail pour une figure géométrique
const geo = new ApiGeomPlus()

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
const A = geo.point(-2, 1, { name: 'A' })
const B = geo.point(5, 1.3, { name: 'B' })
const C = geo.point(1, 0, { name: 'C' })
const D = geo.point(7, 3, { name: 'D' })
const E = geo.point(-2, -5, { name: 'E' })

const AB = geo.ray(A, B, { isDashed: true })
const CD = geo.ray(C, D, { thickness: 2, color: 'blue' })
const O = geo.pointIntersectionLL(AB, CD, { size: 0.1, color: 'orange', name: 'O' })
const c = geo.circle(O, 3)
const OA = geo.ray(E, O)
const M = new Middle(geo, O, E, { name: 'M' })
const display = new DisplayDistance(geo, -6, -3, A, O)
// Sauvegarde de la figure et affichage de cette sauvegarde
geo.refreshSave()

// Pour éviter les alertes unused vars...
const doNothing = (a: object): object => { return a }
doNothing({ A, B, AB, CD, O, c, OA, M, display })
