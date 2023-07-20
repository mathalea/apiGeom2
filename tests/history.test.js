import { expect, test } from 'vitest'
import Figure from '../src/Figure'

const figure = new Figure()
const A = figure.create('Point', { x: 0, y: 0 })
figure.refreshSave()
A.moveTo(1, 1)
figure.refreshSave()
A.moveTo(2, 2)
figure.refreshSave()
A.moveTo(3, 3)
figure.refreshSave()
A.moveTo(4, 4)
figure.refreshSave()

test('Point - Segment - Couleur', () => {
  figure.historyGoBack() // 3
  figure.historyGoBack() // 2
  figure.historyGoBack() // 1
  figure.historyGoForward() // 2
  let newA = figure.elements.get(A.id)
  expect(newA.x).toBe(2)
  figure.historyGoBack() // 1
  figure.historyGoBack() // 0
  figure.historyGoBack() // 0
  figure.historyGoBack() // 0
  figure.historyGoBack() // 0
  figure.historyGoBack() // 0
  figure.historyGoForward() // 1
  newA = figure.elements.get(A.id)
  expect(newA.x).toBe(1)
  figure.historyGoForward() // 2
  figure.historyGoForward() // 3
  figure.historyGoForward() // 4
  figure.historyGoForward() // 4
  figure.historyGoForward() // 4
  figure.historyGoForward() // 4
  figure.historyGoBack() // 3
  newA = figure.elements.get(A.id)
  expect(newA.x).toBe(3)
})
