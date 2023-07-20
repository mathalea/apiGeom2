import { expect, test } from 'vitest'
import Figure from '../src/Figure'

const figure = new Figure()
const A = figure.create('Point', { x: 0, y: 0 })
const B = figure.create('Point', { x: 5, y: 0 })
const O = figure.create('Point', { x: -4, y: -7 })
const c1 = figure.create('CircleCenterPoint', { center: A, point: B })
const dAB = figure.create('Distance', { point1: A, point2: B })
const c2 = figure.create('CircleCenterDynamicRadius', { center: O, radius: dAB })
A.moveTo(1, 1)
B.moveTo(8, 1)
const r1 = c1.groupSvg.getAttribute('r') / figure.pixelsPerUnit
const cx = figure.sxTox(c1.groupSvg.getAttribute('cx'))
const cy = figure.syToy(c1.groupSvg.getAttribute('cy'))
const r2 = c2.groupSvg.getAttribute('r') / figure.pixelsPerUnit

test('Cercle Centre-Point ou Centre-Distance', () => {
  expect(r1).toBe(7)
  expect(r2).toBe(7)
  expect(cx).toBe(1)
  expect(cy).toBe(1)
})
