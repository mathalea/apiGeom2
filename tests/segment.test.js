import { expect, test } from 'vitest'
import Figure from '../src/Figure'

const geo = new Figure()
const A = geo.create('Point', { x: 4, y: 5 })
const B = geo.create('Point', { x: 8, y: -12, shape: 'o' })
const C = geo.create('Point', { x: 9, y: 6, id: 'C' })
const sAB = geo.create('Segment', { point1: A, point2: B, color: 'blue' })
const sAH = geo.create('Segment', { point1: A, point2: geo.elements.get('C') })
sAH.thickness = 3

test('Point - Segment - Couleur', () => {
  expect(A.x).toBe(4)
  expect(B.y).toBe(-12)
  expect(C.id).toBe('C')
  expect(sAB.type).toBe('Segment')
  expect(sAB.color).toBe('blue')
  expect(sAH.color).toBe('black')
  expect(sAH.thickness).toBe(3)
  const x = -5
  A.x = x
  expect(sAB.groupSvg.getAttribute('x1')).toBe(geo.xToSx(x).toString())
})
