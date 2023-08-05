import defaultOptions, { defaultButtonsWidth, defaultDragAllDelta, defaultFooterHeight, defaultHistorySize, defaultMinHeight, defaultMinWidth } from './elements/defaultValues'
import Element2D from './elements/Element2D'
import type DynamicNumber from './dynamicNumbers/DynamicNumber'
import Point from './elements/points/Point'
import PointOnGraph from './elements/points/PoinrOnGraph'
import PointIntersectionLL from './elements/points/PointIntersectionLL'
import Middle from './elements/points/Middle'
import Line from './elements/lines/Line'
import Segment from './elements/lines/Segment'
import Ray from './elements/lines/Ray'
import Circle from './elements/lines/Circle'
import CircleCenterPoint from './elements/lines/CircleCenterPoint'
import CircleCenterDynamicRadius from './elements/lines/CircleCenterDyamicRadius'
import TextByPoint from './elements/text/TextByPoint'
import TextByPosition from './elements/text/TextByPosition'

import handlePointerAction from './pointerActions/handlePointerAction'
import { loadJson } from './actions/loadJson'
import 'katex/dist/katex.min.css'
import BisectorByPoints from './elements/lines/BisectorByPoints'
import TextDynamicByPosition from './elements/text/TextDynamicByPosition'
import Distance from './dynamicNumbers/Distance'
import DynamicX from './dynamicNumbers/DynamicX'
import DynamicY from './dynamicNumbers/DynamicY'
import Vector from './elements/vector/Vector'
import VectorByPoints from './elements/vector/VectorByPoints'
import LineParallel from './elements/lines/LineParallel'
import LinePerpendicular from './elements/lines/LinePerpendicular'
import VectorPerpendicular from './elements/vector/VectorPerpendicular'
import Polyline from './elements/lines/Polyline'
import Polygon from './elements/lines/Polyligon'
import PointByTranslation from './elements/points/PointByTranslation'
import PointByTranslationByPoints from './elements/points/PointByTranslationByPoints'
import PointIntersectionCC from './elements/points/PointIntersectionCC'
import PointIntersectionLC from './elements/points/PointIntersectionLC'
import PointsIntersectionCC from './elements/points/PointsIntersectionCC'
import PointsIntersectionLC from './elements/points/PointsIntersectionLC'
import LineByPointVector from './elements/lines/LineByPointVector'
import PointByRotation from './elements/points/PointByRotation'
import MarkSegment from './elements/text/MarkSegment'
import PointByDynamicRotation from './elements/points/PointByDynamicRotation'
import PointByDilate from './elements/points/PointByDilate'
import PointByProjection from './elements/points/PointByProjection'
import PointByProjectionOnAxisX from './elements/points/PointByProjectionOnAxisX'
import PointByProjectionOnAxisY from './elements/points/PointByProjectionOnAxisY'
import PointByReflection from './elements/points/PointByReflection'
import PointByReflectOverLine from './elements/points/PointByReflectOverLine'
import PointBySimilarity from './elements/points/PointBySimilarity'
import PointOnLine from './elements/points/PointOnLine'
import PointOnCircle from './elements/points/PointOnCircle'
import Arc from './elements/lines/Arc'
import Angle from './dynamicNumbers/Angle'
import ArcBy3PointsAndRadius from './elements/lines/ArcBy3PointsAndRadius'
import PointByDynamicDilate from './elements/points/PointByDynamicDilate'
import DynamicCalcul from './dynamicNumbers/DynamicCalcul'
import PointOnLineAtDistance from './elements/points/PointOnLineAtDistance'
import PerpendicularBisector from './elements/lines/PerpendicularBisector'
import PerpendicularBisectorByPoints from './elements/lines/PerpendicularBisectorByPoints'
import Graph from './elements/calculus/Graph'
import Graph2 from './elements/calculus/Graph2'
import Grid from './elements/grid/Grid'
import type { eventName, eventOptions } from './uiMachine'
import handleHover from './pointerActions/handleHover'
import addButtons from './userInterface/addButtons'
import addColorPalette from './userInterface/addColorPalette'
import addDashedChoice from './userInterface/addDashedChoice'
import addThicknessChoice from './userInterface/addThicknessChoice'

/**
 * Créé un espace de travail dans lequel on peut
 * générer des figures de géométrie statique ou dynamique
 */
