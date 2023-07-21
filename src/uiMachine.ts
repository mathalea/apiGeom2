import type Figure from './Figure'
import Segment from './elements/lines/Segment'
import Point from './elements/points/Point'
import { isStopHidden } from './store'
import { type AnyEventObject, createMachine } from 'xstate'
import type Element2D from './elements/Element2D'

interface MyContext {
  figure: Figure
}

export type eventName =
  | 'clickLocation'
  | 'POINT'
  | 'LINE'
  | 'SEGMENT'
  | 'DRAG'
  | 'PERPENDICULAR'
  | 'PARALLEL'
  | 'POLYGON'
  | 'COLOR'

export type eventOptions =
  | { x: number, y: number, element?: Element2D }
  | { text: string }

interface MyEvent extends AnyEventObject {
  x?: number
  y?: number
  element?: Element2D
  text?: string
}

const ui = createMachine({
  predictableActionArguments: true,
  id: 'apiGeomUI',
  initial: 'DRAG',
  /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions */
  context: {} as { figure: Figure },
  on: {
    POINT: 'POINT',
    LINE: 'LINE',
    SEGMENT: 'SEGMENT',
    DRAG: 'DRAG',
    PERPENDICULAR: 'PERPENDICULAR',
    PARALLEL: 'PARALLEL',
    POLYGON: 'POLYGON',
    COLOR: 'COLOR'
  },
  states: {
    DRAG: {
      entry: (context) => {
        if (context.figure.elements.size > 1) {
          userMessage('Cliquer sur point pour le déplacer.')
        } else {
          userMessage('')
        }
        context.figure.filter = (e) => e instanceof Point && e.isFree
        context.figure.pointerAction = 'drag'
      },
      on: {
        clickLocation: {
          target: 'DRAG',
          actions: (context, event) => {
            context.figure.pointInDrag = event.element
          }
        }
      },
      exit: (context) => {
        context.figure.pointerAction = ''
        context.figure.pointInDrag = undefined
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
    SEGMENT: {
      initial: 'waitingForFirstElement',
      states: {
        waitingForFirstElement: {
          entry: (context) => {
            userMessage('Cliquer sur la première extrémité du segment.')
            context.figure.filter = (e) => e instanceof Point && e.isFree
          },
          on: {
            clickLocation: {
              target: 'waitingForSecondElement',
              actions: (context, event) => {
                context.figure.selectedElements[0] =
                  getExisitingPointOrCreatedPoint(context, event)
                context.figure.create('Segment', {
                  point1: context.figure.selectedElements[0] as Point,
                  point2: context.figure.pointer
                }).temp()
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
                if (context.figure.tmpElement !== undefined) context.figure.tmpElement.remove()
              }
            }
          }
        }
      }
    },
    LINE: {
      initial: 'waitingForFirstElement',
      states: {
        waitingForFirstElement: {
          entry: () => { userMessage('Cliquer sur un premier point de la droite.') },
          on: {
            clickLocation: {
              target: 'waitingForSecondElement',
              actions: (context, event) => {
                context.figure.selectedElements[0] =
                  getExisitingPointOrCreatedPoint(context, event)
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
                context.figure.create('Line', { point1, point2 })
              }
            }
          }
        }
      }
    },
    PERPENDICULAR: {
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
    PARALLEL: {
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
            context.figure.pointerAction = 'polygon'
            userMessage('Cliquer sur un sommet.')
            context.figure.filter = (e) => e instanceof Point
          }
        },
        waitingElement: {
          exit: (context) => {
            if (context.figure.tmpElement !== undefined) { context.figure.tmpElement.remove() }
          },
          on: {
            clickLocation: [
              {
                target: 'waitingElement',
                actions: (context, event) => {
                  context.figure.selectedElements.push(event.element)
                  if (context.figure.selectedElements.length === 0) {
                    context.figure.create(
                      'Segment',
                      {
                        point1: context.figure.selectedElements[0] as Point,
                        point2: context.figure.pointer
                      }
                    ).temp()
                  } else {
                    const points = [...context.figure.selectedElements, context.figure.pointer] as Point[]
                    context.figure.create('Polygon', { points }
                    ).temp()
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
              points: context.figure.selectedElements as Point[],
              color: 'blue'
            })
            context.figure.selectedElements = []
            sendStopIsHidden(true)
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
})

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
