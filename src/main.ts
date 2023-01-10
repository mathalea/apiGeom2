import { ApiGeomPlus } from './ApiGeomPlus'
import { Distance } from './dynamicNumbers/Distance'
import { CircleCenterDynamicRadius } from './elements/Lines/CircleCenterDyamicRadius'
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
const A = geo.point(3, 0)
const c2 = geo.circle(A, 4, { fillColor: 'blue ', fillOpacity: 0.2 })
const B = geo.point(6, 0, { name: 'B', style: 'o' })
const C = geo.point(4, 6, { name: 'C', color: 'green', size: 0.3, thickness: 3 })
const c = geo.circle(B, 3, { color: 'red', thickness: 4 })
A.name = 'A'
B.name = 'B_1'
const sAB = geo.line(A, B, { color: 'blue' })
const sAC = geo.ray(A, C)
const sBC = geo.segment(B, C)
const dis = new DisplayDistance(geo, 0, -2, A, B)
const distance = new Distance(geo, A, B)
const cD = new CircleCenterDynamicRadius(geo, C, distance)

sAB.thickness = 3

// Sauvegarde de la figure et affichage de cette sauvegarde
geo.refreshSave()

// Pour éviter les alertes unused vars...
const doNothing = (a: object): object => { return a }
doNothing({ sAB, sAC, sBC, c, c2, dis, cD })