class Figure {
  /** La clé est par défaut element0, element1, element2... ou le nom de l'élément et la valeur est l'élément géométrique (segment, point, polygone...) */
  elements: Map<string, (Element2D | DynamicNumber)>
  /** Tableau d'éléments sélectionnés (utilisé dans l'interface graphique pour faire une construction à plusieurs entrées) */
  selectedElements: Element2D[]
  /** Élément temporaire (utilisé dans l'interface graphique pour donner un aperçu de le construction en cours) */
  tmpElements: Element2D[]
  /** Un tableau des différentes sauvegardes automatiques utilisé pour les undo */
  stackUndo: string[]
  /** Un tableau des différentes sauvegardes automatiques utilisé pour les redo */
  stackRedo: string[]
  /** Largeur en pixels du SVG */
  width: number
  /** Hauteur en pixels du SVG */
  height: number
  /** Nombre de pixels poun une unité (soit 1 cm en sortie papier) par défaut à 30 */
  pixelsPerUnit: number
  /** Figure dynamique ou statique */
  isDynamic: boolean
  /** Point actuellement en train d'être déplacé par la souris */
  pointInDrag: Point | undefined
  /** Abscisse du coin en bas à gauche */
  xMin: number
  /** Abscisse du coin en bas à droite */
  xMax: number
  /** Ordonnée du coin en bas à gauche */
  yMin: number
  /** Ordonnée du point en haut à droite */
  yMax: number
  /** Si l'option snapGrid est active, le point sera aimanté */
  snapGrid: boolean
  /** Si l'option snapGrid est active, cela détermine la distance horizontale entre deux lieux de dépot du point */
  dx: number
  /** Si l'option snapGrid est active, cela détermine la distance verticale entre deux lieux de dépot du point */
  dy: number
  /** div (ou p ou svg…) dans lequel sera inséré le SVG et les div avec le texte mathématiques */
  /** Échelle globale */
  scale: number
  /** Échelle horizontale */
  xScale: number
  /** Échelle verticale */
  yScale: number
  container!: HTMLElement
  /** SVG de la figure géométrique */
  svg: SVGElement
  /** div dans lequel sera écrit la dernière sauvegarde automatique au format JSON */
  divSave: HTMLDivElement | null
  /** Eventuel div dans lequel on attend une réponse de l'utilisateur */
  modal?: HTMLDivElement
  /** Abscisse du pointeur dans le repère de la figure */
  pointerX: number | null
  /** Ordonnée du pointeur dans le repère de la figure */
  pointerY: number | null
  /** Point virtuel qui suit le pointer */
  pointer: Point
  /** Machine qui gère l'état de l'interface utilisateur */
  ui?: { send: (e: eventName, opt?: eventOptions) => void }
  /** Filtre utilisé sur les éléments pour savoir ceux qui réagissent au clic */
  filter: (e: Element2D) => boolean
  /** Boutons qui interagissent avec la figure */
  buttons: Map<string, HTMLDivElement> = new Map<string, HTMLDivElement>()
  /** Options courante pour tous les tracés */
  options: {
    thickness: number
    color: string
    fillColor: string
    fillOpacity: number
    fontSize: string
    pointSize: number
    isDashed: boolean
    tmpThickness: number
    tmpColor: string
    tmpFillColor: string
    tmpFillOpacity: number
    tmpIsDashed: boolean
    labelDxInPixels: number
    labelDyInPixels: number
  }

  /**
   * @param __namedParameters width - Largeur en pixels du SVG
   * @param __namedParameters height - Hauteur en pixels du SVG
   * @param pixelsPerUnit - Nombres de pixels pour une unité de la figure, par défaut 30 pixels (l'unité sera le cm en sortie LaTeX)
   * @param xMin - Abscisse du coin en bas à gauche
   * @param yMin - Ordonnée du coin en bas à gauche
   * @param isDynamic - Figure dynamique ou statique
   * @param dx - Si l'option snapGrid est activée, cela correspond à la distance horizontale du quadrillage sur lequel les points peuvent être déposés
   * @param dy - Si l'option snapGrid est activée, cela correspond à la distance verticale du quadrillage sur lequel les points peuvent être déposés
   */
  constructor ({ width = document.documentElement.clientWidth - defaultButtonsWidth, height = document.documentElement.clientHeight - defaultFooterHeight, pixelsPerUnit = 30, xMin = -10, yMin = -6, isDynamic = true, dx = 1, dy = 1, xScale = 1, yScale = 1, scale = 1, snapGrid = false, border = false }: { width?: number, height?: number, pixelsPerUnit?: number, xMin?: number, yMin?: number, isDynamic?: boolean, dx?: number, dy?: number, xScale?: number, yScale?: number, scale?: number, snapGrid?: boolean, border?: boolean } = {}) {
    this.elements = new Map()
    this.stackUndo = []
    this.stackRedo = []
    this.width = width
    this.height = height
    this.pixelsPerUnit = pixelsPerUnit
    this.xMin = xMin
    this.xMax = xMin + width / pixelsPerUnit / scale / xScale
    this.yMin = yMin
    this.yMax = yMin + height / pixelsPerUnit / scale / yScale
    this.dx = dx
    this.dy = dy
    this.xScale = xScale
    this.yScale = yScale
    this.scale = scale
    this.isDynamic = isDynamic
    this.pointerX = null
    this.pointerY = null
    this.selectedElements = []
    this.tmpElements = []
    this.options = defaultOptions
    this.snapGrid = snapGrid

    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    this.divSave = null
    if (border) this.svg.style.border = 'solid'
    // Pour éviter le scroll quand on manipule la figure sur un écran tactile
    this.svg.style.touchAction = 'none'
    this.clearHtml()
    if (this.isDynamic) this.listenPointer()
    this.pointer = new Point(this, { x: 0, y: 0, isFree: false, isChild: true, isVisible: false, shape: '' })
    this.pointer.type = 'pointer'
    this.ui = undefined
    this.filter = e => e instanceof Point && e.isFree
    this.saveState()
    this.handleDragAll()
    // Les boutons n'existe pas encore
    setTimeout(() => { this.handleUndoRedoButtons() }, 100)
  }

