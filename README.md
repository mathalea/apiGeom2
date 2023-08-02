# apiGeom - Moteur de géométrie dynamique

apiGeom est un logiciel de géométrie dynamique simple et léger avec les fonctionnalités suivantes :

- Création de constructions géométriques à la souris
- Création de constructions géométriques en Javascript
- Sauvegarde de la figure dans un fichier json éditable
- Export de la figure en LaTeX (Tikz ou Pstricks à venir)
- Création d'une figure statique
- Interaction avec la figure en Javascript (pour modifier ou tester une construction)

L'objectif n'est pas de concurrencer MathGraph32 ou GeoGebra.

apiGeom est beaucoup plus léger et aura moins de fonctionnalités. Sa particularité est le parti pris d'une géométrie à la française avec une interface épurée et une manipulation entièrement réalisée en Javascript.

## Exemple d'utilisation

```js
// On importe la classe principale d'apiGeom
import Figure from './Figure'
// On importe xState et la machine à états finis qui gère l'interface graphique
import { interpret } from 'xstate'
import ui from './uiMachine'

// On créé notre figure et on l'attache à la machine à états
const figure = new Figure({ width: 0.95 * (document.documentElement.clientWidth - 200), height: 0.8 * window.innerHeight })
const machineWithContext = ui.withContext({ figure })
figure.ui = interpret(machineWithContext).start()

// On précise le div où se placera la figure
const div = document.querySelector('#app') as HTMLDivElement
figure.setContainer(div)


// On ajoute les boutons
const divButtons = document.querySelector('#buttons') as HTMLDivElement
divButtons.appendChild(figure.addButtons('SAVE OPEN UNDO REDO'))
divButtons.appendChild(figure.addButtons('DRAG HIDE REMOVE'))
divButtons.appendChild(figure.addButtons('POINT POINT_ON POINT_INTERSECTION MIDDLE'))
divButtons.appendChild(figure.addButtons('SEGMENT LINE RAY POLYGON'))
divButtons.appendChild(figure.addButtons('LINE_PARALLEL LINE_PERPENDICULAR'))
divButtons.appendChild(figure.addButtons('PERPENDICULAR_BISECTOR BISECTOR_BY_POINTS'))
divButtons.appendChild(figure.addButtons('CIRCLE_CENTER_POINT CIRCLE_RADIUS'))


// Création de la figure
const A = figure.create('Point', { x: 0, y: 0, shape: 'o', label: 'A', labelDxInPixels: -0.6, labelDyInPixels: 0.3 })
const B = figure.create('Point', { x: 7, y: 2, color: 'blue', label: 'B' })
const AB = figure.create('Line', { point1: A, point2: B })
const C = figure.create('Point', { x: 3, y: 5, label: 'C' })
figure.create('LineParallel', { line: AB, point: C, color: 'blue', thickness: 2 })


// Sauvegarde de la figure et affichage de cette sauvegarde
figure.saveState()
```

Toutes les constructions se font à l'aide de la méthode `create` d'une instance de `Figure`.
Le premier argument est une chaine de caractère décrivant le construction et le deuxième est un objet avec les paramètres obligatoires et les paramètres optionnels.

## Utilisation en local

Après avoir récupéré le code, il faut lancer les commandes :

```js
pnpm install
pnpm start
```

Remarque : cette documentation utilise pnpm mais vous pouvez bien sûr conserver votre package manager habituel (npm, yarn, …)

## Documentation

`npm doc` pour générer la documentation qu'il faut ensuite lire dans `./docs/index.html`

## ToDo

- Sauvegarder les paramètres de la figure (scale, xScale...) dans le JSON
- Créer un export vers un script JS
- Gérer l'export LaTeX
- Titre sous les outils ?

## Bugs

- Couleur par défaut et Undo
