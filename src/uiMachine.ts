import type Figure from './Figure'
import Segment from './elements/lines/Segment'
import Point from './elements/points/Point'
import { isStopHidden } from './store'
import { createMachine } from 'xstate'

interface MyContext {
  figure: Figure
}

export type eventMachine =
  | { type: 'clickLocation', x: number, y: number, element: Element | undefined }
  | 'POINT'
  | 'LINE'
  | 'SEGMENT'
  | 'DRAG'
  | 'PERPENDICULAR'
  | 'PARALLEL'
  | 'POLYGON'
  | { type: 'COLOR', text: string }

export const uiMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEMAOBLA4mA9gWwFUBJAYgAUB5IgOQBUBtABgF1FRUdZ0AXdHAOzYgAHogAsAJgA0IAJ6IAzAEZGAOjEB2AGwBWABxidOrUoCcGnQF9LMtFlyFSAGRoBRJqyQgOXXgKGiCJIy8ggmYqqmjFoSGnFKGqamEqbWthjY+MQkAMqumACyrnQeQj48fIJegcFyiKYJqsoSOhJiCgoaCqZGaSB2mY4kACIASgCCmKVe5X5VoDXSdQhKEkpaTYxrCYwqsUp6fQMO2WSuo2fUw0QAwgRO46PT7JwV-tXiS6FKhhKqWhozB0FIYtoCjhkTqQyI9xk4nK4nM9vK85gFPiFEAkjKpGBo9AkkloxJIkhD7FloRQnABNTAUajI2aVdFBL6ICQpDZiAySRjGUxaYnkwbZG7UihPFhlVEsj5szErRgRHSMNUqXb6HSmAkiqGqMaTEgAYwANuhjQBrJw4Y3IOZM2XvBYcmJNBQSLZCrRqxjJRUqHWqCS6YnmQU6DqHGz9SGU1SUGi0VQAd2QFX4UAAYjgAE42u1zE3mq0F+2VR2+OUuhCenSqAlabo-SQ6MTmBSKhSMBSqVXqmJRZQkvXxvKFYrJtMZ7N5rPoXOwbiuU1gPBgfjcYsW6228sCStveYicQKDZtTkKbVRDQ9sSKwVKBurVpaUyGPR6fSjxyqcdFOhU3TXhMxzXMcjAY0BAgFc1w3LczR3MsHWlGYnWPGoz2DSQJCvJI8TvRU9F0JptTEZU-VaTpUhjY54xcahXCAmcwPnRdl1XddN23Us9xQzwXirZ0TwQbp6wOCwrxaWJok7ZZdFMdRogkPQexDHkPR-YhVAYpjpxA2dwMg6DYK4hCS13QsK1QwSj1ZMTVAkyNWlaW8m0VYw-h6ZQdA0TR9CvBQtKIBNzkua47geUZmIM1iFyXUz4J4yz934Q80XlHkNHUNYh2UPRuxJOTvnbbKEiBbVnOxYLQouYoIvuR4YvQUC8wgqD+BgziksQ3irIPGyUSEjDxD0bLJDMHt8sK9oA3ItRAU-JRlC2YjzBqmEJnhRFmta3M2IS7ruN6lL+JlYbWXaDYDGops1KvNsA0SRTfIJPQWg0FJPQkDbYW2pxdsM9qTKO8ykL46yBKGuzMqwm7Ejuj0HvvZYdl7F9+XMTlYhaDbqTpBlcloCgyEoWl6UZQbmWEwI2hVd6ewCgExuJRVOQKyJeTrN8hTPPHyYZQHEuOizkMh86YZrT1sq0MadASWIDEBdzlk9fk+2UbsmzEdYLB+2i41-MmCeoIXQeSsWDyUKHqZGoJNAbT1Nd0VUVJR0I1ibYMQR1gxvtifmTb-YnSfximSHS6sRLu3ElGMH48VMBQCp0NmlDj1QuhJXCXb0BprBjfgcAgOAhDoxwJYymsAFotEVWuasNTBK6jwIfmyrkWZ7Mb+Vqb4zEUxa4nUxb1jxpMW5prFk-UBPfO0WWendrE31xX11i-K9yI6cfAP0lrDMt49bdZA5uTnuIhTzx7lnIiJvOWhpyMFXCav-SdJ7t9Y1Dzgx44BIqydFRxGyl+d8PYEiAmUEoN++QAJTmAgfOK7FhbcE-qyT0egGw6kMCYAB7QgHLDGlgvWTZ8TRCSIYWBE496IL2sDTqqD0Hykqv8OWstux+TGqYIiBJgyvhSNEBIHpozpApL+XSzCazp0UvDIwpISQxFTrfCw6hIxxxdsPAwNVdKA2QYdOCm4pEiV1g2doFg2wpEUS0Dy2gmhiCbEkJOKlnI6LcHotqxlGGg2MYEeR-wREAgFO2PEtisEGEcUkERriDbiO0mcOqVxbiNVGL4jkqxcT4lWCCHoyp2jLxWJrYMBwCRrCVjEURsY4khQSeFZJUUPH7XihxQxaC0IXXlCGNQeJSk5NVEVApPwfiOVWN3ChZ4RyxNFDUsK9V6lNX3vQrxXVWlpIQICP48i-IqD8jrDoc11j-FGcncZxIxC-S2giJwaz1hPn7LsYkz0LEBhMPWJR-JPzKnWL0KZ+pNpwiuY0g6LSzJrM9C9dejykjPNRsrPsBw3ayxZp9C5AKdqLKBssph7TJbRxMJEBeIJMY+0GYCRSux3oRM-NoFFvz4zGwpjc7UbCLAK3xJodYxUsQNCwRA7slirwcMDhTM2qycVVxEnTPsDMrwFWZtoApaxoic2zg0ZISNhWCxyCHBlDI1mfXEpqHkxFVhjQ0GnSQmcfZxyWnyIKdLfziicJKJlHcQTJ0SKCC8yjQh8PuXiTQt5IzRALpYIAA */
  predictableActionArguments: true,
  id: 'apiGeomUI',
  initial: 'DRAG',
  context: {
    figure: {} as Figure
  },
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
        if (context.figure.elements.size > 0) {
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
                    context.figure.create('Polygon', { points, shape: points[0].shape }
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

function getExisitingPointOrCreatedPoint (context: MyContext, event: Event): Point {
  if (event.element instanceof Point) {
    return event.element
  }
  return context.figure.create('Point', { x: event.x, y: event.y })
}

function userMessage (text: string): void {
  const div = document.querySelector('#userMessage')
  if (div != null) div.innerHTML = text
}

function sendStopIsHidden (e: boolean): void {
  isStopHidden.set(e)
}
