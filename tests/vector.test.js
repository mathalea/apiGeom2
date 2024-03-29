import { expect, test } from 'vitest'
import Figure from '../src/Figure'

const figure = new Figure()
const A = figure.create('Point', { x: -1, y: -1 })
const B = figure.create('Point', { x: 5, y: -1 })
const O = figure.create('Point', { x: -4, y: -7 })
const v1 = figure.create('Vector', { x: 2, y: 2, origin: O })
const v2 = figure.create('VectorByPoints', { point1: A, point2: B, origin: O })
const v3 = figure.create('VectorByPoints', { point1: A, point2: B })

test('Vecteurs', () => {
  expect(v1.representation.point2.x).toBe(-2)
  expect(v2.representation.point2.x).toBe(2)
  expect(v3.x).toBe(6)
  B.moveTo(1, -5)
  O.moveTo(-10, -10)
  expect(v1.representation.point2.x).toBe(-8)
  expect(v2.representation.point2.x).toBe(-8)
  expect(v3.x).toBe(2)
})
