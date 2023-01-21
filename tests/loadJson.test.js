import { expect, test } from 'vitest'
import Figure from 'src/Figure'

/**
 * On charge une figure avec intersection de deux droites "parent" de segment, milieu et cercle
 * On déplace des points, on les remet à la position initiale et on vérifie que le json généré est identique
 * à celui de départ.
 */
const save = {
  apiGeomVersion: 0.1,
  element1: {
    type: 'Point',
    id: 'element1',
    x: 4,
    y: 1,
    label: 'B',
    shape: 'x',
    size: 0.1,
    color: 'blue',
    thickness: 1,
    isDashed: false,
    isVisible: true
  },
  element2: {
    type: 'Point',
    id: 'element2',
    x: 2,
    y: 4,
    label: 'C',
    shape: 'x',
    size: 0.1,
    color: 'blue',
    thickness: 1,
    isDashed: false,
    isVisible: true
  },
  element4: {
    type: 'VectorByPoints',
    id: 'element4',
    idPoint1: 'element1',
    idPoint2: 'element2',
    color: 'black',
    thickness: 1,
    isDashed: false,
    isVisible: true
  },
  element0: {
    type: 'Point',
    id: 'element0',
    x: 0,
    y: 0,
    label: 'M',
    shape: 'x',
    size: 0.1,
    color: 'black',
    thickness: 1,
    isDashed: false,
    isVisible: true
  },
  element3: {
    type: 'Polygon',
    idPoints: [
      'element0',
      'element1',
      'element2'
    ],
    id: 'element3',
    color: 'black',
    thickness: 1,
    isDashed: false,
    isVisible: true
  }
}

const geo = new Figure()
geo.loadJson(save)

test('Chargement', () => {
  expect(save).toEqual(JSON.parse(geo.json))
  const A = geo.elements.get('element1')
  A.moveTo(1, 1)
  A.moveTo(4, 1)
  const C = geo.elements.get('element2')
  C.moveTo(6, 2)
  C.moveTo(2, 4)
  expect(save).toEqual(JSON.parse(geo.json))
})
