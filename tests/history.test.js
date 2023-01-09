import { expect, test } from 'vitest'
import { ApiGeomPlus } from '../src/ApiGeomPlus'

const geo = new ApiGeomPlus()
const A = geo.point(0, 0)
geo.refreshSave()
A.moveTo(1, 1)
geo.refreshSave()
A.moveTo(2, 2)
geo.refreshSave()
A.moveTo(3, 3)
geo.refreshSave()
A.moveTo(4, 4)
geo.refreshSave()

test('Point - Segment - Couleur', () => {
  geo.historyGoBack() // 3
  geo.historyGoBack() // 2
  geo.historyGoBack() // 1
  geo.historyGoForward() // 2
  let newA = geo.elements.get(A.id)
  expect(newA.x).toBe(2)
  geo.historyGoBack() // 1
  geo.historyGoBack() // 0
  geo.historyGoBack() // 0
  geo.historyGoBack() // 0
  geo.historyGoBack() // 0
  geo.historyGoBack() // 0
  geo.historyGoForward() // 1
  newA = geo.elements.get(A.id)
  expect(newA.x).toBe(1)
  geo.historyGoForward() // 2
  geo.historyGoForward() // 3
  geo.historyGoForward() // 4
  geo.historyGoForward() // 4
  geo.historyGoForward() // 4
  geo.historyGoForward() // 4
  geo.historyGoBack() // 3
  newA = geo.elements.get(A.id)
  expect(newA.x).toBe(3)
})
