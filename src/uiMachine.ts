import type Figure from './Figure'
import Segment from './elements/lines/Segment'
import Point from './elements/points/Point'
import { isStopHidden } from './store'
import { type AnyEventObject, createMachine } from 'xstate'
import type Element2D from './elements/Element2D'
import Circle from './elements/lines/Circle'
import { distance } from './elements/calculus/Coords'
import { createDialoxBoxRadius } from './userInterface/handleDialog'
import { orangeMathaleaLight } from './elements/defaultValues'

interface MyContext {
  figure: Figure
}

export type eventName =
  | 'clickLocation'
  | 'BISSECTOR_BY_POINTS'
  | 'CIRCLE_CENTER_POINT'
  | 'CIRCLE_RADIUS'
  | 'COLOR'
  | 'DRAG'
  | 'HIDE'
  | 'POINT_INTERSECTION'
  | 'LINE'
  | 'LINE_PARALLEL'
  | 'MIDDLE'
  | 'POINT'
  | 'POINT_ON'
  | 'LINE_PERPENDICULAR'
  | 'PERPENDICULAR_BISECTOR'
  | 'POLYGON'
  | 'RADIUS'
  | 'RAY'
  | 'REDO'
  | 'REMOVE'
  | 'SAVE'
  | 'SEGMENT'
  | 'UNDO'

export type eventOptions =
  | { x: number, y: number, element?: Element2D }
  | { text: string }
  | { radius: number }

interface MyEvent extends AnyEventObject {
  x?: number
  y?: number
  element?: Element2D
  text?: string
}

