import { ApiGeom } from './ApiGeom'

const geo = new ApiGeom()

const div = document.querySelector('#app')
div?.appendChild(geo.svg)

const A = geo.point(0, 0)
const B = geo.point(4, 0)
const sAB = geo.segment(A, B)
A.x--
A.y--
B.x = 12
console.log(sAB.groupSvg.getAttribute('x1'))
