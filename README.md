# apiGeom - Moteur de géométrie dynamique

apiGeom est un logiciel de géométrie dynamique simple et léger avec les fonctionnalités suivantes : 

- Création de constructions géométriques à la souris
- Création de constructions géométriques en Javascript
- Sauvegarde de la figure dans un fichier json éditable 
- Export de la figure en LaTeX (Tikz ou Pstricks)
- Création d'une figure statique
- Interaction avec la figure en Javascript (pour modifier ou tester une construction)

L'objectif n'est pas de concurrencer MathGraph32 ou GeoGebra. 

apiGeom est beaucoup plus léger et aura moins de fonctionnalités. Sa particularité est le parti pris d'une géométrie à la française 
avec une interface épurée et une manipulation entièrement réalisée en Javascript.


## Exemple d'utilisation

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

Toutes les constructions se font à l'aide de la méthode `create` d'une instance de `Figure`.
Le premier argument est une chaine de caractère décrivant le construction et le deuxième est un objet avec les paramètres obligatoires et les paramètres optionnels.

## Utilisation en local

Après avoir récupéré le code, il faut lancer les commandes : 

```js
pnpm install
pnpm start
```

## Documentation

`pnpm doc` pour générer la documentation qu'il faut ensuite lire dans `./docs/index.html`

