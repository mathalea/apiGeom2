import { expect, test } from 'vitest'
import { ApiGeom } from '../src/ApiGeom'

const geo = new ApiGeom()
const A = geo.point(0, 0)
A.name = 'A'
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
  geo.goBack() // 3
  geo.goBack() // 2
  geo.goBack() // 1
  geo.goForward() // 2
  let newA = geo.elements.get('A')
  expect(newA.x).toBe(2)
  geo.goBack() // 1
  geo.goBack() // 0
  geo.goBack() // 0
  geo.goBack() // 0
  geo.goBack() // 0
  geo.goBack() // 0
  geo.goForward() // 1
  newA = geo.elements.get('A')
  expect(newA.x).toBe(1)
  geo.goForward() // 2
  geo.goForward() // 3
  geo.goForward() // 4
  geo.goForward() // 4
  geo.goForward() // 4
  geo.goForward() // 4
  geo.goBack() // 3
  newA = geo.elements.get('A')
  expect(newA.x).toBe(3)
})
