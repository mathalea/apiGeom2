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
import PointOnLine from 'elements/points/PointOnLine'

/**
 * Cr???? un espace de travail dans lequel on peut
 * g??n??rer des figures de g??om??trie statique ou dynamique
 */
class Figure {
  /** La cl?? est par d??faut element0, element1, element2... ou le nom de l'??l??ment et la valeur est l'??l??ment g??om??trique (segment, point, polygone...) */
  elements: Map<string, (Element2D | DynamicNumber)>
  /** Un tableau des diff??rentes sauvegardes automatiques utilis?? pour les undo ou redo */
  history: string[]
  /** Nombre n??gatif utilis?? pour undo ou redo. Par d??faut ?? -1 pour la derni??re sauvegarde, -2 pour l'avant derni??re... */
  historyIndex: number // -1 correspond ?? la derni??re sauvegarde
  /** Largeur en pixels du SVG */
  width: number
  /** Hauteur en pixels du SVG */
  height: number
  /** Nombre de pixels poun une unit?? (soit 1 cm en sortie papier) par d??faut ?? 30 */
  pixelsPerUnit: number
  /** Figure dynamique ou statique */
  isDynamic: boolean
  /** Point actuellement en train d'??tre d??plac?? par la souris */
  pointInDrag: Point | undefined
  /** Abscisse du coin en bas ?? gauche */
  xMin: number
  /** Abscisse du coin en bas ?? droite */
  xMax: number
  /** Ordonn??e du coin en bas ?? gauche */
  yMin: number
  /** Ordonn??e du point en haut ?? droite */
  yMax: number
  /** Si l'option snapGrid est active, cela d??termine la distance horizontale entre deux lieux de d??pot du point */
  dx: number
  /** Si l'option snapGrid est active, cela d??termine la distance verticale entre deux lieux de d??pot du point */
  dy: number
  /** div (ou p ou svg???) dans lequel sera ins??r?? le SVG et les div avec le texte math??matiques */
  container!: HTMLElement
  /** SVG de la figure g??om??trique */
  svg: SVGElement
  /** div dans lequel sera ??crit la derni??re sauvegarde automatique au format JSON */
  divSave: HTMLDivElement | null
  /** Eventuel div dans lequel on attend une r??ponse de l'utilisateur */
  modal!: HTMLDivElement
  /** Abscisse du pointeur dans le rep??re de la figure */
  pointerX: number | null
  /** Ordonn??e du pointeur dans le rep??re de la figure */
  pointerY: number | null
  /** Action du pointeur (par d??faut drag) */
  private readonly _pointerAction: string

  /**
   * @param __namedParameters width - Largeur en pixels du SVG
   * @param __namedParameters height - Hauteur en pixels du SVG
   * @param pixelsPerUnit - Nombres de pixels pour une unit?? de la figure, par d??faut 30 pixels (l'unit?? sera le cm en sortie LaTeX)
   * @param xMin - Abscisse du coin en bas ?? gauche
   * @param yMin - Ordonn??e du coin en bas ?? gauche
   * @param isDynamic - Figure dynamique ou statique
   * @param dx - Si l'option snapGrid est activ??e, cela correspond ?? la distance horizontale du quadrillage sur lequel les points peuvent ??tre d??pos??s
   * @param dy - Si l'option snapGrid est activ??e, cela correspond ?? la distance verticale du quadrillage sur lequel les points peuvent ??tre d??pos??s
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
    // Pour ??viter le scroll quand on manipule la figure sur un ??cran tactile
    this.svg.style.touchAction = 'none'
    this.clearHtml()
  }

  create<T extends keyof typeof classes>(
    typeStr: T,
    // Les constructeurs sont de type [figure, options], donc on r??cup??re le type des deuxi??mes arguments des constructeurs
    options: ConstructorParameters<typeof classes[T]>[1]
  ): InstanceType<typeof classes[T]> {
    // @ts-expect-error Typage tr??s complexe
    const element = new classes[typeStr](this, { ...options })
    element.draw()
    // @ts-expect-error Typage tr??s complexe
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

  /** Abscisse dans nos coordonn??es converti en abscisse du SVG */
  xToSx (x: number): number {
    return x * this.pixelsPerUnit
  }

