import Figure from './Figure'

// Créé un espace de travail pour une figure géométrique
const figure = new Figure()

// On affiche le svg dans un div
const div = document.querySelector('#app') as HTMLDivElement
div.style.marginTop = '50px'

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

// Création de la figure
const A = figure.create('Point', { x: 0, y: 0, label: '\\pi\\times x^2_\\omega' })
const B = figure.create('Point', { x: 4, y: 0, label: 'B' })
const C = figure.create('Point', { x: -1, y: 4, label: 'C' })
const p = figure.create('Polygon', { points: [A, B, C] })
figure.create('PerpendicularBissector', { segment: p.segments[0], color: 'blue', thickness: 2 })
const med1 = figure.create('PerpendicularBissector', { segment: p.segments[1] })
const med2 = figure.create('PerpendicularBissector', { segment: p.segments[2] })
med1.thickness = 2
med1.color = 'blue'
med2.thickness = 2
med2.color = 'blue'
const O = figure.create('PointIntersectionLL', { line1: med1, line2: med2, shape: 'o', size: 0.3 })
const circonscrit = figure.create('CircleCenterPoint', { center: O, point: A })
circonscrit.isDashed = true
circonscrit.thickness = 2
circonscrit.fillColor = 'orange'
circonscrit.fillOpacity = 0.2
figure.create('TextByPosition', { x: -3, y: 3, text: 'Essai de $x^2$ et de $\\frac{3}{4}$' })
figure.setContainer(div)