  create<T extends keyof typeof classes>(
    typeStr: T,
    // Les constructeurs sont de type [figure, options], donc on récupère le type des deuxièmes arguments des constructeurs
    options?: ConstructorParameters<typeof classes[T]>[1]
  ): InstanceType<typeof classes[T]> {
    // @ts-expect-error Typage très complexe
    const element = new classes[typeStr](this, { ...options })
    element.draw()
    // @ts-expect-error Typage très complexe
    return element
  }

  tempCreate (typeStr: string, options?: ConstructorParameters<typeof classes[keyof typeof classes]>[1]): Element2D {
    // @ts-expect-error Typage très complexe
    const element = this.create(typeStr, { isChild: true, ...options }) as Element2D
    element.color = this.options.tmpColor
    element.thickness = this.options.tmpThickness
    if ('isDashed' in element && !(element instanceof Point)) element.isDashed = this.options.tmpIsDashed
    if ('fillColor' in element) element.fillColor = this.options.tmpFillColor
    if ('fillOpacity' in element) element.fillOpacity = this.options.tmpFillOpacity
    this.tmpElements.push(element)
    return element
  }

  clearHtml (): void {
    this.svg.innerHTML = ''
    const style = document.createElementNS('http://www.w3.org/2000/svg', 'style')
    this.svg.appendChild(style)
    style.type = 'text/css'
    style.innerHTML = '.onlyOver:hover { opacity: 1; }'
  }

  /** Abscisse dans nos coordonnées converti en abscisse du SVG */
  xToSx (x: number): number {
    return x * this.pixelsPerUnit * this.xScale * this.scale
  }

  /** Abscisse dans nos coordonnées converti en abscisse du SVG */
  yToSy (y: number): number {
    return -y * this.pixelsPerUnit * this.yScale * this.scale
  }

  /** Abscisse du SVG converti dans nos coordonnées */
  sxTox (x: number): number {
    return x / this.pixelsPerUnit / this.xScale / this.scale
  }

  /** Abscisse du SVG converti dans nos coordonnées */
  syToy (y: number): number {
    return -y / this.pixelsPerUnit / this.yScale / this.scale
  }

  /** Récupère les coordonnées du pointeur dans le repère de la figure */
  getPointerCoord (event: PointerEvent): [number, number] {
    event.preventDefault()
    const rect = this.svg.getBoundingClientRect()
    const pointerX = (event.clientX - rect.x) / this.pixelsPerUnit / this.xScale / this.scale + this.xMin
    const pointerY = -(event.clientY - rect.y) / this.pixelsPerUnit / this.yScale / this.scale + this.yMax
    return [pointerX, pointerY]
  }

  /** Démarre les listenners sur la figure lorsqu'elle est dynamique */
  listenPointer (): void {
    // On créé des listenners pour envoyer les information à la machine à états this.ui
    this.svg.addEventListener('pointerdown', (event: PointerEvent) => {
      handlePointerAction(this, event)
    })

    const stopDrag = (): void => {
      if (this.pointInDrag !== undefined) {
        this.pointInDrag = undefined
        if (this.container !== null) this.container.style.cursor = 'auto'
        this.saveState()
      }
    }
    this.svg.addEventListener('pointerup', stopDrag)
    this.svg.addEventListener('pointerleave', stopDrag)

    this.svg.addEventListener('pointermove', (event) => {
      const [pointerX, pointerY] = this.getPointerCoord(event)
      this.pointer.moveTo(pointerX, pointerY)
      handleHover(this, pointerX, pointerY)
      if (this.pointInDrag === undefined) return
      this.pointInDrag.moveTo(pointerX, pointerY)
    })
  }

