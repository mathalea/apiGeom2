import type Figure from './Figure'
import Segment from './elements/lines/Segment'
import Point from './elements/points/Point'
import { type AnyEventObject, createMachine } from 'xstate'
import Element2D from './elements/Element2D'
import Circle from './elements/lines/Circle'
import { distance } from './elements/calculus/Coords'
import { createDialoxBoxAngle, createDialoxBoxK, createDialoxBoxName, createDialoxBoxRadius } from './userInterface/handleDialog'
import { orangeMathaleaLight } from './elements/defaultValues'
import Polygon from './elements/lines/Polyligon'
import selectionRectangle from './userInterface/selectionRectangle'

interface MyContext {
  figure: Figure
}

export type eventName =
  | 'ANGLE'
  | 'clickLocation'
  | 'BISSECTOR_BY_POINTS'
  | 'CIRCLE_CENTER_POINT'
  | 'CIRCLE_RADIUS'
  | 'COLOR'
  | 'DOWNLOAD_LATEX_SVG'
  | 'DILATE'
  | 'DILATE_COEF'
  | 'DRAG'
  | 'HIDE'
  | 'POINT_INTERSECTION'
  | 'LATEX'
  | 'LINE'
  | 'LINE_PARALLEL'
  | 'MIDDLE'
  | 'MOVE_LABEL'
  | 'NAME_POINT'
  | 'OPEN'
  | 'POINT'
  | 'POINT_ON'
  | 'LINE_PERPENDICULAR'
  | 'PERPENDICULAR_BISECTOR'
  | 'POLYGON'
  | 'RADIUS'
  | 'RAY'
  | 'REDO'
  | 'REFLECTION'
  | 'REFLECTION_OVER_LINE'
  | 'REMOVE'
  | 'ROTATE'
  | 'SAVE'
  | 'SELECTION_AREA_TO_SVG'
  | 'SELECTION_AREA_TO_LATEX'
  | 'SEGMENT'
  | 'SET_OPTIONS'
  | 'TEXT_FROM_DIALOG'
  | 'TRANSLATION'
  | 'UNDO'

export type eventOptions =
  | { x: number, y: number, element?: Element2D, waitingWithModal: boolean }
  | { text: string }
  | { radius: number }
  | { coefficient: number }
  | { angle: number }
  | { text: string }
  | { xMin: number, yMax: number, width: number, height: number }

interface MyEvent extends AnyEventObject {
  x?: number
  y?: number
  element?: Element2D
  text?: string
  waitingWithModal?: boolean
}

interface Context {
  figure: Figure
  temp: {
    values: number[]
    elements: Element2D[]
    htmlElement: HTMLElement[]
  }
}

