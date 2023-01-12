import { expect, test } from 'vitest'
import { ApiGeom } from '../src/ApiGeom'

/**
 * On charge une figure avec intersection de deux droites "parent" de segment, milieu et cercle
 * On déplace des points, on les remet à la position initiale et on vérifie que le json généré est identique
 * à celui de départ.
 */
const save = {
  api1: {
    type: 'Point',
    x: -2,
    y: 1,
    name: 'A',
    shape: 'x',
    size: 0.1,
    id: 'api1',
    color: 'black',
    thickness: 1,
    isDashed: false
  },
  api2: {
    type: 'Point',
    x: 5,
    y: 1.3,
    name: 'B',
    shape: 'x',
    size: 0.1,
    id: 'api2',
    color: 'black',
    thickness: 1,
    isDashed: false
  },
  api3: {
    type: 'Point',
    x: 1,
    y: 0,
    name: 'C',
    shape: 'x',
    size: 0.1,
    id: 'api3',
    color: 'black',
    thickness: 1,
    isDashed: false
  },
  api4: {
    type: 'Point',
    x: 7,
    y: 3,
    name: 'D',
    shape: 'x',
    size: 0.1,
    id: 'api4',
    color: 'black',
    thickness: 1,
    isDashed: false
  },
  api5: {
    type: 'Point',
    x: -2,
    y: -5,
    name: 'E',
    shape: 'x',
    size: 0.1,
    id: 'api5',
    color: 'black',
    thickness: 1,
    isDashed: false
  },
  api6: {
    type: 'Ray',
    idPoint1: 'api1',
    idPoint2: 'api2',
    id: 'api6',
    color: 'black',
    thickness: 1,
    isDashed: true
  },
  api7: {
    type: 'Line',
    idPoint1: 'api3',
    idPoint2: 'api4',
    id: 'api7',
    color: 'blue',
    thickness: 2,
    isDashed: false
  },
  api8: {
    type: 'PointIntersectionLL',
    idLine1: 'api6',
    idLine2: 'api7',
    x: 3.4687499999999947,
    y: 1.2343749999999998,
    name: 'O',
    shape: 'x',
    size: 0.1,
    id: 'api8',
    color: 'orange',
    thickness: 1,
    isDashed: false
  },
  api9: {
    type: 'Circle',
    idCenter: 'api8',
    radius: 3,
    fillColor: 'none',
    id: 'api9',
    color: 'black',
    thickness: 1,
    isDashed: false
  },
  api10: {
    type: 'Ray',
    idPoint1: 'api5',
    idPoint2: 'api8',
    id: 'api10',
    color: 'black',
    thickness: 1,
    isDashed: false
  },
  api11: {
    type: 'Middle',
    idPoint1: 'api8',
    idPoint2: 'api5',
    x: 0.7343749999999973,
    y: -1.8828125,
    name: 'M',
    shape: 'x',
    size: 0.1,
    id: 'api11',
    color: 'black',
    thickness: 1,
    isDashed: false
  },
  api12: {
    type: 'DisplayDistance',
    idPoint1: 'api1',
    idPoint2: 'api8',
    x: -6,
    y: -3,
    id: 'api12',
    color: 'black'
  }
}

const geo = new ApiGeom()
geo.loadJson(save)

test('Chargement', () => {
  expect(save).toEqual(JSON.parse(geo.json))
  const A = geo.elements.get('api1')
  A.moveTo(-1000, 1000)
  A.moveTo(-2, 1)
  const D = geo.elements.get('api4')
  D.moveTo(6, 2)
  D.moveTo(7, 3)
  expect(save).toEqual(JSON.parse(geo.json))
})
