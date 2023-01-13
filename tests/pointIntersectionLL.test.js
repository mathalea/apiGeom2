import { expect, test } from 'vitest'
import Figure from '../src/Figure'

const geo = new Figure()
const A = geo.create('Point', { x: 0, y: 0 })
const B = geo.create('Point', { x: 5, y: 0 })
const C = geo.create('Point', { x: 4, y: 10 })
const D = geo.create('Point', { x: 4, y: -10 })
const AB = geo.create('Line', { point1: A, point2: B })
const CD = geo.create('Line', { point1: C, point2: D })
const O = geo.create('PointIntersectionLL', { line1: AB, line2: CD })

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