  /**  - Sauvegarde la figure
   *   - Met à jour l'historique et l'inscrit dans le div this.divSave
   *   - Réinitialise les éléments temporaires */
  saveState (): void {
    const save = this.json
    // Sauvegarde dans le localStorage
    localStorage.setItem('apiGeom', save)
    if (this.divSave !== null) {
      this.divSave.textContent = save
    }
    this.stackUndo.push(save)
    this.stackRedo = []
    if (this.stackUndo.length > defaultHistorySize) this.stackUndo = this.stackUndo.slice(-defaultHistorySize)
    this.handleUndoRedoButtons()
    this.tmpElements.forEach(e => { e.remove() })
    this.tmpElements = []
    this.selectedElements = []
  }

  handleUndoRedoButtons (): void {
    const btnRedo = this.buttons.get('REDO')
    const btnUndo = this.buttons.get('UNDO')
    if (btnRedo !== undefined) {
      btnRedo.style.opacity = (this.stackRedo.length === 0) ? '0.5' : '1'
    }
    if (btnUndo !== undefined) {
      btnUndo.style.opacity = (this.stackUndo.length < 2) ? '0.5' : '1'
    }
  }

  /** Charge la figure stockée dans stackUndo */
  undo (): void {
    const lastUndo = this.stackUndo.at(-2)
    if (lastUndo !== undefined) {
      this.stackRedo.push(this.stackUndo.at(-1) as string)
      this.stackUndo.pop()
      this.loadJson(JSON.parse(lastUndo))
      this.handleUndoRedoButtons()
    }
  }

  /** Reharge la figure stockée redoStack   */
  redo (): void {
    const lastRedo = this.stackRedo.at(-1)
    if (lastRedo !== undefined) {
      this.stackUndo.push(lastRedo)
      this.stackRedo.pop()
      this.loadJson(JSON.parse(lastRedo))
      this.handleUndoRedoButtons()
    }
  }

  /** Génère le code LaTeX de la figure */
  get latex (): string {
    let latex = '\\begin{tikzpicture}'
    latex += `\n\t\\clip(${this.xMin}, ${this.yMin}) rectangle (${this.xMax}, ${this.yMax});`
    for (const e of this.elements) {
      console.log(e)
      // latex += e.latex
    }
    latex += '\n\\end{tikzpicture}'
    // ToFix Il peut y avoir un problème si un nombre est en écriture scientifique
    latex = latex.replace(/\d+\.\d+/g, (number: string) => (Math.round(1000 * parseFloat(number)) / 1000).toString())
    return latex
  }

  /** Génère le code JSON de la figure qui permettra de la recharger */
  get json (): string {
    // Le JSON est personnalisé avec la méthode toJSON() des éléments
    const save = { apiGeomVersion: 0.1, ...Object.fromEntries(this.elements) }
    return JSON.stringify(save, filter, 2)
  }

  getContainer (): HTMLElement | null {
    return this.container
  }

  setContainer (parentContainer: HTMLElement): void {
    if (!(parentContainer instanceof HTMLElement)) throw Error('container doit être un HTMLElement')
    this.container = document.createElement('div')
    parentContainer.appendChild(this.container)
    this.container.appendChild(this.svg)
    this.container.style.position = 'relative'
    this.container.style.position = 'relative'
    this.container.style.overflow = 'hidden'
    this.container.style.display = 'inline-block'
    this.container.style.margin = '0'
    this.container.style.padding = '0'
    this.container.style.boxSizing = 'border-box'
    this.container.style.border = 'none'
    const divUserMessage = document.createElement('div')
    divUserMessage.style.position = 'absolute'
    divUserMessage.style.top = '0'
    divUserMessage.style.right = '0'
    divUserMessage.style.color = 'blue'
    divUserMessage.style.margin = '3px'
    divUserMessage.style.padding = '0.5em'
    divUserMessage.style.fontSize = '1.5em'
    divUserMessage.id = 'userMessage'
    this.container.appendChild(divUserMessage)
    this.adjustSize()
    this.drawTexts()
  }

  /**
   * Les textes ont besoin d'un conteneur.
   * Il faut donc relancer cette méthode après avoir initialisé le conteneur
   */
  drawTexts (): void {
    const texts = [...this.elements.values()].filter(e => e.type.includes('Text'))
    texts.forEach(text => { text.draw() })
  }

