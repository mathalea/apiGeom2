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
    x: 0,
    y: 0,
    label: 'A',
    shape: 'x',
    size: 0.1,
    id: 'element1',
    color: 'black',
    thickness: 1,
    isDashed: false,
    isVisible: true
  },
  element2: {
    type: 'Point',
    x: 4,
    y: 1,
    label: 'B',
    shape: 'x',
    size: 0.1,
    id: 'element2',
    color: 'blue',
    thickness: 1,
    isDashed: false,
    isVisible: true
  },
  element3: {
    type: 'Point',
    x: 2,
    y: 4,
    label: 'C',
    shape: 'x',
    size: 0.1,
    id: 'element3',
    color: 'blue',
    thickness: 1,
    isDashed: false,
    isVisible: true
  },
  element4: {
    type: 'Polygon',
    idPoints: [
      'element1',
      'element2',
      'element3'
    ],
    id: 'element4',
    color: 'black',
    thickness: 1,
    isDashed: false,
    isVisible: true
  },
  element8: {
    type: 'LinePerpendicular',
    idLine: 'element4_segment0',
    idPoint: 'element3',
    id: 'element8',
    color: 'black',
    thickness: 1,
    isDashed: false
  }
}

const geo = new Figure()
geo.loadJson(save)

test('Chargement', () => {
  expect(save).toEqual(JSON.parse(geo.json))
  // const A = geo.elements.get('element1')
  // A.moveTo(1, 1)
  // A.moveTo(0, 0)
  // const C = geo.elements.get('element5')
  // C.moveTo(6, 2)
  // C.moveTo(3, 5)
  expect(save).toEqual(JSON.parse(geo.json))
})