  /** Abscisse dans nos coordonn??es converti en abscisse du SVG */
  yToSy (y: number): number {
    return -y * this.pixelsPerUnit
  }

  /** Abscisse du SVG converti dans nos coordonn??es */
  sxTox (x: number): number {
    return x / this.pixelsPerUnit
  }

  /** Abscisse du SVG converti dans nos coordonn??es */
  syToy (y: number): number {
    return -y / this.pixelsPerUnit
  }

  /** R??cup??re les coordonn??es du pointeur dans le rep??re de la figure */
  getPointerCoord (event: PointerEvent): [number, number] {
    event.preventDefault()
    const rect = this.svg.getBoundingClientRect()
    const pointerX = (event.clientX - rect.x) / this.pixelsPerUnit + this.xMin
    const pointerY = -(event.clientY - rect.y) / this.pixelsPerUnit + this.yMax
    return [pointerX, pointerY]
  }

  /** D??marre les listenners sur la figure lorsqu'elle est dynamique */
  listenPointer (): void {
    // On cr???? des listenners et on change leur attitude suivant l'action en cours sauvegard??e dans this.pointerAction
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

  /** Sauvegarde la figure, met ?? jour l'historique et l'inscrit dans le div this.divSave */
  refreshSave (): void {
    const save = this.json
    if (this.divSave !== null) {
      this.divSave.textContent = save
    }
    this.history.push(save)
    if (this.history.length > defaultHistorySize) this.history = this.history.slice(-defaultHistorySize)
  }

  /** Charge la figure stock??e dans l'avant-derni??re ??tape de l'historique */
  historyGoBack (): void {
    if (-this.historyIndex < this.history.length) this.historyIndex--
    const previous = this.history.at(this.historyIndex)
    if (previous !== undefined) this.loadJson(JSON.parse(previous))
  }

  /** Reharge la figure stock??e un rang plus haut dans l'historique   */
  historyGoForward (): void {
    if (this.historyIndex < -1) this.historyIndex++
    const next = this.history.at(this.historyIndex)
    if (next !== undefined) this.loadJson(JSON.parse(next))
  }

  /** G??n??re le code LaTeX de la figure */
  get latex (): string {
    let latex = '\\begin{tikzpicture}'
    latex += `\n\t\\clip(${this.xMin}, ${this.yMin}) rectangle (${this.xMax}, ${this.yMax});`
    for (const e of this.elements) {
      console.log(e)
      // latex += e.latex
    }
    latex += '\n\\end{tikzpicture}'
    // ToFix Il peut y avoir un probl??me si un nombre est en ??criture scientifique
    latex = latex.replace(/\d+\.\d+/g, (number: string) => (Math.round(1000 * parseFloat(number)) / 1000).toString())
    return latex
  }

  /** G??n??re le code JSON de la figure qui permettra de la recharger */
  get json (): string {
    // Le JSON est personnalis?? avec la m??thode toJSON() des ??l??ments
    const save = { apiGeomVersion: 0.1, ...Object.fromEntries(this.elements) }
    return JSON.stringify(save, filter, 2)
  }

  getContainer (): HTMLElement | null {
    return this.container
  }

  setContainer (parentContainer: HTMLElement): void {
    if (!(parentContainer instanceof HTMLElement)) throw Error('container doit ??tre un HTMLElement')
    this.container = document.createElement('div')
    parentContainer.appendChild(this.container)
    this.container.style.position = 'relative'
    this.container.appendChild(this.svg)
  }

  /** Efface la figure actuelle et charge une nouvelle figure ?? partir du code g??n??r?? par this.json  */
  loadJson (json: object, eraseHistory?: boolean): void {
    return loadJson(this, json, eraseHistory)
  }
}

const classes = {
  Point,
  PointOnLine,
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
