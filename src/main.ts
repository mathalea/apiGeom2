import { ApiGeom } from './ApiGeom'

const geo = new ApiGeom()
const btnBack = document.querySelector('#btnBack')
btnBack?.addEventListener('click', () => geo.goBack())
const btnForward = document.querySelector('#btnForward')
btnForward?.addEventListener('click', () => geo.goForward())
const div = document.querySelector('#app')
div?.appendChild(geo.svg)

const A = geo.point(0, 0)
const B = geo.point(5, 0)
const C = geo.point(2, 6)
const sAB = geo.segment(A, B)
const sAC = geo.segment(A, C)
const sBC = geo.segment(B, C)
geo.refreshSave()

// Pour éviter les alertes unused vars...
const doNothing = (a: object): object => { return a }
doNothing({ sAB, sAC, sBC })
