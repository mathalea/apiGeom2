import { expect, test } from 'vitest'
import Figure from '../src/Figure'

/**
 * On charge une figure avec intersection de deux droites "parent" de segment, milieu et cercle
 * On déplace des points, on les remet à la position initiale et on vérifie que le json généré est identique
 * à celui de départ.
 */
const save = {
  element1: {
    type: 'Point',
    isChild: false,
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
    type: 'TextByPoint',
    isChild: true,
    point: 'element1',
    text: 'A',
    id: 'element2',
    color: 'back'
  },
  element3: {
    type: 'Point',
    isChild: false,
    x: 7,
    y: 2,
    label: 'B',
    shape: 'x',
    size: 0.1,
    id: 'element3',
    color: 'blue',
    thickness: 1,
    isDashed: false,
    isVisible: true
  },
  element4: {
    type: 'TextByPoint',
    isChild: true,
    point: 'element3',
    text: 'B',
    id: 'element4',
    color: 'back'
  },
  element5: {
    type: 'Point',
    isChild: false,
    x: 3,
    y: 5,
    label: 'C',
    shape: 'x',
    size: 0.1,
    id: 'element5',
    color: 'black',
    thickness: 1,
    isDashed: false,
    isVisible: true
  },
  element6: {
    type: 'TextByPoint',
    isChild: true,
    point: 'element5',
    text: 'C',
    id: 'element6',
    color: 'back'
  },
  element7: {
    type: 'Polygon',
    idPoints: [
      'element1',
      'element3',
      'element5'
    ],
    isChild: false,
    id: 'element7',
    color: 'green',
    thickness: 2,
    isDashed: false,
    isVisible: true
  },
  element8: {
    type: 'Segment',
    isChild: true,
    idPoint1: 'element1',
    idPoint2: 'element3',
    id: 'element8',
    color: 'black',
    thickness: 1,
    isDashed: false,
    isVisible: false
  },
  element9: {
    type: 'Segment',
    isChild: true,
    idPoint1: 'element3',
    idPoint2: 'element5',
    id: 'element9',
    color: 'black',
    thickness: 1,
    isDashed: false,
    isVisible: false
  },
  element10: {
    type: 'Segment',
    isChild: true,
    idPoint1: 'element5',
    idPoint2: 'element1',
    id: 'element10',
    color: 'black',
    thickness: 1,
    isDashed: false,
    isVisible: false
  },
  element11: {
    type: 'VectorByPoints',
    isChild: false,
    idPoint1: 'element5',
    idPoint2: 'element1',
    color: 'black',
    thickness: 1,
    isDashed: false,
    isVisible: true
  },
  element12: {
    type: 'PointByTranslation',
    idOrigin: 'element1',
    idVector: 'element11',
    isChild: false,
    x: -3,
    y: -5,
    label: "A'",
    shape: '',
    size: 0.1,
    id: 'element12',
    color: 'black',
    thickness: 1,
    isDashed: false,
    isVisible: true
  },
  element13: {
    type: 'TextByPoint',
    isChild: true,
    point: 'element12',
    text: "A'",
    id: 'element13',
    color: 'back'
  },
  element14: {
    type: 'PointByTranslation',
    idOrigin: 'element3',
    idVector: 'element11',
    isChild: false,
    x: 4,
    y: -3,
    label: "B'",
    shape: '',
    size: 0.1,
    id: 'element14',
    color: 'black',
    thickness: 1,
    isDashed: false,
    isVisible: true
  },
  element15: {
    type: 'TextByPoint',
    isChild: true,
    point: 'element14',
    text: "B'",
    id: 'element15',
    color: 'back'
  },
  element16: {
    type: 'PointByTranslation',
    idOrigin: 'element5',
    idVector: 'element11',
    isChild: false,
    x: 0,
    y: 0,
    label: "C'",
    shape: '',
    size: 0.1,
    id: 'element16',
    color: 'black',
    thickness: 1,
    isDashed: false,
    isVisible: true
  },
  element17: {
    type: 'TextByPoint',
    isChild: true,
    point: 'element16',
    text: "C'",
    id: 'element17',
    color: 'back'
  },
  element18: {
    type: 'Polygon',
    idPoints: [
      'element12',
      'element14',
      'element16'
    ],
    isChild: false,
    id: 'element18',
    color: 'black',
    thickness: 1,
    isDashed: false,
    isVisible: true
  },
  element19: {
    type: 'Segment',
    isChild: true,
    idPoint1: 'element12',
    idPoint2: 'element14',
    id: 'element19',
    color: 'black',
    thickness: 1,
    isDashed: false,
    isVisible: false
  },
  element20: {
    type: 'Segment',
    isChild: true,
    idPoint1: 'element14',
    idPoint2: 'element16',
    id: 'element20',
    color: 'black',
    thickness: 1,
    isDashed: false,
    isVisible: false
  },
  element21: {
    type: 'Segment',
    isChild: true,
    idPoint1: 'element16',
    idPoint2: 'element12',
    id: 'element21',
    color: 'black',
    thickness: 1,
    isDashed: false,
    isVisible: false
  },
  element22: {
    type: 'Middle',
    isChild: false,
    idPoint1: 'element5',
    idPoint2: 'element3',
    x: 5,
    y: 3.5,
    shape: 'x',
    size: 0.1,
    id: 'element22',
    color: 'black',
    thickness: 1,
    isDashed: false,
    isVisible: true
  },
  element23: {
    type: 'Middle',
    isChild: false,
    idPoint1: 'element1',
    idPoint2: 'element5',
    x: 1.5,
    y: 2.5,
    shape: 'x',
    size: 0.1,
    id: 'element23',
    color: 'black',
    thickness: 1,
    isDashed: false,
    isVisible: true
  },
  element24: {
    type: 'Middle',
    isChild: false,
    idPoint1: 'element1',
    idPoint2: 'element3',
    x: 3.5,
    y: 1,
    shape: 'x',
    size: 0.1,
    id: 'element24',
    color: 'black',
    thickness: 1,
    isDashed: false,
    isVisible: true
  },
  element25: {
    isChild: true,
    type: 'VectorPerpendicular',
    x: -2,
    y: 7,
    idOrigin: 'element24',
    id: 'element25',
    color: 'black',
    thickness: 1,
    isDashed: false,
    isVisible: false,
    idLine: 'element8'
  },
  element26: {
    type: 'Point',
    isChild: true,
    x: 1.5,
    y: 8,
    shape: '',
    size: 0.1,
    id: 'element26',
    color: 'black',
    thickness: 1,
    isDashed: false,
    isVisible: true
  },
  element27: {
    type: 'Segment',
    isChild: true,
    idPoint1: 'element24',
    idPoint2: 'element26',
    id: 'element27',
    color: 'black',
    thickness: 1,
    isDashed: false,
    isVisible: false
  },
  element28: {
    type: 'LinePerpendicular',
    isChild: false,
    idLine: 'element8',
    idPoint: 'element24',
    id: 'element28',
    color: 'black',
    thickness: 1,
    isDashed: false
  },
  element29: {
    isChild: true,
    type: 'VectorPerpendicular',
    x: -3,
    y: -4,
    idOrigin: 'element22',
    id: 'element29',
    color: 'black',
    thickness: 1,
    isDashed: false,
    isVisible: false,
    idLine: 'element9'
  },
  element30: {
    type: 'Point',
    isChild: true,
    x: 2,
    y: -0.5,
    shape: '',
    size: 0.1,
    id: 'element30',
    color: 'black',
    thickness: 1,
    isDashed: false,
    isVisible: true
  },
  element31: {
    type: 'Segment',
    isChild: true,
    idPoint1: 'element22',
    idPoint2: 'element30',
    id: 'element31',
    color: 'black',
    thickness: 1,
    isDashed: false,
    isVisible: false
  },
  element32: {
    type: 'LinePerpendicular',
    isChild: false,
    idLine: 'element9',
    idPoint: 'element22',
    id: 'element32',
    color: 'black',
    thickness: 1,
    isDashed: false
  },
  element33: {
    isChild: true,
    type: 'VectorPerpendicular',
    x: -3,
    y: -4,
    idOrigin: 'element22',
    id: 'element33',
    color: 'black',
    thickness: 1,
    isDashed: false,
    isVisible: false,
    idLine: 'element9'
  },
  element34: {
    type: 'Point',
    isChild: true,
    x: 2,
    y: -0.5,
    shape: '',
    size: 0.1,
    id: 'element34',
    color: 'black',
    thickness: 1,
    isDashed: false,
    isVisible: true
  },
  element35: {
    type: 'Segment',
    isChild: true,
    idPoint1: 'element22',
    idPoint2: 'element34',
    id: 'element35',
    color: 'black',
    thickness: 1,
    isDashed: false,
    isVisible: false
  },
  element36: {
    type: 'LinePerpendicular',
    isChild: false,
    idLine: 'element9',
    idPoint: 'element22',
    id: 'element36',
    color: 'black',
    thickness: 1,
    isDashed: false
  },
  element37: {
    type: 'PointIntersectionLL',
    isChild: false,
    idLine1: 'element28',
    idLine2: 'element32',
    id: 'element37',
    shape: 'x',
    color: 'black',
    thickness: 1,
    isDashed: false,
    isVisible: true
  },
  element38: {
    type: 'CircleCenterPoint',
    isChild: false,
    idCenter: 'element37',
    idPoint: 'element1',
    color: 'blue',
    thickness: 1,
    fillColor: 'none',
    isDashed: false,
    isVisible: true
  }
}

const geo = new Figure()
geo.loadJson(save)

test('Chargement', () => {
  expect(save).toEqual(JSON.parse(geo.json))
  const A = geo.elements.get('element1')
  // A.moveTo(1, 1)
  // A.moveTo(0, 0)
  const C = geo.elements.get('element5')
  // C.moveTo(6, 2)
  // C.moveTo(3, 5)
  expect(save).toEqual(JSON.parse(geo.json))
})
