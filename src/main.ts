import { ApiGeom } from './ApiGeom'

const geo = new ApiGeom()

const div = document.querySelector('#app')
div?.appendChild(geo.svg)

const A = geo.point(0, 0)
A.name = 'A'
const B = geo.point(0.1, 0.1)
B.name = 'B'
const C = geo.point(4, 0)
const sAB = geo.segment(A, B)
const sAC = geo.segment(A, C)
const sBC = geo.segment(B, C)
A.style = 'o'
B.style = ''

