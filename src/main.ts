import Line from 'elements/lines/Line'
import Figure from './Figure'

// Créé un espace de travail pour une figure géométrique
const figure = new Figure()

// On affiche le svg dans un div
const div = document.querySelector('#app') as HTMLDivElement
div.style.marginTop = '50px'
figure.setContainer(div)

// On affiche la sauvegarde au format json dans un div
const divSave = document.querySelector('#save') as HTMLDivElement
figure.divSave = divSave

// Gestion des boutons de navigation
const btnBack = document.querySelector('#btnBack')
btnBack?.addEventListener('click', () => figure.historyGoBack())
const btnForward = document.querySelector('#btnForward')
btnForward?.addEventListener('click', () => figure.historyGoForward())
const btnSave = document.querySelector('#btnSave')
btnSave?.addEventListener('click', () => {
  navigator.clipboard
    .writeText(figure.divSave?.innerText as string)
    .then(() => { console.log('Figure sauvegardée') })
    .catch(() => console.log('Erreur avec l\'accès au presse-papier'))
})
const btnLoad = document.querySelector('#btnLoad')
btnLoad?.addEventListener('click', () => {
  navigator.clipboard
    .readText()
    .then(
      (clipText) => (figure.loadJson(JSON.parse(clipText), true))
    )
    .catch((error) => console.log('Erreur avec le chargement', error))
})

// Création de la figure
const A = figure.create('Point', { x: 0, y: 0, shape: 'x', label: 'A', thickness: 0.8 })
const B = figure.create('Point', { x: 6, y: -1, shape: 'x', label: 'B', thickness: 0.8 })
const C = figure.create('Point', { x: 4, y: 4, label: 'C' })
const p = figure.create('Polygon', { points: [A, B, C] })
// // p.createSegments()
// const H = figure.create('PointByProjection', { origin: A, line: p.segments[1], label: 'H' })
// const I = figure.create('PointByProjection', { origin: B, line: p.segments[2], label: 'I' })
// const J = figure.create('PointByProjection', { origin: C, line: p.segments[0], label: 'J' })
// const h1 = figure.create('Segment', { point1: A, point2: H, color: 'red' })
// const h2 = figure.create('Segment', { point1: B, point2: I, color: 'red' })
// const h3 = figure.create('Segment', { point1: C, point2: J, color: 'red' })
// const c = figure.create('CircleCenterPoint', {center: H, point: I, color: 'blue'})
// const dH = figure.create('Line', { point1: H, point2: I, color: 'blue', isDashed: true })
// dH.hide()
// if (!H.isOnline(p.segments[1])) {
//   dH.sho
// }

figure.create('Polygon', { points: [A, B, C] })
const dynamicAngle = figure.create('Angle', { start: A, center: B, end: C })
const half = (array: number[]): number => array[0] / 2
const halfAngle = figure.create('DynamicCalcul', { dynamicNumbers: [dynamicAngle], calculus: half })
dynamicAngle.display({ x: -3, y: 0 })
figure.create('ArcBy3PointsAndRadius', { start: B, center: A, end: C, radius: 1, addBorders: true, fillColor: 'blue', fillOpacity: 0.1 })
figure.create('ArcBy3PointsAndRadius', { start: B, center: C, end: A, radius: 1, addBorders: true, fillColor: 'aquablue' })
figure.create('Arc', { start: A, center: B, dynamicAngle: halfAngle, addBorders: true })