  /** Efface la figure actuelle et charge une nouvelle figure à partir du code généré par this.json  */
  loadJson (json: object, eraseHistory?: boolean): void {
    loadJson(this, json, eraseHistory)
  }

  addButtons (buttons: string): HTMLDivElement {
    return addButtons(buttons, this)
  }

  addColorPalette (colors: string[]): HTMLDivElement {
    return addColorPalette(colors, this)
  }

  addDashedChoice (): HTMLDivElement {
    return addDashedChoice(this)
  }

  addThicknessChoice (): HTMLDivElement {
    return addThicknessChoice(this)
  }

  /** Ajuste la taille pour être la plus grande possible en tenant compte d'une barre d'outils sur le côté et un footer en dessous */
  adjustSize (): void {
    this.width = document.documentElement.clientWidth - defaultButtonsWidth
    this.height = document.documentElement.clientHeight - defaultFooterHeight
    if (this.width < defaultMinWidth) this.width = defaultMinWidth
    if (this.height < defaultMinHeight) this.height = defaultMinHeight
    if (this.container !== null && this.svg !== null) {
      this.container.style.width = this.width.toString() + 'px'
      this.container.style.height = this.height.toString() + 'px'
      this.svg.setAttribute('width', (this.width).toString())
      this.svg.setAttribute('height', (this.height).toString())
      this.svg.setAttribute('viewBox', `${this.xToSx(this.xMin)} ${this.yToSy(this.yMax)} ${this.width} ${this.height}`)
    }
    for (const e of this.elements) {
      if (e instanceof Element2D) e.update()
    }
  }

  /** Met à jour la taille de l'espace de travail en cas de changements sur la fenêtre du navigateur */
  autoAdjustSize (): void {
    window.addEventListener('resize', () => {
      this.adjustSize()
    })
    window.addEventListener('orientationchange', () => {
      this.adjustSize()
    })
    window.addEventListener('fullscreenchange', () => {
      this.adjustSize()
    })
  }

  /** Déplace le repère de la figure à l'aide des flèches */
  handleDragAll (): void {
    window.addEventListener('keydown', (e) => {
      const direction = { x: 0, y: 0 }
      const step = defaultDragAllDelta
      if (e.key === 'ArrowLeft') {
        direction.x = step
      }
      if (e.key === 'ArrowRight') {
        direction.x = -step
      }
      if (e.key === 'ArrowUp') {
        direction.y = -step
      }
      if (e.key === 'ArrowDown') {
        direction.y = +step
      }
      // Shift + flèche => 10x plus rapide
      if (e.shiftKey) {
        direction.x *= 10
        direction.y *= 10
      }
      if (!isModalOpen() && (direction.x !== 0 || direction.y !== 0)) {
        e.preventDefault()
        this.xMin += direction.x
        this.yMax += direction.y
        this.adjustSize()
      }
    })
  }
}

const classes = {
  Point,
  BisectorByPoints,
  PointOnLine,
  PointOnCircle,
  PointOnGraph,
  PointOnLineAtDistance,
  PointIntersectionLL,
  PointIntersectionCC,
  PointsIntersectionCC,
  PointIntersectionLC,
  PointsIntersectionLC,
  Middle,
  PointByTranslation,
  PointByTranslationByPoints,
  PointByRotation,
  PointByReflectOverLine,
  PointByDilate,
  PointByDynamicDilate,
  PointBySimilarity,
  PointByDynamicRotation,
  PointByProjection,
  PointByProjectionOnAxisX,
  PointByProjectionOnAxisY,
  PointByReflection,
  Arc,
  ArcBy3PointsAndRadius,
  Line,
  LineByPointVector,
  LineParallel,
  LinePerpendicular,
  PerpendicularBisector,
  PerpendicularBisectorByPoints,
  Segment,
  Ray,
  Polyline,
  Polygon,
  Circle,
  CircleCenterPoint,
  CircleCenterDynamicRadius,
  TextByPoint,
  TextByPosition,
  TextDynamicByPosition,
  MarkSegment,
  Distance,
  DynamicX,
  DynamicY,
  Angle,
  DynamicCalcul,
  Vector,
  VectorByPoints,
  VectorPerpendicular,
  Graph,
  Graph2,
  Grid
}

export default Figure

function filter (key: string, value: Element2D): undefined | Element2D {
  if (value?.isChild) {
    return undefined
  }
  if (key === 'isChild') {
    return undefined
  }
  return value
}

function isModalOpen (): boolean {
  const dialogs = Array.from(document.querySelectorAll('dialog'))
  return dialogs.some(modal => {
    if (modal.open) {
      return true
    }
    return false
  })
}
