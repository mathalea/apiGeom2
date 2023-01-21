import { defaultHistorySize } from 'elements/defaultValues'
import Element2D from 'elements/Element2D'
import DynamicNumber from 'dynamicNumbers/DynamicNumber'
import Point from 'elements/points/Point'
import PointIntersectionLL from 'elements/points/PointIntersectionLL'
import Middle from 'elements/points/Middle'
import Line from 'elements/lines/Line'
import Segment from 'elements/lines/Segment'
import Ray from 'elements/lines/Ray'
import Circle from 'elements/lines/Circle'
import CircleCenterPoint from 'elements/lines/CircleCenterPoint'
import CircleCenterDynamicRadius from 'elements/lines/CircleCenterDyamicRadius'
import TextByPoint from 'elements/text/TextByPoint'
import TextByPosition from 'elements/text/TextByPosition'

import { getClickedElement } from 'pointerActions/handlePointerAction'
import { loadJson } from 'actions/loadJson'
import 'katex/dist/katex.min.css'
import TextDynamicByPosition from 'elements/text/TextDynamicByPosition'
import Distance from 'dynamicNumbers/Distance'
import Vector from 'elements/vector/Vector'
import VectorByPoints from 'elements/vector/VectorByPoints'
import LineParallel from 'elements/lines/LineParallel'
import LinePerpendicular from 'elements/lines/LinePerpendicular'
import VectorPerpendicular from 'elements/vector/VectorPerpendicular'
import Polyline from 'elements/lines/Polyline'
import Polygon from 'elements/lines/Polyligon'
import PointByTranslation from 'elements/points/PointByTranslation'
import PointIntersectionCC from 'elements/points/PointIntersectionCC'
import PointIntersectionLC from 'elements/points/PointIntersectionLC'
import PointsIntersectionCC from 'elements/points/PointsIntersectionCC'
import PointsIntersectionLC from 'elements/points/PointsIntersectionLC'
import LineByPointVector from 'elements/lines/LineByPointVector'
import PointByRotation from 'elements/points/PointByRotation'
import PointByDynamicRotation from 'elements/points/PointByDynamicRotation'
import PointByDilate from 'elements/points/PointByDilate'
import PointByProjection from 'elements/points/PointByProjection'
import PointByReflectOverLine from 'elements/points/PointByReflectOverLine'
import PointBySimilarity from 'elements/points/PointBySimilarity'

/**
 * Créé un espace de travail dans lequel on peut
 * générer des figures de géométrie statique ou dynamique
 */
class Figure {
  /** La clé est par défaut element0, element1, element2... ou le nom de l'élément et la valeur est l'élément géométrique (segment, point, polygone...) */
  elements: Map<string, (Element2D | DynamicNumber)>
  /** Un tableau des différentes sauvegardes automatiques utilisé pour les undo ou redo */
  history: string[]
  /** Nombre négatif utilisé pour undo ou redo. Par défaut à -1 pour la dernière sauvegarde, -2 pour l'avant dernière... */
  historyIndex: number // -1 correspond à la dernière sauvegarde
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
  /** Si l'option snapGrid est active, cela détermine la distance horizontale entre deux lieux de dépot du point */
  dx: number
  /** Si l'option snapGrid est active, cela détermine la distance verticale entre deux lieux de dépot du point */
  dy: number
  /** div (ou p ou svg…) dans lequel sera inséré le SVG et les div avec le texte mathématiques */
  container!: HTMLElement
  /** SVG de la figure géométrique */
  svg: SVGElement
  /** div dans lequel sera écrit la dernière sauvegarde automatique au format JSON */
  divSave: HTMLDivElement | null
  /** Abscisse du pointeur dans le repère de la figure */
  pointerX: number | null
  /** Ordonnée du pointeur dans le repère de la figure */
  pointerY: number | null
  /** Action du pointeur (par défaut drag) */
  private readonly _pointerAction: string

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
  constructor ({ width = 600, height = 400, pixelsPerUnit = 30, xMin = -10, yMin = -6, isDynamic = true, dx = 1, dy = 1 }: { width?: number, height?: number, pixelsPerUnit?: number, xMin?: number, yMin?: number, isDynamic?: boolean, dx?: number, dy?: number } = {}) {
    this.elements = new Map()
    this.history = []
    this.historyIndex = -1 // dernier item de l'historique
    this.width = width
    this.height = height
    this.pixelsPerUnit = pixelsPerUnit
    this.xMin = xMin
    this.xMax = xMin + width / pixelsPerUnit
    this.yMin = yMin
    this.yMax = yMin + height / pixelsPerUnit
    this.dx = dx
    this.dy = dy
    this.isDynamic = isDynamic
    this._pointerAction = 'drag'
    this.pointerX = null
    this.pointerY = null

    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    this.divSave = null
    this.svg.style.width = `${this.width}px`
    this.svg.style.height = `${this.height}px`
    this.svg.setAttribute('viewBox', `${this.xToSx(this.xMin)} ${this.yToSy(this.yMax)} ${this.width} ${this.height}`)
    this.svg.style.border = 'solid'
    // Pour éviter le scroll quand on manipule la figure sur un écran tactile
    this.svg.style.touchAction = 'none'
    this.clearHtml()
  }

