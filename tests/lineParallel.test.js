import { expect, test } from 'vitest'
import Figure from '../src/Figure'

const geo = new Figure()
const A = geo.create('Point', { x: 0, y: 0 })
const B = geo.create('Point', { x: 5, y: 0 })
const AB = geo.create('Line', { point1: A, point2: B })
const C = geo.create('Point', { x: 10, y: 10 })
const d = geo.create('LineParallel', { line: AB, point: C })

test('Cercle Centre-Point ou Centre-Distance', () => {
  expect(d.point2.y).toBe(10)
  C.moveTo(3, 5)
  expect(d.point2.y).toBe(5)
  B.moveTo(0, 5)
  expect(d.point2.x).toBe(3)
})
