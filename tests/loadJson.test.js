import { expect, test } from 'vitest'
import Figure from 'src/Figure'

/**
 * On charge une figure avec intersection de deux droites "parent" de segment, milieu et cercle
 * On déplace des points, on les remet à la position initiale et on vérifie que le json généré est identique
 * à celui de départ.
 */
const save = {
  apiGeomVersion: 0.1,
  element0: {
    type: 'Point',
    x: 0,
    y: 0,
    label: 'A',
    shape: 'x',
    size: 0.1,
    id: 'element0',
    color: 'black',
    thickness: 1,
    isDashed: false,
    isVisible: true
  },
  element1: {
    type: 'Point',
    x: 4,
    y: 1,
    label: 'B',
    shape: 'x',
    size: 0.1,
    id: 'element1',
    color: 'blue',
    thickness: 1,
    isDashed: false,
    isVisible: true
  },
  element2: {
    type: 'Point',
    x: 2,
    y: 4,
    label: 'C',
    shape: 'x',
    size: 0.1,
    id: 'element2',
    color: 'blue',
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
  },
  element4: {
    type: 'VectorByPoints',
    idPoint1: 'element1',
    idPoint2: 'element2',
    color: 'black',
    thickness: 1,
    isDashed: false,
    isVisible: true
  },
  element5: {
    type: 'LineByPointVector',
    idPoint: 'element0',
    idVector: 'element4',
    id: 'element5',
    color: 'black',
    thickness: 1,
    isDashed: false
  },
  element6: {
    type: 'LinePerpendicular',
    idLine: 'element3_segment0',
    idPoint: 'element2',
    id: 'element6',
    color: 'black',
    thickness: 1,
    isDashed: false
  },
  element7: {
    type: 'LineParallel',
    idLine: 'element3_segment0',
    idPoint: 'element2',
    id: 'element7',
    color: 'black',
    thickness: 1,
    isDashed: false
  },
  element8: {
    type: 'LineParallel',
    idLine: 'element3_segment1',
    idPoint: 'element0',
    id: 'element8',
    color: 'black',
    thickness: 1,
    isDashed: false
  },
  element9: {
    type: 'LineParallel',
    idLine: 'element3_segment2',
    idPoint: 'element1',
    id: 'element9',
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