  create<T extends keyof typeof classes>(
    typeStr: T,
    // Les constructeurs sont de type [figure, options], donc on récupère le type des deuxièmes arguments des constructeurs
    options: ConstructorParameters<typeof classes[T]>[1]
  ): InstanceType<typeof classes[T]> {
    // @ts-expect-error Typage très complexe
    const element = new classes[typeStr](this, { ...options })
    element.draw()
    // @ts-expect-error Typage très complexe
    return element
  }

  clearHtml (): void {
    this.svg.innerHTML = ''
    const style = document.createElementNS('http://www.w3.org/2000/svg', 'style')
    this.svg.appendChild(style)
    style.type = 'text/css'
    style.innerHTML = '.onlyOver:hover { opacity: 1; }'
    if (this.isDynamic) this.listenPointer()
  }

  /** Abscisse dans nos coordonnées converti en abscisse du SVG */
  xToSx (x: number): number {
    return x * this.pixelsPerUnit
  }

  /** Abscisse dans nos coordonnées converti en abscisse du SVG */
  yToSy (y: number): number {
    return -y * this.pixelsPerUnit
  }

  /** Abscisse du SVG converti dans nos coordonnées */
  sxTox (x: number): number {
    return x / this.pixelsPerUnit
  }

  /** Abscisse du SVG converti dans nos coordonnées */
  syToy (y: number): number {
    return -y / this.pixelsPerUnit
  }

  /** Récupère les coordonnées du pointeur dans le repère de la figure */
  getPointerCoord (event: PointerEvent): [number, number] {
    event.preventDefault()
    const rect = this.svg.getBoundingClientRect()
    const pointerX = (event.clientX - rect.x) / this.pixelsPerUnit + this.xMin
    const pointerY = -(event.clientY - rect.y) / this.pixelsPerUnit + this.yMax
    return [pointerX, pointerY]
  }

  /** Démarre les listenners sur la figure lorsqu'elle est dynamique */
  listenPointer (): void {
    // On créé des listenners et on change leur attitude suivant l'action en cours sauvegardée dans this.pointerAction
    this.svg.addEventListener('pointerdown', (event: PointerEvent) => {
      const [pointerX, pointerY] = this.getPointerCoord(event)
      const point = getClickedElement(this, pointerX, pointerY)
      if (point?.isFree === true) {
        this.pointInDrag = point
        if (this.container !== null) this.container.style.cursor = 'move'
      }
      // handlePointerAction(this, event)
    })

    const stopDrag = (): void => {
      if (this.pointInDrag !== undefined) {
        this.pointInDrag = undefined
        if (this.container !== null) this.container.style.cursor = 'auto'
        this.refreshSave()
      }
    }
    this.svg.addEventListener('pointerup', stopDrag)
    this.svg.addEventListener('pointerleave', stopDrag)

    this.svg.addEventListener('pointermove', (event) => {
      if (this.pointInDrag === undefined) return
      const [pointerX, pointerY] = this.getPointerCoord(event)
      this.pointInDrag.moveTo(pointerX, pointerY)
    })
  }

  get pointerAction (): string {
    return this._pointerAction
  }

  /** Sauvegarde la figure, met à jour l'historique et l'inscrit dans le div this.divSave */
  refreshSave (): void {
    const save = this.json
    if (this.divSave !== null) {
      this.divSave.textContent = save
    }
    this.history.push(save)
    if (this.history.length > defaultHistorySize) this.history = this.history.slice(-defaultHistorySize)
  }

  /** Charge la figure stockée dans l'avant-dernière étape de l'historique */
  historyGoBack (): void {
    if (-this.historyIndex < this.history.length) this.historyIndex--
    const previous = this.history.at(this.historyIndex)
    if (previous !== undefined) this.loadJson(JSON.parse(previous))
  }

  /** Reharge la figure stockée un rang plus haut dans l'historique   */
  historyGoForward (): void {
    if (this.historyIndex < -1) this.historyIndex++
    const next = this.history.at(this.historyIndex)
    if (next !== undefined) this.loadJson(JSON.parse(next))
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
    this.container.style.position = 'relative'
    this.container.appendChild(this.svg)
  }

  /** Efface la figure actuelle et charge une nouvelle figure à partir du code généré par this.json  */
  loadJson (json: object, eraseHistory?: boolean): void {
    return loadJson(this, json, eraseHistory)
  }
}

const classes = {
  Point,
  PointIntersectionLL,
  PointIntersectionCC,
  PointsIntersectionCC,
  PointIntersectionLC,
  PointsIntersectionLC,
  Middle,
  PointByTranslation,
  PointByRotation,
  PointByReflectOverLine,
  PointByDilate,
  PointBySimilarity,
  PointByDynamicRotation,
  PointByProjection,
  Line,
  LineByPointVector,
  LineParallel,
  LinePerpendicular,
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
  Distance,
  Vector,
  VectorByPoints,
  VectorPerpendicular
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
