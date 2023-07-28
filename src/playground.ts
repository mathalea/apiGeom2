import Figure from './Figure'
import { interpret } from 'xstate'
import ui from './uiMachine'

// Créé un espace de travail pour une figure géométrique
const figure = new Figure()

const machineWithContext = ui.withContext({ figure })
figure.ui = interpret(machineWithContext).start()

// On affiche le svg dans un div
const div = document.querySelector('#app') as HTMLDivElement
div.style.marginTop = '50px'
div.style.marginLeft = '50px'

// On affiche la sauvegarde au format json dans un div
const divSave = document.querySelector('#save') as HTMLDivElement
figure.divSave = divSave

// Gestion des boutons de navigation
const btnBack = document.querySelector('#btnBack')
btnBack?.addEventListener('click', () => { figure.historyGoBack() })
const btnForward = document.querySelector('#btnForward')
btnForward?.addEventListener('click', () => { figure.historyGoForward() })
const btnSave = document.querySelector('#btnSave')
btnSave?.addEventListener('click', () => {
  navigator.clipboard
    .writeText(figure.divSave?.innerText as string)
    .then(() => { console.log('Figure sauvegardée') })
    .catch(() => { console.log('Erreur avec l\'accès au presse-papier') })
})
const btnLoad = document.querySelector('#btnLoad')
btnLoad?.addEventListener('click', () => {
  navigator.clipboard
    .readText()
    .then(
      (clipText) => { figure.loadJson(JSON.parse(clipText), true) }
    )
    .catch((error) => { console.log('Erreur avec le chargement', error) })
})

const btnPoint = document.querySelector('#btnPoint')
btnPoint?.addEventListener('click', () => { figure.ui?.send('POINT') })
const btnDrag = document.querySelector('#btnDrag')
btnDrag?.addEventListener('click', () => { figure.ui?.send('DRAG') })
const btnLine = document.querySelector('#btnLine')
btnLine?.addEventListener('click', () => { figure.ui?.send('LINE') })
const btnSegment = document.querySelector('#btnSegment')
btnSegment?.addEventListener('click', () => { figure.ui?.send('SEGMENT') })
const btnParallel = document.querySelector('#btnParallel')
btnParallel?.addEventListener('click', () => { figure.ui?.send('PARALLEL') })
const btnPerpendicular = document.querySelector('#btnPerpendicular')
btnPerpendicular?.addEventListener('click', () => { figure.ui?.send('PERPENDICULAR') })
const btnPerpendicularBissector = document.querySelector('#btnPerpendicularBissector')
btnPerpendicularBissector?.addEventListener('click', () => { figure.ui?.send('PERPENDICULAR_BISSECTOR') })
const btnPolygon = document.querySelector('#btnPolygon')
btnPolygon?.addEventListener('click', () => { figure.ui?.send('POLYGON') })
const btnCircle = document.querySelector('#btnCircle')
btnCircle?.addEventListener('click', () => { figure.ui?.send('CIRCLE') })
const btnIntersection = document.querySelector('#btnIntersection')
btnIntersection?.addEventListener('click', () => { figure.ui?.send('INTERSECTION') })
const btnPointOn = document.querySelector('#btnPointOn')
btnPointOn?.addEventListener('click', () => { figure.ui?.send('POINT_ON') })
const btnCircleRadius = document.querySelector('#btnCircleRadius')
btnCircleRadius?.addEventListener('click', () => { figure.ui?.send('CIRCLE_RADIUS') })
const btnRemove = document.querySelector('#btnRemove')
btnRemove?.addEventListener('click', () => { figure.ui?.send('REMOVE') })
const btnHide = document.querySelector('#btnHide')
btnHide?.addEventListener('click', () => { figure.ui?.send('HIDE') })

// Création de la figure

figure.setContainer(div)

const A = figure.create('Point', { x: 0, y: 0, label: 'A' })
const B = figure.create('Point', { x: 2, y: 0, label: 'B' })
const c1 = figure.create('CircleCenterPoint', { center: A, point: B })
const c2 = figure.create('CircleCenterPoint', { center: B, point: A })
figure.create('PointsIntersectionCC', { circle1: c1, circle2: c2 })
