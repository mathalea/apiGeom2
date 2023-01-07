import { Element2D } from './elements/Element2D'
import { optionsElement2D, optionsPoint } from './elements/interfaces'
import { Point } from './elements/Point'
import { Segment } from './elements/Segment'
import { getClickedElement } from './pointerActions/handlePointerAction'

export class ApiGeom {
  elements: Map<string, Element2D>
  width: number
  height: number
  pixelsPerUnit: number
  isDynamic: boolean
  isDraging: boolean
  pointInDrag: Point | undefined
  // startDragCoords: {x: number, y: number} // Pour déplacer des Line, on sauvegarde où a commencé le drag
  xMin: number
  xMax: number
  yMin: number
  yMax: number
  dx: number // Pour l'option snapGrid des points
  dy: number // Pour l'option snapGrid des points
  svg: SVGElement
  pointerX: number | null
  pointerY: number | null
  private readonly _pointerAction: string
  // pointerSetOptions: OptionsGraphiques & {angle?: number} & {rapport?: number}
  // messageElement: TextByPosition | null
  constructor ({ width = 600, height = 400, pixelsPerUnit = 30, xMin = -10, yMin = -6, isDynamic = true, dx = 1, dy = 1 }: { width?: number, height?: number, pixelsPerUnit?: number, xMin?: number, yMin?: number, isDynamic?: boolean, dx?: number, dy?: number } = {}) {
    this.elements = new Map()
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
    this.isDraging = false
    this.pointerX = null
    this.pointerY = null

    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    this.svg.style.width = `${this.width}px`
    this.svg.style.height = `${this.height}px`
    this.svg.setAttribute('viewBox', `${this.xToSx(this.xMin)} ${this.yToSy(this.yMax)} ${this.width} ${this.height}`)
    // Pour éviter le scroll quand on manipule la apiGeom sur un écran tactile
    this.svg.style.touchAction = 'none'
    const style = document.createElementNS('http://www.w3.org/2000/svg', 'style')
    this.svg.appendChild(style)
    style.type = 'text/css'
    style.innerHTML = '.onlyOver:hover { opacity: 1; }'

    if (this.isDynamic) this.listenPointer()
  }

  /**
       * abscisse de nos coordonnées => abscisse du SVG
       * @param x number
       * @returns number
       */
  xToSx (x: number): number {
    return x * this.pixelsPerUnit
  }

  /**
       * ordonnée de nos coordonnées => ordonnée du SVG
       * @param y number
       * @returns number
       */
  yToSy (y: number): number {
    return -y * this.pixelsPerUnit
  }

  /**
       * abscisse du SVG => abscisse de nos coordonnées
       * @param x number
       * @returns number
       */
  sxTox (x: number): number {
    return x / this.pixelsPerUnit
  }

  /**
       * ordonnée du SVG => ordonnée de nos coordonnées
       * @param y number
       * @returns number
       */
  syToy (y: number): number {
    return -y * this.pixelsPerUnit
  }

  /**
       * Récupère les coordonnées du pointeur dans le repère de la apiGeom
       * @param event
       * @returns
       */
  getPointerCoord (event: PointerEvent): [number, number] {
    event.preventDefault()
    const rect = this.svg.getBoundingClientRect()
    const pointerX = (event.clientX - rect.x) / this.pixelsPerUnit + this.xMin
    const pointerY = -(event.clientY - rect.y) / this.pixelsPerUnit + this.yMax
    return [pointerX, pointerY]
  }

  listenPointer (): void {
    // On créé des listenners et on change leur attitude suivant l'action en cours sauvegardée dans this.pointerAction
    this.svg.addEventListener('pointerdown', (event: PointerEvent) => {
      const [pointerX, pointerY] = this.getPointerCoord(event)
      const point = getClickedElement(this, pointerX, pointerY)
      if (point !== undefined) this.pointInDrag = point
      // handlePointerAction(this, event)
    })

    this.svg.addEventListener('pointerup', () => {
      this.pointInDrag = undefined
    })

    this.svg.addEventListener('pointermove', (event) => {
      if (this.pointInDrag === undefined) return
      const [pointerX, pointerY] = this.getPointerCoord(event)
      this.pointInDrag.moveTo(pointerX, pointerY)
    })
  }

  get pointerAction (): string {
    return this._pointerAction
  }

  // set pointerAction (action) {
  //   this._pointerAction = action
  //   this.clearSelectedElements()
  //   initMessageAction(this, action)
  //   if (action === 'pointByCoords') newPointByCoords(this) // Cette action ne doit pas attendre un clic sur la apiGeom
  //   else if (action === 'save') {
  //     console.log(this.set)
  //     for (const e of [...this.setMeasures, ...this.set]) {
  //       e.save()
  //     }
  //     const saveTxt = JSON.stringify(this.save)
  //     updateClipboard(saveTxt)
  //     function updateClipboard (newClip: string) {
  //       navigator.clipboard.writeText(newClip).then(function () {
  //         alert('Figure sauvegardée dans le presse-papier')
  //       }, function () {
  //         alert(saveTxt)
  //       })
  //     }
  //   } else if (action === 'latex') alert(this.latex)
  //   this.updateStyleCursor()
  // }

  // updateStyleCursor () {
  //   const action = this.pointerAction
  //   for (const e of this.set) {
  //     if (action === 'drag' && e instanceof Cross && e.draggable) e.g.style.cursor = 'move'
  //     else if (action === 'drag' && e instanceof Cross && !e.draggable) e.g.style.cursor = 'default'
  //     else if (action === 'drag' && e instanceof Line && e.A.draggable && e.B.draggable) e.g.style.cursor = 'move'
  //     // ToFix Si un polygone est par-dessus le segment alors le pointeur ne change pas pour le drag de segment
  //     else e.g.style.cursor = 'pointer'
  //   }
  // }

  // clearSelectedElements () {
  //   for (const e of this.selectedElements) {
  //     e.unSelect()
  //   }
  // }

  // displayMessage (text: string, { dx = 1, dy = 1 }: {dx?: number, dy?: number} = {}) {
  //   if (this.messageElement) {
  //     this.messageElement.text = text
  //     this.messageElement.x = this.xMin + dx
  //     this.messageElement.y = this.yMax - dy
  //   } else {
  //     const message = new TextByPosition(this, this.xMin + dx, this.yMax - dy, text, { anchor: 'start', draggable: false, color: 'gray' })
  //     this.messageElement = message
  //     this.set.delete(this.messageElement) // Pour l'exclure de la sortie LaTeX et du drag
  //   }
  // }

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

  get json (): string {
    // Le JSON est personnalisé avec la méthode toJSON() des éléments
    return JSON.stringify(Object.fromEntries(this.elements), null, 1)
  }

  load (json: object): Element2D[] {
    const elements = []
    for (const options of Object.values(json)) {
      if (options.type === 'Point') {
        elements.push(new Point(this, options.x, options.y, options))
      }
      if (options.type === 'Segment') {
        elements.push(new Segment(this, options.namePoint1, options.namePoint2, options))
      }
    }
    return elements
  }

  point (x: number, y: number, options?: optionsPoint): Point {
    return new Point(this, x, y, options)
  }

  segment (point1: string | Point, point2: string | Point, options?: optionsElement2D): Segment {
    return new Segment(this, point1, point2, options)
  }
}
