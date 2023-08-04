import Figure from './Figure'
import { interpret } from 'xstate'
import ui from './uiMachine'

// On créé le svg dans un div
const div = document.querySelector('#app') as HTMLDivElement
const figure = new Figure()
const machineWithContext = ui.withContext({ figure })
figure.ui = interpret(machineWithContext).start()

// On ajoute les boutons
const divButtons = document.querySelector('#buttons') as HTMLDivElement
divButtons.appendChild(figure.addButtons('SAVE OPEN UNDO REDO'))
divButtons.appendChild(figure.addButtons('DRAG SET_OPTIONS HIDE REMOVE'))
divButtons.appendChild(figure.addButtons('POINT POINT_ON POINT_INTERSECTION MIDDLE'))
divButtons.appendChild(figure.addButtons('SEGMENT LINE RAY POLYGON'))
divButtons.appendChild(figure.addButtons('LINE_PARALLEL LINE_PERPENDICULAR PERPENDICULAR_BISECTOR BISECTOR_BY_POINTS'))
divButtons.appendChild(figure.addButtons('CIRCLE_CENTER_POINT CIRCLE_RADIUS'))
divButtons.appendChild(figure.addButtons('REFLECTION_OVER_LINE REFLECTION ROTATE'))
divButtons.appendChild(figure.addColorPalette(['black', 'blue', 'red']))
divButtons.appendChild(figure.addColorPalette(['green', 'orange', 'purple']))
divButtons.appendChild(figure.addDashedChoice())
divButtons.appendChild(figure.addThicknessChoice())

// Création de la figure
figure.setContainer(div)
figure.autoAdjustSize()
