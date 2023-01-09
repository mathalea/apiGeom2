import { expect, test } from 'vitest'
import { ApiGeomPlus } from '../src/ApiGeomPlus'

const geo = new ApiGeomPlus()
const A = geo.point(4, 5)
const B = geo.point(8, -12, { style: 'o' })
const C = geo.point(9, 6, { id: 'H' })
const sAB = geo.segment(A, B, { color: 'blue' })
const sAH = geo.segment(A, 'H')
sAH.thickness = 3

test('Point - Segment - Couleur', () => {
  expect(A.x).toBe(4)
  expect(B.y).toBe(-12)
  expect(C.id).toBe('H')
  expect(sAB.type).toBe('Segment')
  expect(sAB.color).toBe('blue')
  expect(sAH.color).toBe('black')
  expect(sAH.thickness).toBe(3)
  const x = -5
  A.x = x
  expect(sAB.groupSvg.getAttribute('x1')).toBe(geo.xToSx(x).toString())
})
