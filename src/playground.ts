import Figure from './Figure'

// Créé un espace de travail pour une figure géométrique
const figure = new Figure()

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

// Création de la figure

figure.setContainer(div)
const A = figure.create('Point', { x: 0, y: 0 })
const B = figure.create('Point', { x: 5, y: 0 })
const AB = figure.create('Line', { point1: A, point2: B })
const C = figure.create('Point', { x: 10, y: 2 })
figure.create('LineParallel', { line: AB, point: C })
