import { type Coords } from '../elements/calculus/Coords'
import { defaultMinSlope } from '../elements/defaultValues'
import type Point from '../elements/points/Point'
import type Figure from '../Figure'
import DynamicNumber from './DynamicNumber'

class Angle extends DynamicNumber {
  start: Point
  center: Point
  end: Point
  constructor (figure: Figure, { start, center, end }: { start: Point, center: Point, end: Point }) {
    super(figure, { isChild: false })
    this.start = start
    this.center = center
    this.end = end
    this.start.subscribe(this)
    this.center.subscribe(this)
    this.end.subscribe(this)
    this.update()
  }

  update (): void {
    this._value = angleOriented(this.start, this.center, this.end)
    this.notify()
  }

  toJSON (): object {
    return {
      idStart: this.start.id,
      idCenter: this.center.id,
      idEnd: this.end.id
    }
  }
}

export default Angle

function angleOriented (A: Point | Coords, O: Point | Coords, B: Point | Coords): number {
  const v = { x: B.x - O.x, y: B.y - O.y }
  const u = { x: A.x - O.x, y: A.y - O.y }
  const s = ((u.x * v.y - v.x * u.y) >= 0) ? 1 : -1 // composante z du produit vectoriel OA^OB
  return s * angle(A, O, B)
}

function angle (A: Point | Coords, O: Point | Coords, B: Point | Coords): number {
  const OA = { x: A.x - O.x, y: A.y - O.y, norme: 0 }
  OA.norme = Math.sqrt(OA.x ** 2 + OA.y ** 2)
  const OB = { x: B.x - O.x, y: B.y - O.y, norme: 0 }
  OB.norme = Math.sqrt(OB.x ** 2 + OB.y ** 2)
  const scalaire = OA.x * OB.x + OA.y * OB.y
  if (OA.norme * OB.norme < defaultMinSlope) {
    return 0 // On évite de retouner un angle NaN, zéro, c'est toujours mieux que NaN.
  }
  return (Math.acos(scalaire / (OA.norme * OB.norme))) * 180 / Math.PI
}
