import { expect, test } from 'vitest'
import { ApiGeomPlus } from '../src/ApiGeomPlus'
import { Distance } from '../src/dynamicNumbers/Distance'

const geo = new ApiGeomPlus()
const A = geo.point(0, 0)
const B = geo.point(5, 0)
const O = geo.point(-4, -7)
const c1 = geo.circleCenterPoint(A, B)
const dAB = new Distance(geo, A, B)
const c2 = geo.circleCenterDistance(O, dAB)
A.moveTo(1, 1)
B.moveTo(8, 1)
const r1 = c1.groupSvg.getAttribute('r') / geo.pixelsPerUnit
const cx = geo.sxTox(c1.groupSvg.getAttribute('cx'))
const cy = geo.syToy(c1.groupSvg.getAttribute('cy'))
const r2 = c2.groupSvg.getAttribute('r') / geo.pixelsPerUnit

test('Cercle Centre-Point ou Centre-Distance', () => {
  expect(r1).toBe(7)
  expect(r2).toBe(7)
  expect(cx).toBe(1)
  expect(cy).toBe(1)
})
