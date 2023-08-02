import { expect, test } from 'vitest'
import Figure from '../src/Figure'

const figure = new Figure()
const A = figure.create('Point', { x: 0, y: 0 })
A.moveTo(1, 1)
figure.saveState()
A.moveTo(2, 2)
figure.saveState()
A.moveTo(3, 3)
figure.saveState()
A.moveTo(4, 4)
figure.saveState()

test('Point - Segment - Couleur', () => {
  figure.undo() // 3
  figure.undo() // 2
  figure.undo() // 1
  figure.redo() // 2
  let newA = figure.elements.get(A.id)
  expect(newA.x).toBe(2)
  figure.undo() // 1
  figure.undo() // 0
  figure.undo() // 0
  figure.undo() // 0
  figure.undo() // 0
  figure.undo() // 0
  figure.redo() // 1
  newA = figure.elements.get(A.id)
  expect(newA.x).toBe(1)
  figure.redo() // 2
  figure.redo() // 3
  figure.redo() // 4
  figure.redo() // 4
  figure.redo() // 4
  figure.redo() // 4
  figure.undo() // 3
  newA = figure.elements.get(A.id)
  expect(newA.x).toBe(3)
})
