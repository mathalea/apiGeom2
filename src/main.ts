import { ApiGeom } from './ApiGeom'

// Créé un espace de travail pour une figure géométrique
const geo = new ApiGeom()

// On affiche le svg dans un div
const div = document.querySelector('#app') as HTMLDivElement
geo.div = div

// On affiche la sauvegarde au format json dans un div
const divSave = document.querySelector('#save') as HTMLDivElement
geo.divSave = divSave

// Gestion des boutons de navigation
const btnBack = document.querySelector('#btnBack')
btnBack?.addEventListener('click', () => geo.goBack())
const btnForward = document.querySelector('#btnForward')
btnForward?.addEventListener('click', () => geo.goForward())

// Création de la figure
const A = geo.point(3, 0)
const B = geo.point(6, 0, { name: 'B', style: 'o' })
const C = geo.point(4, 6, { name: 'C', color: 'green', size: 0.3, thickness: 3 })
const sAB = geo.segment(A, B)
const sAC = geo.segment(A, C)
const sBC = geo.segment(B, C)
const tA = geo.textByPoint(A, '\\dfrac{3}{4}')
const tB = geo.textByPosition(0, 0, 'X', { isLatex: false })
const tC = geo.textByPoint(B, '\\dfrac{3\\pi}{4x}', { color: 'green', dx: 0.8, dy: 0.8 })

// Sauvegarde de la figure et affichage de cette sauvegarde
geo.refreshSave()

// Pour éviter les alertes unused vars...
const doNothing = (a: object): object => { return a }
doNothing({ sAB, sAC, sBC, tA, tB, tC })
