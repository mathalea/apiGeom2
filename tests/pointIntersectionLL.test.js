import { expect, test } from 'vitest'
import { ApiGeomPlus } from '../src/ApiGeomPlus'

const geo = new ApiGeomPlus()
const A = geo.point(0, 0)
const B = geo.point(5, 0)
const C = geo.point(4, 10)
const D = geo.point(4, -10)
const AB = geo.line(A, B)
const CD = geo.line(C, D)
const O = geo.pointIntersectionLL(AB, CD)

test('Point intersection entre deux droites', () => {
  expect(O.x).toBe(4)
  expect(O.y).equal(0) // O.y = -0 ce qui n'est pas 0...
  A.moveTo(7, 10)
  B.moveTo(7, -10)
  C.moveTo(0, 0)
  D.moveTo(1000, 0)
  expect(O.x).toBe(7)
  expect(O.y).equal(0) // O.y = -0 ce qui n'est pas 0...
})
