import { ApiGeom } from './ApiGeom'

// Créé un espace de travail pour une figure géométrique
const geo = new ApiGeom()

// On affiche le svg dans un div
const div = document.querySelector('#app')
div?.appendChild(geo.svg)

// On affiche la sauvegarde au format json dans un div
const divSave = document.querySelector('#save') as HTMLDivElement
geo.divSave = divSave

// Gestion des boutons de navigation
const btnBack = document.querySelector('#btnBack')
btnBack?.addEventListener('click', () => geo.goBack())
const btnForward = document.querySelector('#btnForward')
btnForward?.addEventListener('click', () => geo.goForward())

// Création de la figure
const A = geo.point(0, 0)
const B = geo.point(5, 0)
const C = geo.point(2, 6)
const sAB = geo.segment(A, B)
const sAC = geo.segment(A, C)
const sBC = geo.segment(B, C)

// Sauvegarde de la figure et affichage de cette sauvegarde
geo.refreshSave()

// Pour éviter les alertes unused vars...
const doNothing = (a: object): object => { return a }
doNothing({ sAB, sAC, sBC })
