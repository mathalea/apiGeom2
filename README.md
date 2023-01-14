# figure2 - Moteur de géométrie dynamique

## Utilisation

```js
import Figure from './Figure'

// Créé un espace de travail pour une figure géométrique
const geo = new Figure()

// On affiche le svg dans un div
const div = document.querySelector('#app') as HTMLDivElement
geo.div = div

// On affiche la sauvegarde au format json dans un div
const divSave = document.querySelector('#save') as HTMLDivElement
geo.divSave = divSave

// Gestion des boutons de navigation
const btnBack = document.querySelector('#btnBack')
btnBack?.addEventListener('click', () => geo.goBack())
const btnForward = document.querySelector('#btnForward')
btnForward?.addEventListener('click', () => geo.goForward())

// Création de la figure
const A = geo.create('Point', { x: 0, y: 0, shape: 'o', label: 'A', labelDx: -0.6, labelDy: 0.3 })
const B = geo.create('Point', { x: 7, y: 2, color: 'blue', label: 'B' })
const AB = geo.create('Line', { point1: A, point2: B })
const C = geo.create('Point', { x: 3, y: 5, label: 'C' })
geo.create('LineParallel', { line: AB, point: C, color: 'blue', thickness: 2 })


// Sauvegarde de la figure et affichage de cette sauvegarde
geo.refreshSave()
```