const ui = createMachine<Context>({
  /** @xstate-layout N4IgpgJg5mDOIC5QEMAOBLA4mA9gWwFUBJAYgAUB5IgOQBUBtABgF1FRUdZ0AXdHAOzYgAHogAsAJgA0IAJ7iAjBIB0CgMwB2BQA4NAVgC+BmWiy5CpADI0Aok1ZIQHLrwFDRCSTPkINYxsoSemKahsYgptj4xCQAyjaYALI2dPZCzjx8go4eXnKICowAbEXKYoVFQUYmGFEWJAAiAEoAgphpjhmu2aC50vkI6kV6ysOMEozaatMzEtURteYxZDZNK9QNRADCBJYtTR3snJluOeL9PgpF46piYTVm0aRk+y2WljaWh07H3e7n3gKAE5GGJlNpGEp7gtHvVKJYAJqYCjUb5dLL-TwXRASCRA0qaIGheaRJakLZEJpbD5o34Ys5YwEIIISUraCTlEpcrnaEmLJ4kLYUSwUA4sdJ0069AEDCQaNQBEG4oFXblFXnhUkClZrFKbHZ7JoAfQAQkRYvEtrRRbSXPTpYzZUSwUCIZy1eq+bCYjRaKtLbQiCjbSceiIZT41KyFKo1B7uRqHnVllQ6Ebg+LOpKw30mQoVcpIWINCr4xovcmiMpmm0SABjAA26DrAGtLDg68huiG-gy1HoRkENNooXmORoytpdNCtRZlJRfcoAO7ITL8KAAMRwACd253uvWm62912sj37eHmYxB9oQZU9Ez-CNGK6oRWycp4kkUrRl6veOuW7bhu6DbrA3A2A2YB4GA-DcIezZth2p4COeUqXiEKhiNoIT6HmCiFMoKrFFUmr8nOX7JHQf5rpuO6xGAdYCBAkHQbB8GNohJ7dpmRx2uhuRRpOuEPgMhQKGC0ykUmH4UlSHw0QBdHbls7FgNuCHHshPEOHxoaYpoMZ3Goo6ynoWjKFG7oeomMKVsocnUjYinoIBO5kDgrkcUeSH7mevE-PxOaIIZZR6CZQRMuOYJ+Nc1k8u+TzKNY1DOSutFASBYEQVBMFwZpvkofwaHBQgahAioI6RQMELaIEwTEmR3pVilaX-q5ykMUx-Asbl7EFdx-m6YF+l9hV4KmT4WgxkUGj3olc46us+q7PsLlucBoHgaxeXeVx2lDRKQWYthYISDoeFiUUYilNdM7kcQ86rMt2yrU062dYxzE7f1nFaX5qEBeiAniDhgQXaJlwDgExTqvoC2PS8rTvJ8H2ZVtOVsflf2FTpR2jQ6ISSSJeZAmIQKWZC0l2R+SNvB8lho-RX09T92M+YNgPDcDpVE5ZJNidoegqBoEgRfdzVPbqGyvYaprmgGopM5t2Vs3t-1FSVmLmaUKr+PeUVAiWk6gqqaq2bOiPPXqsv7PLFo2FaSvpUpQFdd9fXs-tAPFUD2aYtdahEXNegG7KU4qEqeJmwlTX2fCSIonE1pkAnyKon7x0MhMpTmVVkM4hIUzgiWjUyUlacosork8CQWsMgOMYh2HPjncbuhEvDce08KifUB9asDQdXP472DpTDFagC63Vx1VcJYx7H5eLb36cD576u42eCjc-7Dd6E3wwt4XegBCWcWL8MCNVpX-exCnt915nBOXo3yjN9VrcKjGeIXx6Ev2V9P6R2gYq4uw6ujVWG8h4+3roTIoFNyokQLmVKMFMhjxhKBbB6VYgFNADEGfu4CNru1ZtAnGnNfa7yzvAxBd5P4hTFioAcQt4pYOvvOVMtB0zUBgZrZ+Y9Lz9kHHnSaiARzKGFkYcI-AcAQDgEIS2RBR4Xg8AAWiKEyNRIxXSMD0fogxeixAcJrJgFRINBg3SIudaceYp4U1htODhC46DmNKuoOe+sGHMg0AEPQr5qZKM4YuYhylKFuMxDoUoElkFMlPrdOagScGfgSFRWgESGQKH8aMKM+cmQVTZFGABH5KI-mVllbaG8MkOgmBOIouSxGDHGBOYc7Jo5qnLN3JKpTqKhLdizXqWNuDVNfiCVQ3jCgKkCBHdp3JOnL0eo5D4IyPAxMpjdWxso1C6ECDdU2NkOFLLahlHcqk4LqRWQUKc6y4YoI5NciYCgNC+KmDMaYhzKROWVh5LylyEDCwcZ3O55Mz6QmeZMN57yulzlan8giFN8QvlCHE55qhEnFKSq1cpGM1ZwtmkRa4QKmSixGOofMC8PQcKxX05m3VBm7T+dDMK4tiVyhyeS0sapnHWxlgafYfzzoxjjFoTZlwbrMKwV3BZN8eUrUNNiqBQyBXZOFRDPMocg7C1ZPsuZ3LpZyrWjS7cpD6XsT+S86xaqxKh1KOMbVbD5k0wrq8FGlg8VGQqlay4IdAhizfNCxGLqGYKsqUqrMNDLwTApuTGxl1LjaBKGiqcwRF6OqCXTV1ysTW4vDS-DwwwHEbLjVc9UoxWkpo6Xql6fLjRmgdk7JofyFRglibKEsIx-DKkvtgyWS0bY1vtord6RqKmYwZbmwRHh+wqFba3W8BI9AQgmK8t5Vb+1vUHSA527USEDJzXpSd4jISjCeV6nEt46pCyXRCyFzjV4ojhYuyRw5Gk5wnB3MuTqV6IjXjXYZE7VEhR2fKaeOIskjEJJ+9N96iE7qgPukah6EC6CwuULxdzWQU1ijqhMd6f1V3vhQVOMGm0SNPaKwu1wS5Ao4XgghD6AMWPzLnJBx8yovjqteVh3baN0GAVaQhIax1msY6VDkYJwr0JQVGTQ-M5o4fYQG3BfH8EgME0a7NVTRMBzZYwFlAwozXVUBCIFhi1B3t9DwuFZGRXFsGMXDjShyZAhc65nt9khQikbdpzJodLUUZ8YwCcUdOW4ekUAA */
  predictableActionArguments: true,
  id: 'apiGeomUI',
  initial: 'INIT',
  /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions */
  context: { figure: {} as Figure, temp: { values: [], elements: [], htmlElement: [] } },
  on: {
    BISECTOR_BY_POINTS: 'BISECTOR_BY_POINTS',
    POINT: 'POINT',
    LINE: 'LINE',
    SEGMENT: 'SEGMENT',
    DRAG: 'DRAG',
    DOWNLOAD_LATEX_SVG: 'DOWNLOAD_LATEX_SVG',
    LATEX: 'LATEX',
    LINE_PERPENDICULAR: 'LINE_PERPENDICULAR',
    LINE_PARALLEL: 'LINE_PARALLEL',
    POLYGON: 'POLYGON',
    CIRCLE_CENTER_POINT: 'CIRCLE_CENTER_POINT',
    CIRCLE_RADIUS: 'CIRCLE_RADIUS',
    COLOR: 'COLOR',
    DILATE: 'DILATE',
    MIDDLE: 'MIDDLE',
    MOVE_LABEL: 'MOVE_LABEL',
    NAME_POINT: 'NAME_POINT',
    OPEN: 'OPEN',
    PERPENDICULAR_BISECTOR: 'PERPENDICULAR_BISECTOR',
    POINT_INTERSECTION: 'POINT_INTERSECTION',
    POINT_ON: 'POINT_ON',
    REMOVE: 'REMOVE',
    UNDO: 'UNDO',
    RAY: 'RAY',
    REDO: 'REDO',
    REFLECTION: 'REFLECTION',
    REFLECTION_OVER_LINE: 'REFLECTION_OVER_LINE',
    ROTATE: 'ROTATE',
    SET_OPTIONS: 'SET_OPTIONS',
    HIDE: 'HIDE',
    SAVE: 'SAVE',
    TRANSLATION: 'TRANSLATION'
  },
  entry: 'highlightButton',
  states: {
    INIT: {
      after: {
        1000: 'POINT'
      }
    },
    BISECTOR_BY_POINTS: {
      initial: 'waitingForFirstElement',
      states: {
        waitingForFirstElement: {
          entry: (context) => {
            userMessage('Cliquer sur un premier point (autre que le sommet de l\'angle).')
            context.figure.filter = (e) => e instanceof Point
          },
          on: {
            clickLocation: {
              target: 'waitingForSecondElement',
              actions: (context, event) => {
                context.figure.selectedElements[0] = event.element as Point
              },
              cond: (_, event) => event.element !== undefined
            }
          }
        },
        waitingForSecondElement: {
          entry: () => { userMessage('Cliquer sur le sommet de l\'angle.') },
          on: {
            clickLocation: {
              target: 'waitingForThirdElement',
              actions: (context, event) => {
                context.figure.selectedElements[1] = event.element as Point
              },
              cond: (_, event) => event.element !== undefined
            }
          }
        },
        waitingForThirdElement: {
          entry: () => { userMessage('Cliquer sur un troisième point.') },
          on: {
            clickLocation: {
              target: 'waitingForFirstElement',
              actions: (context, event) => {
                context.figure.selectedElements[2] = event.element as Point
                const [pointOnSide1, origin, pointOnSide2] = context.figure.selectedElements as Point[]
                context.figure.create('BisectorByPoints', { pointOnSide1, pointOnSide2, origin })
                context.figure.saveState()
              },
              cond: (_, event) => event.element !== undefined
            }
          }
        }
      }
    },
    CIRCLE_CENTER_POINT: {
      initial: 'waitingForCenter',
      states: {
        waitingForCenter: {
          entry: (context) => {
            userMessage('Cliquer sur le centre du cercle.')
            context.figure.filter = (e) => e instanceof Point
          },
          on: {
            clickLocation: {
              target: 'waitingForPoint',
              actions: (context, event) => {
                const newPoint = getExistingPointOrCreatedPoint(context, event)
                if (newPoint !== undefined) {
                  context.figure.selectedElements[0] = newPoint
                  context.figure.tempCreate('CircleCenterPoint', {
                    center: context.figure.selectedElements[0] as Point,
                    point: context.figure.pointer
                  })
                }
              },
              cond: (_, event) => getExistingPointOrCreatetPoindWasASuccess(event)
            }
          }
        },
        waitingForPoint: {
          entry: () => {
            userMessage('Cliquer sur un point du cercle.')
          },
          on: {
            clickLocation: {
              target: 'waitingForCenter',
              actions: (context, event) => {
                const newPoint = getExistingPointOrCreatedPoint(context, event)
                if (newPoint !== undefined) {
                  context.figure.selectedElements[1] = newPoint
                  const [center, point] = context.figure.selectedElements as [
                    Point,
                    Point
                  ]
                  context.figure.create('CircleCenterPoint', { center, point })
                  context.figure.saveState()
                }
              },
              cond: (_, event) => getExistingPointOrCreatetPoindWasASuccess(event)
            }
          }
        }
      }
    },
    CIRCLE_RADIUS: {
      initial: 'waitingForCenter',
      states: {
        waitingForCenter: {
          entry: (context) => {
            userMessage('Cliquer sur le centre du cercle.')
            context.figure.filter = (e) => e instanceof Point
          },
          on: {
            clickLocation: {
              target: 'waitingForRadius',
              actions: (context, event) => {
                const newPoint = getExistingPointOrCreatedPoint(context, event)
                if (newPoint !== undefined) {
                  context.figure.selectedElements[0] = newPoint
                  const dialog = createDialoxBoxRadius(context.figure)
                  dialog.showModal()
                }
              },
              cond: (_, event) => getExistingPointOrCreatetPoindWasASuccess(event)
            }
          }
        },
        waitingForRadius: {
          on: {
            RADIUS: {
              target: 'waitingForCenter',
              actions: (context, event) => {
                const radius = event.radius
                const center = context.figure.selectedElements[0] as Point
                if (radius > 0) {
                  context.figure.create('Circle', { center, radius })
                  context.figure.saveState()
                }
              }
            }
          }
        }
      }
    },
    DILATE: {
      entry: (context) => {
        context.figure.filter = (e) => e instanceof Point
      },
      exit: (context) => {
        context.figure.selectedElements.forEach(e => { e.isSelected = false })
        context.figure.selectedElements = []
        context.figure.tmpElements = []
      },
      initial: 'waitingForCenter',
      states: {
        waitingForCenter: {
          entry: () => { userMessage('Cliquer sur le centre de l\'homothétie.') },
          on: {
            clickLocation: {
              target: 'waitingForCoefficient',
              actions: (context, event) => {
                const newPoint = getExistingPointOrCreatedPoint(context, event)
                if (newPoint !== undefined) {
                  context.figure.selectedElements[0] = newPoint
                  const dialog = createDialoxBoxK(context.figure)
                  dialog.showModal()
                }
              },
              cond: (_, event) => getExistingPointOrCreatetPoindWasASuccess(event)
            }
          }
        },
        waitingForCoefficient: {
          on: {
            DILATE_COEF: {
              target: 'waitingForPoint',
              actions: (context, event) => {
                context.temp.values[0] = event.coefficient
              }
            }
          }
        },
        waitingForPoint: {
          entry: (context) => {
            const center = context.figure.selectedElements[0] as Point
            const k = context.temp.values[0]
            context.figure.tempCreate('PointByDilate', { origin: context.figure.pointer, k, center })
            userMessage('Cliquer sur un point.')
          },
          exit: (context) => {
            context.figure.tmpElements.forEach(e => { e.remove() })
          },
          on: {
            clickLocation: {
              target: 'waitingForPoint',
              actions: (context, event) => {
                const center = context.figure.selectedElements[0] as Point
                const origin = event.element as Point
                const k = context.temp.values[0]
                context.figure.create('PointByDilate', { origin, k, center })
                context.figure.saveState()
                context.figure.selectedElements[0] = center
              },
              cond: (_, event) => event.element instanceof Point
            }
          }
        }
      }
    },
    DRAG: {
      entry: (context) => {
        if (context.figure.elements.size > 1) {
          userMessage('Cliquer sur point pour le déplacer.')
        } else {
          userMessage('')
        }
        context.figure.filter = (e) => e instanceof Point && e.isFree
      },
      on: {
        clickLocation: {
          target: 'DRAG',
          actions: (context, event) => {
            context.figure.inDrag = event.element
            context.figure.container.style.cursor = 'move'
          },
          cond: (_, event) => event.element !== undefined
        }
      },
      exit: (context) => {
        context.figure.container.style.cursor = 'default'
        context.figure.inDrag = undefined
      }
    },
    LATEX: {
      entry: (context) => {
        const latex = context.figure.latex
        const blob = new Blob([latex()], { type: 'text/plain' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = url
        a.download = 'figure.tex'
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        context.figure.buttons.get('DRAG')?.click()
      }
    },
    DOWNLOAD_LATEX_SVG: {
      entry: (context) => {
        context.temp.htmlElement[0] = selectionRectangle(context.figure)
        // const svg = context.figure.svg.outerHTML
      },
      on: {
        SELECTION_AREA_TO_SVG: {
          target: 'DRAG',
          actions: (context, event) => {
            const xMin = context.figure.xToSx(context.figure.xMin + context.figure.sxTox(event.xMin))
            const yMax = context.figure.yToSy(context.figure.yMax + context.figure.syToy(event.yMax))
            context.temp.htmlElement[0].remove()
            const svg = context.figure.svg.cloneNode(true) as SVGElement
            svg.setAttribute('width', (event.width).toString())
            svg.setAttribute('height', (event.height).toString())
            svg.setAttribute('viewBox', `${xMin} ${yMax} ${event.width as number} ${event.height as number}`)
            const blob = new Blob([svg.outerHTML], { type: 'image/svg+xml' })
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.style.display = 'none'
            a.href = url
            a.download = 'figure.svg'
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
            document.body.removeChild(a)
            context.figure.buttons.get('DRAG')?.click()
          }
        },
        SELECTION_AREA_TO_LATEX: {
          target: 'DRAG',
          actions: (context, event) => {
            const xMin = context.figure.xMin + context.figure.sxTox(event.xMin)
            const xMax = xMin + context.figure.sxTox(event.width)
            const yMax = context.figure.yMax + context.figure.syToy(event.yMax)
            const yMin = yMax + context.figure.syToy(event.height)
            context.temp.htmlElement[0].remove()
            const latex = context.figure.latex({ xMin, yMin, xMax, yMax })
            const blob = new Blob([latex], { type: 'text/plain' })
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.style.display = 'none'
            a.href = url
            a.download = 'figure.tex'
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
            document.body.removeChild(a)
            context.figure.buttons.get('DRAG')?.click()
          }
        }
      }
    },
    LINE: {
      initial: 'waitingForFirstElement',
      entry: (context) => { context.figure.filter = (e) => e instanceof Point },
      states: {
        waitingForFirstElement: {
          entry: () => { userMessage('Cliquer sur un premier point de la droite.') },
          on: {
            clickLocation: {
              target: 'waitingForSecondElement',
              actions: (context, event) => {
                const newPoint = getExistingPointOrCreatedPoint(context, event)
                if (newPoint !== undefined) {
                  context.figure.selectedElements[0] = newPoint
                  context.figure.tempCreate('Line', { point1: context.figure.selectedElements[0] as Point, point2: context.figure.pointer })
                }
              },
              cond: (_, event) => getExistingPointOrCreatetPoindWasASuccess(event)
            }
          }
        },
        waitingForSecondElement: {
          entry: () => { userMessage('Cliquer sur un deuxième point de la droite.') },
          on: {
            clickLocation: {
              target: 'waitingForFirstElement',
              actions: (context, event) => {
                const newPoint = getExistingPointOrCreatedPoint(context, event)
                if (newPoint !== undefined) {
                  context.figure.selectedElements[1] = newPoint
                  const [point1, point2] = context.figure.selectedElements as [
                    Point,
                    Point
                  ]
                  context.figure.create('Line', { point1, point2 })
                  context.figure.saveState()
                }
              },
              cond: (_, event) => getExistingPointOrCreatetPoindWasASuccess(event)
            }
          }
        }
      }
    },
    LINE_PERPENDICULAR: {
      initial: 'waitingForFirstElement',
      states: {
        waitingForFirstElement: {
          entry: (context) => {
            userMessage('Cliquer sur un point ou une droite.')
            context.figure.filter = (e) =>
              e instanceof Segment || e instanceof Point
          },
          on: {
            clickLocation: {
              target: 'waitingForSecondElement',
              actions: (context, event) => {
                context.figure.selectedElements[0] = event.element
              },
              cond: (_, event) => event.element !== undefined
            }
          }
        },
        waitingForSecondElement: {
          entry: (context) => {
            if (context.figure.selectedElements[0] instanceof Point) {
              userMessage('Cliquer sur une droite.')
              context.figure.filter = (e) => e instanceof Segment
            } else {
              userMessage('Cliquer sur un point.')
              context.figure.filter = (e) => e instanceof Point
            }
          },
          on: {
            clickLocation: {
              target: 'waitingForFirstElement',
              actions: (context, event) => {
                context.figure.selectedElements[1] = event.element
                let point: Point
                let line: Segment
                if (context.figure.selectedElements[0] instanceof Point) {
                  [point, line] = context.figure.selectedElements as [
                    Point,
                    Segment
                  ]
                } else {
                  [line, point] = context.figure.selectedElements as [
                    Segment,
                    Point
                  ]
                }
                context.figure.create('LinePerpendicular', { line, point })
                context.figure.saveState()
              },
              cond: (_, event) => event.element !== undefined
            }
          }
        }
      }
    },
    LINE_PARALLEL: {
      initial: 'waitingForFirstElement',
      states: {
        waitingForFirstElement: {
          entry: (context) => {
            userMessage('Cliquer sur un point ou une droite.')
            context.figure.filter = (e) =>
              e instanceof Segment || e instanceof Point
          },
          on: {
            clickLocation: {
              target: 'waitingForSecondElement',
              actions: (context, event) => {
                context.figure.selectedElements[0] = event.element
              },
              cond: (_, event) => event.element !== undefined
            }
          }
        },
        waitingForSecondElement: {
          entry: (context) => {
            if (context.figure.selectedElements[0] instanceof Point) {
              userMessage('Cliquer sur une droite.')
              context.figure.filter = (e) => e instanceof Segment
            } else {
              userMessage('Cliquer sur un point.')
              context.figure.filter = (e) => e instanceof Point
            }
          },
          on: {
            clickLocation: {
              target: 'waitingForFirstElement',
              actions: (context, event) => {
                context.figure.selectedElements[1] = event.element
                let point: Point
                let line: Segment
                if (context.figure.selectedElements[0] instanceof Point) {
                  [point, line] = context.figure.selectedElements as [
                    Point,
                    Segment
                  ]
                } else {
                  [line, point] = context.figure.selectedElements as [
                    Segment,
                    Point
                  ]
                }
                context.figure.create('LineParallel', { line, point })
                context.figure.saveState()
              },
              cond: (_, event) => event.element !== undefined
            }
          }
        }
      }
    },
    NAME_POINT: {
      initial: 'waitingForPoint',
      states: {
        waitingForPoint: {
          entry: (context) => {
            context.figure.filter = (e) => e instanceof Point
            userMessage('Cliquer sur un point à renommer.')
          },
          on: {
            clickLocation: {
              target: 'waitingForName',
              actions: (context, event) => {
                const newPoint = getExistingPointOrCreatedPoint(context, event)
                if (newPoint !== undefined) {
                  context.temp.elements[0] = newPoint
                }
              },
              cond: (_, event) => getExistingPointOrCreatetPoindWasASuccess(event)
            }
          }
        },
        waitingForName: {
          entry: (context) => {
            const dialog = createDialoxBoxName(context.figure)
            dialog.showModal()
          },
          on: {
            TEXT_FROM_DIALOG: {
              target: 'waitingForPoint',
              actions: (context, event) => {
                const point = context.temp.elements[0] as Point
                point.label = event.text
                context.figure.saveState()
              }
            }
          }
        }
      }
    },
    OPEN: {
      entry: (context) => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = '.json'
        input.onchange = (e: Event) => {
          const file = (e.target as HTMLInputElement).files?.[0]
          if (file === undefined) {
            return
          }
          const reader = new FileReader()
          reader.readAsText(file, 'UTF-8')
          reader.onload = (readerEvent: ProgressEvent<FileReader>) => {
            const content = (readerEvent?.target?.result as string | null) ?? ''
            if (typeof content === 'string' && content !== '') {
              context.figure.loadJson(JSON.parse(content))
            }
          }
        }
        input.click()
        context.figure.buttons.get('DRAG')?.click()
      }
    },
    PERPENDICULAR_BISECTOR: {
      initial: 'waitingForFirstElement',
      states: {
        waitingForFirstElement: {
          entry: (context) => {
            userMessage('Cliquer sur la première extrémité du segment.')
            context.figure.filter = (e) => e instanceof Point
          },
          on: {
            clickLocation: {
              target: 'waitingForSecondElement',
              actions: (context, event) => {
                context.figure.selectedElements[0] = event.element
                context.figure.tempCreate('PerpendicularBisectorByPoints', {
                  point1: context.figure.selectedElements[0] as Point,
                  point2: context.figure.pointer
                })
              },
              cond: (_, event) => event.element !== undefined
            }
          }
        },
        waitingForSecondElement: {
          entry: () => { userMessage('Cliquer sur la deuxième extrémité du segment.') },
          on: {
            clickLocation: {
              target: 'waitingForFirstElement',
              actions: (context, event) => {
                context.figure.selectedElements[1] = event.element
                const [point1, point2] = context.figure.selectedElements as [
                  Point,
                  Point
                ]
                context.figure.create('PerpendicularBisectorByPoints', { point1, point2 })
                context.figure.saveState()
              }
            }
          }
        }
      }
    },
    POLYGON: {
      id: 'polygon',
      initial: 'init',
      on: {
        STOPPOLYGON: '#polygon.STOPPOLYGON'
      },
      states: {
        init: {
          always: 'waitingElement',
          entry: (context) => {
            userMessage('Cliquer sur un sommet du polygone.')
            context.figure.filter = (e) => e instanceof Point
          }
        },
        waitingElement: {
          exit: (context) => {
            context.figure.tmpElements?.forEach(e => { e.remove() })
          },
          on: {
            clickLocation: [
              {
                target: 'waitingElement',
                actions: (context, event) => {
                  if (context.figure.selectedElements.length > 0) {
                    userMessage('Cliquer sur un nouveau sommet ou sur le premier sommet pour terminer.')
                  } else {
                    userMessage('Cliquer sur un sommet du polygone.')
                  }
                  const newPoint = getExistingPointOrCreatedPoint(context, event)
                  if (newPoint !== undefined) {
                    context.figure.selectedElements.push(newPoint)
                    const points = [...context.figure.selectedElements, context.figure.pointer] as Point[]
                    context.figure.tempCreate('Polygon', { points, isChild: true, isBuiltWithSegments: false })
                  }
                },
                cond: (context, event) => {
                  if (context.figure.selectedElements.length < 2) {
                    return getExistingPointOrCreatetPoindWasASuccess(event)
                  }
                  const last = event.element as Point
                  const first = context.figure.selectedElements[0] as Point
                  const isClickOnFirstPoint = last?.id === first?.id
                  return getExistingPointOrCreatetPoindWasASuccess(event) && !isClickOnFirstPoint
                }
              },
              {
                target: 'STOPPOLYGON',
                cond: (context, event) => {
                  if (context.figure.selectedElements.length > 1) {
                    const last = event.element as Point
                    const first = context.figure.selectedElements[0] as Point
                    return last?.id === first?.id
                  }
                  return false
                }
              }
            ]
          }
        },
        STOPPOLYGON: {
          always: {
            target: '#polygon.waitingElement'
          },
          entry: (context) => {
            context.figure.create('Polygon', {
              points: context.figure.selectedElements as Point[]
            })
            userMessage('Cliquer sur un sommet pour créer un autre polygone.')
            context.figure.saveState()
          }
        }
      }
    },
    POINT_INTERSECTION: {
      entry: (context) => {
        context.figure.filter = (e) => e instanceof Segment || e instanceof Circle
      },
      initial: 'waitingForFirstElement',
      states: {
        waitingForFirstElement: {
          entry: () => { userMessage('Cliquer sur une droite, une demi-droite, un segment ou un cercle.') },
          on: {
            clickLocation: {
              target: 'waitingForSecondElement',
              actions: (context, event) => {
                context.figure.selectedElements[0] = event.element
                event.element.isSelected = true
              },
              cond: (_, event) => event.element !== undefined
            }
          },
          exit: (context) => {
            if (context.figure.selectedElements[0]?.isSelected) context.figure.selectedElements[0].isSelected = false
          }
        },
        waitingForSecondElement: {
          on: {
            clickLocation: {
              target: 'waitingForFirstElement',
              actions: (context, event) => {
                context.figure.selectedElements[1] = event.element
                const [element1, element2] = context.figure.selectedElements
                if (element1 instanceof Segment) {
                  if (element2 instanceof Segment) {
                    context.figure.create('PointIntersectionLL', { line1: element1, line2: element2 })
                  }
                  if (element2 instanceof Circle) {
                    context.figure.create('PointsIntersectionLC', { line: element1, circle: element2 })
                  }
                  context.figure.saveState()
                } else if (element1 instanceof Circle) {
                  if (element2 instanceof Segment) {
                    context.figure.create('PointsIntersectionLC', { line: element2, circle: element1 })
                  }
                  if (element2 instanceof Circle) {
                    context.figure.create('PointsIntersectionCC', { circle1: element1, circle2: element2 })
                  }
                  context.figure.saveState()
                }
              },
              cond: (_, event) => event.element !== undefined
            }
          },
          exit: (context) => {
            context.figure.selectedElements.forEach(e => { e.isSelected = false })
          }
        }
      }
    },
    POINT_ON: {
      entry: (context) => {
        context.figure.filter = (e) => e instanceof Segment || e instanceof Circle
        userMessage('Cliquer sur un segment ou un cercle.')
      },
      on: {
        clickLocation: {
          target: 'POINT_ON',
          actions: (context, event) => {
            context.figure.selectedElements[0] = event.element
            if (event.element instanceof Segment) {
              const [point1, point2] = [event.element.point1, event.element.point2]
              const k = ((event.x - point1.x) * (point2.x - point1.x) + (event.y - point1.y) * (point2.y - point1.y)) / (distance(point1, point2) ** 2)
              context.figure.create('PointOnLine', { line: event.element, k })
              context.figure.saveState()
            } else if (event.element instanceof Circle) {
              const angleWithHorizontal = Math.atan2(event.y - event.element.center.y, event.x - event.element.center.x)
              context.figure.create('PointOnCircle', { circle: event.element, angleWithHorizontal })
              context.figure.saveState()
            }
          }
        }
      }
    },
    POINT: {
      initial: 'waitingForLocation',
      entry: () => { userMessage('Cliquer pour créer un point.') },
      states: {
        waitingForLocation: {
          on: {
            clickLocation: {
              target: 'waitingForLocation',
              actions: (context, event) => {
                const { x, y } = event
                context.figure.create('Point', { x, y })
                context.figure.saveState()
              }
            }
          }
        }
      }
    },
    ROTATE: {
      entry: (context) => {
        context.figure.filter = (e) => e instanceof Point
      },
      exit: (context) => {
        context.figure.selectedElements.forEach(e => { e.isSelected = false })
        context.figure.selectedElements = []
        context.figure.tmpElements = []
      },
      initial: 'waitingForCenter',
      states: {
        waitingForCenter: {
          entry: () => { userMessage('Cliquer sur le centre de rotation.') },
          on: {
            clickLocation: {
              target: 'waitingForAngle',
              actions: (context, event) => {
                const newPoint = getExistingPointOrCreatedPoint(context, event)
                if (newPoint !== undefined) {
                  context.figure.selectedElements[0] = newPoint
                  const dialog = createDialoxBoxAngle(context.figure)
                  dialog.showModal()
                }
              },
              cond: (_, event) => getExistingPointOrCreatetPoindWasASuccess(event)
            }
          }
        },
        waitingForAngle: {
          on: {
            ANGLE: {
              target: 'waitingForPoint',
              actions: (context, event) => {
                const angle = event.angle
                context.temp.values[0] = angle
              }
            }
          }
        },
        waitingForPoint: {
          entry: (context) => {
            const center = context.figure.selectedElements[0] as Point
            const angle = context.temp.values[0]
            context.figure.tempCreate('PointByRotation', { origin: context.figure.pointer, angle, center })
            userMessage('Cliquer sur un point.')
          },
          exit: (context) => {
            context.figure.tmpElements.forEach(e => { e.remove() })
          },
          on: {
            clickLocation: {
              target: 'waitingForPoint',
              actions: (context, event) => {
                const center = context.figure.selectedElements[0] as Point
                const origin = event.element as Point
                const angle = context.temp.values[0]
                context.figure.create('PointByRotation', { origin, angle, center })
                context.figure.saveState()
                context.figure.selectedElements[0] = center
              },
              cond: (_, event) => event.element instanceof Point
            }
          }
        }
      }
    },
    SAVE: {
      entry: (context) => {
        const jsonContent = context.figure.json
        const blob = new Blob([jsonContent], { type: 'text/plain' })
        const url = window.URL.createObjectURL(blob)

        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = url
        a.download = 'figure.json'
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        context.figure.buttons.get('DRAG')?.click()
      }
    },
    SET_OPTIONS: {
      entry: (context) => {
        context.figure.filter = (e) => e instanceof Element2D
      },
      on: {
        clickLocation: {
          actions: (context, event) => {
            const element = event.element
            if (element !== undefined) {
              element.color = context.figure.options.color
              element.thickness = context.figure.options.thickness
              if ('isDashed' in element) element.isDashed = context.figure.options.isDashed
              // if ('fillColor' in element) element.fillColor = context.figure.options.fillColor
              // if ('fillOpacity' in element) element.fillOpacity = context.figure.options.fillOpacity
            }
          }
        }
      }
    },
    UNDO: {
      entry: (context) => {
        context.figure.undo()
        context.figure.buttons.get('DRAG')?.click()
      }
    },
    REDO: {
      entry: (context) => {
        context.figure.redo()
        context.figure.buttons.get('DRAG')?.click()
      }
    },
    REFLECTION: {
      initial: 'waitingForCenter',
      entry: (context) => {
        userMessage('Cliquer sur le centre de la symétrie.')
        context.figure.filter = (e) => e instanceof Point
      },
      exit: (context) => {
        context.figure.selectedElements = []
        context.figure.tmpElements.forEach(e => { e.remove() })
      },
      states: {
        waitingForCenter: {
          on: {
            clickLocation: {
              target: 'waitingForPoint',
              actions: (context, event) => {
                context.figure.selectedElements[0] = event.element
              },
              cond: (_, event) => event.element !== undefined
            }
          }
        },
        waitingForPoint: {
          entry: (context) => {
            userMessage('Cliquer sur le point.')
            const center = context.figure.selectedElements[0] as Point
            if (center !== undefined) {
              context.figure.selectedElements[0] = center
              context.figure.tempCreate('PointByReflection', { center, origin: context.figure.pointer })
            }
          },
          on: {
            clickLocation: {
              target: 'waitingForPoint',
              actions: (context, event) => {
                const origin = event.element
                const center = context.figure.selectedElements[0] as Point
                if (origin !== undefined) {
                  context.figure.create('PointByReflection', { center, origin })
                  context.figure.saveState()
                  // Le saveState initialise selectedElements à []
                  context.figure.selectedElements[0] = center
                }
              }
            }
          }
        }
      }
    },
    REFLECTION_OVER_LINE: {
      initial: 'waitingForAxis',
      entry: (context) => {
        userMessage('Cliquer sur l\'axe de la symétrie.')
        context.figure.filter = (e) => e instanceof Segment
      },
      exit: (context) => {
        context.figure.selectedElements = []
        context.figure.tmpElements.forEach(e => { e.remove() })
      },
      states: {
        waitingForAxis: {
          on: {
            clickLocation: {
              target: 'waitingForPoint',
              actions: (context, event) => {
                context.figure.selectedElements[0] = event.element
              },
              cond: (_, event) => event.element !== undefined
            }
          }
        },
        waitingForPoint: {
          entry: (context) => {
            userMessage('Cliquer sur le point.')
            context.figure.filter = (e) => e instanceof Point
            const line = context.figure.selectedElements[0] as Segment
            if (line !== undefined) {
              context.figure.selectedElements[0] = line
              context.figure.tempCreate('PointByReflectOverLine', { line, origin: context.figure.pointer })
            }
          },
          on: {
            clickLocation: {
              target: 'waitingForPoint',
              actions: (context, event) => {
                const origin = event.element
                const line = context.figure.selectedElements[0] as Segment
                if (origin !== undefined) {
                  context.figure.create('PointByReflectOverLine', { line, origin })
                  context.figure.saveState()
                  // Le saveState initialise selectedElements à []
                  context.figure.selectedElements[0] = line
                }
              }
            }
          }
        }
      }
    },
    SEGMENT: {
      initial: 'waitingForFirstElement',
      states: {
        waitingForFirstElement: {
          entry: (context) => {
            userMessage('Cliquer sur la première extrémité du segment.')
            context.figure.filter = (e) => e instanceof Point
          },
          on: {
            clickLocation: {
              target: 'waitingForSecondElement',
              actions: (context, event) => {
                const newPoint = getExistingPointOrCreatedPoint(context, event)
                if (newPoint !== undefined) {
                  context.figure.selectedElements[0] = newPoint
                  context.figure.tempCreate('Segment', {
                    point1: context.figure.selectedElements[0] as Point,
                    point2: context.figure.pointer
                  })
                }
              },
              cond: (_, event) => getExistingPointOrCreatetPoindWasASuccess(event)
            }
          }
        },
        waitingForSecondElement: {
          entry: () => { userMessage('Cliquer sur la deuxième extrémité du segment.') },
          on: {
            clickLocation: {
              target: 'waitingForFirstElement',
              actions: (context, event) => {
                const newPoint = getExistingPointOrCreatedPoint(context, event)
                if (newPoint !== undefined) {
                  context.figure.selectedElements[1] = newPoint
                  const [point1, point2] = context.figure.selectedElements as [
                    Point,
                    Point
                  ]
                  context.figure.create('Segment', { point1, point2 })
                  context.figure.saveState()
                }
              },
              cond: (_, event) => getExistingPointOrCreatetPoindWasASuccess(event)
            }
          }
        }
      }
    },
    RAY: {
      initial: 'waitingForFirstElement',
      states: {
        waitingForFirstElement: {
          entry: (context) => {
            userMessage('Cliquer sur l\'origine de la demi-droite.')
            context.figure.filter = (e) => e instanceof Point
          },
          on: {
            clickLocation: {
              target: 'waitingForSecondElement',
              actions: (context, event) => {
                const newPoint = getExistingPointOrCreatedPoint(context, event)
                if (newPoint !== undefined) {
                  context.figure.selectedElements[0] = newPoint
                  context.figure.tempCreate('Ray', {
                    point1: context.figure.selectedElements[0] as Point,
                    point2: context.figure.pointer
                  })
                }
              },
              cond: (_, event) => getExistingPointOrCreatetPoindWasASuccess(event)
            }
          }
        },
        waitingForSecondElement: {
          entry: () => { userMessage('Cliquer un point de la demi-droite.') },
          on: {
            clickLocation: {
              target: 'waitingForFirstElement',
              actions: (context, event) => {
                const newPoint = getExistingPointOrCreatedPoint(context, event)
                if (newPoint !== undefined) {
                  context.figure.selectedElements[1] = newPoint
                  const [point1, point2] = context.figure.selectedElements as [
                    Point,
                    Point
                  ]
                  context.figure.create('Ray', { point1, point2 })
                  context.figure.saveState()
                }
              },
              cond: (_, event) => getExistingPointOrCreatetPoindWasASuccess(event)
            }
          }
        }
      }
    },
    MIDDLE: {
      initial: 'waitingForFirstElement',
      states: {
        waitingForFirstElement: {
          entry: (context) => {
            userMessage('Cliquer sur la première extrémité du segment.')
            context.figure.filter = (e) => e instanceof Point
          },
          on: {
            clickLocation: {
              target: 'waitingForSecondElement',
              actions: (context, event) => {
                context.figure.selectedElements[0] = event.element
              },
              cond: (_, event) => event.element !== undefined
            }
          }
        },
        waitingForSecondElement: {
          entry: () => { userMessage('Cliquer sur la deuxième extrémité du segment.') },
          on: {
            clickLocation: {
              target: 'waitingForFirstElement',
              actions: (context, event) => {
                context.figure.selectedElements[1] = event.element
                const [point1, point2] = context.figure.selectedElements as [
                  Point,
                  Point
                ]
                context.figure.create('Middle', { point1, point2 })
                context.figure.saveState()
              },
              cond: (_, event) => event.element !== undefined
            }
          }
        }
      }
    },
    MOVE_LABEL: {
      entry: (context) => {
        userMessage('Cliquer sur le point.')
        context.figure.filter = (e) => e instanceof Point
      },
      initial: 'waitingForPoint',
      states: {
        waitingForPoint: {
          on: {
            clickLocation: {
              target: 'waitingForPoint',
              actions: (context, event) => {
                const point = event.element
                context.figure.inDrag = point.elementTextLabel
              }
            }
          }
        }
      }
    },
    HIDE: {
      entry: (context) => {
        userMessage('Cliquer sur l\'élément à cacher.')
        context.figure.filter = (e) => e.isVisible
      },
      on: {
        clickLocation: {
          target: 'HIDE',
          actions: (context, event) => {
            event.element.hide()
            context.figure.saveState()
          },
          cond: (_, event) => event.element !== undefined
        }
      }
    },
    REMOVE: {
      entry: (context) => {
        userMessage('Cliquer sur l\'élément à supprimer.')
        context.figure.filter = (e) => e.isVisible
      },
      on: {
        clickLocation: {
          target: 'REMOVE',
          actions: (_, event) => {
            event.element.remove()
          },
          cond: (_, event) => event.element !== undefined

        }
      }
    },
    TRANSLATION: {
      initial: 'waitingForFistPoint',
      exit: (context) => {
        context.temp.elements.forEach((e) => {
          e.isSelected = false
        })
      },
      states: {
        waitingForFistPoint: {
          entry: (context) => {
            context.figure.filter = (e) => e instanceof Point
            userMessage('Cliquer sur le premier point qui définit de la translation.')
          },
          on: {
            clickLocation: {
              target: 'waitingForSecondPoint',
              actions: (context, event) => {
                const point1 = event.element as Point
                context.temp.elements[0] = point1
                point1.isSelected = true
              },
              cond: (_, event) => event.element !== undefined
            }
          }
        },
        waitingForSecondPoint: {
          entry: () => {
            userMessage('Cliquer sur le deuxième point qui définit de la translation.')
          },
          on: {
            clickLocation: {
              target: 'waitingForOrigin',
              actions: (context, event) => {
                const point2 = event.element as Point
                context.temp.elements[1] = point2
                point2.isSelected = true
              },
              cond: (_, event) => event.element !== undefined
            }
          }
        },
        waitingForOrigin: {
          entry: (context) => {
            userMessage('Cliquer sur l\'objet à transformer.')
            context.figure.filter = (e) => e instanceof Point || e instanceof Segment || e instanceof Circle || e instanceof Polygon
          },
          on: {
            clickLocation: {
              target: 'waitingForOrigin',
              actions: (context, event) => {
                const [point1, point2] = context.temp.elements as [Point, Point]
                const origin = event.element
                context.figure.create('ElementByTranslationByPoints', { point1, point2, origin })
                context.figure.saveState()
              },
              cond: (_, event) => event.element !== undefined
            }
          }
        }
      }
    },
    COLOR: {
      entry: (context, event) => {
        context.figure.options.color = event.text
      }
    }
  }
},
{
  actions: {
    highlightButton: (context, event) => {
      const button = context.figure.buttons.get(event.type)
      if (button !== undefined) {
        button.style.backgroundColor = orangeMathaleaLight
      }
      context.figure.buttons.forEach((value, key) => {
        if (key !== event.type) {
          value.style.backgroundColor = 'white'
        }
      })
    }
  }

}
)

function getExistingPointOrCreatedPoint (context: MyContext, event: MyEvent): Point | undefined {
  if (event.element instanceof Point) {
    return event.element
  }
  const [x, y] = [event.x as number, event.y as number]
  if (event.waitingWithModal === true) return undefined
  return context.figure.create('Point', { x, y })
}

function getExistingPointOrCreatetPoindWasASuccess (event: MyEvent): boolean {
  return event.waitingWithModal === false
}

function userMessage (text: string): void {
  const div = document.querySelector('#userMessage')
  if (div != null) div.innerHTML = text
}

export default ui
