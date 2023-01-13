import { expect, test } from 'vitest'
import Figure from '../src/Figure'

const geo = new Figure()
const A = geo.create('Point', { x: 0, y: 0 })
const B = geo.create('Point', { x: 5, y: 0 })
const O = geo.create('Point', { x: -4, y: -7 })
const c1 = geo.create('CircleCenterPoint', { center: A, point: B })
console.log(A, B, A.id, B.id)
const dAB = geo.create('Distance', { point1: A, point2: B })
const c2 = geo.create('CircleCenterDynamicRadius', { center: O, radius: dAB })
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