const ui = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEMAOBLA4mA9gWwFUBJAYgAUB5IgOQBUBtABgF1FRUdZ0AXdHAOzYgAHogAsAJgA0IAJ7iAjBIB0CgMwB2BQA4NAVgC+BmWiy5CpADI0Aok1ZIQHLrwFDRCSTPkINYxsoSemKahsYgptj4xCQAyjaYALI2dPZCzjx8go4eXnKICowAbEXKYoVFQUYmGFEWJAAiAEoAgphpjhmu2aC50vkI6kV6ysOMEozaatMzEtURteYxZDZNK9QNRADCBJYtTR3snJluOeL9PgpF46piYTVm0aRk+y2WljaWh07H3e7n3gKAE5GGJlNpGEp7gtHvVKJYAJqYCjUb5dLL-TwXRASCRA0qaIGheaRJakLZEJpbD5o34Ys5YwEIIISUraCTlEpcrnaEmLJ4kLYUSwUA4sdJ0069AEDCQaNQBEG4oFXblFXnhUkClZrFKbHZ7JoAfQAQkRYvEtrRRbSXPTpYzZUSwUCIZy1eq+bCYjRaKtLbQiCjbSceiIZT41KyFKo1B7uRqHnVllQ6Ebg+LOpKw30mQoVcpIWINCr4xovcmiMpmm0SABjAA26DrAGtLDg68huiG-gy1HoRkENNooXmORoytpdNCtRZlJRfcoAO7ITL8KAAMRwACd253uvWm62912sj37eHmYxB9oQZU9Ez-CNGK6oRWycp4kkUrRl6veOuW7bhu6DbrA3A2A2YB4GA-DcIezZth2p4COeUqXiEKhiNoIT6HmCiFMoKrFFUmr8nOX7JHQf5rpuO6xGAdYCBAkHQbB8GNohJ7dpmRx2uhuRRpOuEPgMhQKGC0ykUmH4UlSHw0QBdHbls7FgNuCHHshPEOHxoaYpoMZ3Goo6ynoWjKFG7oeomMKVsocnUjYinoIBO5kDgrkcUeSH7mevE-PxOaIIZZR6CZQRMuOYJ+Nc1k8u+TzKNY1DOSutFASBYEQVBMFwZpvkofwaHBQgahAioI6RQMELaIEwTEmR3pVilaX-q5ykMUx-Asbl7EFdx-m6YF+l9hV4KmT4WgxkUGj3olc46us+q7PsLlucBoHgaxeXeVx2lDRKQWYthYISDoeFiUUYilNdM7kcQ86rMt2yrU062dYxzE7f1nFaX5qEBeiAniDhgQXaJlwDgExTqvoC2PS8rTvJ8H2ZVtOVsflf2FTpR2jQ6ISSSJeZAmIQKWZC0l2R+SNvB8lho-RX09T92M+YNgPDcDpVE5ZJNidoegqBoEgRfdzVPbqGyvYaprmgGopM5t2Vs3t-1FSVmLmaUKr+PeUVAiWk6gqqaq2bOiPPXqsv7PLFo2FaSvpUpQFdd9fXs-tAPFUD2aYtdahEXNegG7KU4qEqeJmwlTX2fCSIonE1pkAnyKon7x0MhMpTmVVkM4hIUzgiWjUyUlacosork8CQWsMgOMYh2HPjncbuhEvDce08KifUB9asDQdXP472DpTDFagC63Vx1VcJYx7H5eLb36cD576u42eCjc-7Dd6E3wwt4XegBCWcWL8MCNVpX-exCnt915nBOXo3yjN9VrcKjGeIXx6Ev2V9P6R2gYq4uw6ujVWG8h4+3roTIoFNyokQLmVKMFMhjxhKBbB6VYgFNADEGfu4CNru1ZtAnGnNfa7yzvAxBd5P4hTFioAcQt4pYOvvOVMtB0zUBgZrZ+Y9Lz9kHHnSaiARzKGFkYcI-AcAQDgEIS2RBR4Xg8AAWiKEyNRIxXSMD0fogxeixAcJrJgFRINBg3SIudaceYp4U1htODhC46DmNKuoOe+sGHMg0AEPQr5qZKM4YuYhylKFuMxDoUoElkFMlPrdOagScGfgSFRWgESGQKH8aMKM+cmQVTZFGABH5KI-mVllbaG8MkOgmBOIouSxGDHGBOYc7Jo5qnLN3JKpTqKhLdizXqWNuDVNfiCVQ3jCgKkCBHdp3JOnL0eo5D4IyPAxMpjdWxso1C6ECDdU2NkOFLLahlHcqk4LqRWQUKc6y4YoI5NciYCgNC+KmDMaYhzKROWVh5LylyEDCwcZ3O55Mz6QmeZMN57yulzlan8giFN8QvlCHE55qhEnFKSq1cpGM1ZwtmkRa4QKmSixGOofMC8PQcKxX05m3VBm7T+dDMK4tiVyhyeS0sapnHWxlgafYfzzoxjjFoTZlwbrMKwV3BZN8eUrUNNiqBQyBXZOFRDPMocg7C1ZPsuZ3LpZyrWjS7cpD6XsT+S86xaqxKh1KOMbVbD5k0wrq8FGlg8VGQqlay4IdAhizfNCxGLqGYKsqUqrMNDLwTApuTGxl1LjaBKGiqcwRF6OqCXTV1ysTW4vDS-DwwwHEbLjVc9UoxWkpo6Xql6fLjRmgdk7JofyFRglibKEsIx-DKkvtgyWS0bY1vtord6RqKmYwZbmwRHh+wqFba3W8BI9AQgmK8t5Vb+1vUHSA527USEDJzXpSd4jISjCeV6nEt46pCyXRCyFzjV4ojhYuyRw5Gk5wnB3MuTqV6IjXjXYZE7VEhR2fKaeOIskjEJJ+9N96iE7qgPukah6EC6CwuULxdzWQU1ijqhMd6f1V3vhQVOMGm0SNPaKwu1wS5Ao4XgghD6AMWPzLnJBx8yovjqteVh3baN0GAVaQhIax1msY6VDkYJwr0JQVGTQ-M5o4fYQG3BfH8EgME0a7NVTRMBzZYwFlAwozXVUBCIFhi1B3t9DwuFZGRXFsGMXDjShyZAhc65nt9khQikbdpzJodLUUZ8YwCcUdOW4ekUAA */
  predictableActionArguments: true,
  id: 'apiGeomUI',
  initial: 'INIT',
  /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions */
  context: {} as { figure: Figure },
  on: {
    BISECTOR_BY_POINTS: 'BISECTOR_BY_POINTS',
    POINT: 'POINT',
    LINE: 'LINE',
    SEGMENT: 'SEGMENT',
    DRAG: 'DRAG',
    LINE_PERPENDICULAR: 'LINE_PERPENDICULAR',
    LINE_PARALLEL: 'LINE_PARALLEL',
    POLYGON: 'POLYGON',
    CIRCLE_CENTER_POINT: 'CIRCLE_CENTER_POINT',
    CIRCLE_RADIUS: 'CIRCLE_RADIUS',
    COLOR: 'COLOR',
    MIDDLE: 'MIDDLE',
    PERPENDICULAR_BISECTOR: 'PERPENDICULAR_BISECTOR',
    POINT_INTERSECTION: 'POINT_INTERSECTION',
    POINT_ON: 'POINT_ON',
    REMOVE: 'REMOVE',
    UNDO: 'UNDO',
    RAY: 'RAY',
    REDO: 'REDO',
    HIDE: 'HIDE',
    SAVE: 'SAVE'
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
                context.figure.selectedElements[0] =
                  getExisitingPointOrCreatedPoint(context, event)
                context.figure.tempCreate('CircleCenterPoint', {
                  center: context.figure.selectedElements[0] as Point,
                  point: context.figure.pointer
                })
              }
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
                context.figure.eraseTempElements()
                context.figure.selectedElements[1] =
                  getExisitingPointOrCreatedPoint(context, event)
                const [center, point] = context.figure.selectedElements as [
                  Point,
                  Point
                ]
                context.figure.create('CircleCenterPoint', { center, point })
              }
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
                context.figure.selectedElements[0] = getExisitingPointOrCreatedPoint(context, event)
                const dialog = createDialoxBoxRadius(context.figure.ui)
                dialog.showModal()
              }
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
                }
              }
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
            context.figure.pointInDrag = event.element
            context.figure.container.style.cursor = 'move'
          }
        }
      },
      exit: (context) => {
        context.figure.container.style.cursor = 'default'
        context.figure.pointInDrag = undefined
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
                context.figure.selectedElements[0] = getExisitingPointOrCreatedPoint(context, event)
                context.figure.tempCreate('Line', { point1: context.figure.selectedElements[0] as Point, point2: context.figure.pointer })
              }
            }
          }
        },
        waitingForSecondElement: {
          entry: () => { userMessage('Cliquer sur un deuxième point de la droite.') },
          on: {
            clickLocation: {
              target: 'waitingForFirstElement',
              actions: (context, event) => {
                context.figure.selectedElements[1] =
                  getExisitingPointOrCreatedPoint(context, event)
                const [point1, point2] = context.figure.selectedElements as [
                  Point,
                  Point
                ]
                context.figure.eraseTempElements()
                context.figure.create('Line', { point1, point2 })
              }
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
              },
              cond: (_, event) => event.element !== undefined
            }
          }
        }
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
                context.figure.tmpElements?.forEach(e => { e.remove() })
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
            context.figure.selectedElements = []
            sendStopIsHidden(true)
            userMessage('Cliquer sur un sommet.')
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
                  userMessage('Cliquer sur un nouveau sommet ou sur le premier sommet pour terminer.')
                  if (event.element instanceof Point) context.figure.selectedElements.push(event.element)
                  if (context.figure.selectedElements.length === 0) {
                    context.figure.tempCreate(
                      'Segment',
                      {
                        point1: context.figure.selectedElements[0] as Point,
                        point2: context.figure.pointer,
                        isChild: true
                      }
                    )
                  } else {
                    const points = [...context.figure.selectedElements, context.figure.pointer] as Point[]
                    context.figure.tempCreate('Polygon', { points, isChild: true, isBuiltWithSegments: false }
                    )
                  }
                  if (context.figure.selectedElements.length > 2) {
                    sendStopIsHidden(false)
                  } else {
                    sendStopIsHidden(true)
                  }
                },
                cond: (context, event) => {
                  if (context.figure.selectedElements.length === 0) {
                    return event.element !== undefined
                  } else {
                    return (
                      event.element !== undefined &&
                      context.figure.selectedElements[0].id !== event.element.id
                    )
                  }
                }
              },
              {
                target: 'STOPPOLYGON',
                cond: (context, event) => {
                  return (
                    event.element !== undefined &&
                    context.figure.selectedElements[0] !== undefined &&
                    context.figure.selectedElements[0].id === event.element.id
                  )
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
            context.figure.selectedElements = []
            sendStopIsHidden(true)
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
              }
            }
          },
          exit: (context) => {
            context.figure.selectedElements[0].isSelected = false
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
                } else if (element1 instanceof Circle) {
                  if (element2 instanceof Segment) {
                    context.figure.create('PointsIntersectionLC', { line: element2, circle: element1 })
                  }
                  if (element2 instanceof Circle) {
                    context.figure.create('PointsIntersectionCC', { circle1: element1, circle2: element2 })
                  }
                }
              }
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
            } else if (event.element instanceof Circle) {
              const angleWithHorizontal = Math.atan2(event.y - event.element.center.y, event.x - event.element.center.x)
              context.figure.create('PointOnCircle', { circle: event.element, angleWithHorizontal })
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
              }
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
    UNDO: {
      entry: (context) => {
        context.figure.historyGoBack()
        context.figure.buttons.get('DRAG')?.click()
      }
    },
    REDO: {
      entry: (context) => {
        context.figure.historyGoForward()
        context.figure.buttons.get('DRAG')?.click()
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
                context.figure.selectedElements[0] =
                  getExisitingPointOrCreatedPoint(context, event)
                context.figure.tempCreate('Segment', {
                  point1: context.figure.selectedElements[0] as Point,
                  point2: context.figure.pointer
                })
              }
            }
          }
        },
        waitingForSecondElement: {
          entry: () => { userMessage('Cliquer sur la deuxième extrémité du segment.') },
          on: {
            clickLocation: {
              target: 'waitingForFirstElement',
              actions: (context, event) => {
                context.figure.selectedElements[1] =
                  getExisitingPointOrCreatedPoint(context, event)
                const [point1, point2] = context.figure.selectedElements as [
                  Point,
                  Point
                ]
                context.figure.create('Segment', { point1, point2 })
                context.figure.tmpElements?.forEach(e => { e.remove() })
              }
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
                context.figure.selectedElements[0] =
                  getExisitingPointOrCreatedPoint(context, event)
                context.figure.tempCreate('Ray', {
                  point1: context.figure.selectedElements[0] as Point,
                  point2: context.figure.pointer
                })
              }
            }
          }
        },
        waitingForSecondElement: {
          entry: () => { userMessage('Cliquer un point de la demi-droite.') },
          on: {
            clickLocation: {
              target: 'waitingForFirstElement',
              actions: (context, event) => {
                context.figure.selectedElements[1] =
                  getExisitingPointOrCreatedPoint(context, event)
                const [point1, point2] = context.figure.selectedElements as [
                  Point,
                  Point
                ]
                context.figure.create('Ray', { point1, point2 })
                context.figure.tmpElements?.forEach(e => { e.remove() })
              }
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
              },
              cond: (_, event) => event.element !== undefined
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
          actions: (_, event) => {
            event.element.hide()
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

function getExisitingPointOrCreatedPoint (context: MyContext, event: MyEvent): Point {
  if (event.element instanceof Point) {
    return event.element
  }
  const [x, y] = [event.x as number, event.y as number]
  return context.figure.create('Point', { x, y })
}

function userMessage (text: string): void {
  const div = document.querySelector('#userMessage')
  if (div != null) div.innerHTML = text
}

function sendStopIsHidden (e: boolean): void {
  isStopHidden.set(e)
}

export default ui
