import { expect, test } from 'vitest'
import Figure from '../src/Figure'

/**
 * On charge une figure avec intersection de deux droites "parent" de segment, milieu et cercle
 * On déplace des points, on les remet à la position initiale et on vérifie que le json généré est identique
 * à celui de départ.
 */
const save = {
  apiGeomVersion: 0.1,
  element0: {
    type: 'Point',
    id: 'element0',
    x: 0,
    y: -3,
    shape: 'x',
    sizeInPixels: 5,
    thickness: 2
  },
  element1: {
    type: 'Point',
    id: 'element1',
    x: 4,
    y: 1,
    shape: 'x',
    sizeInPixels: 5,
    thickness: 2
  },
  element2: {
    type: 'Point',
    id: 'element2',
    x: 2,
    y: 4,
    shape: 'x',
    sizeInPixels: 5,
    thickness: 2
  }
}

const figure = new Figure()
figure.loadJson(save)

test('Chargement', () => {
  expect(save).toEqual(JSON.parse(figure.json))
  const A = figure.elements.get('element1')
  A.moveTo(1, 1)
  A.moveTo(4, 1)
  const C = figure.elements.get('element2')
  C.moveTo(6, 2)
  C.moveTo(2, 4)
  expect(save).toEqual(JSON.parse(figure.json))
})
