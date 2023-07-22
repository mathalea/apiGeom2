import type DynamicNumber from '../dynamicNumbers/DynamicNumber'
import type Element2D from './Element2D'
import type Circle from './lines/Circle'
import type Line from './lines/Line'
import type Point from './points/Point'
import type Vector from './vector/Vector'

export interface Binome {
  x: number
  y: number
}

export interface OptionsElement2D {
  id?: string
  label?: string
  color?: string
  fillColor?: string | 'none'
  fillOpacity?: number
  thickness?: number
  isDashed?: boolean
  isChild?: boolean
  isSelectable?: boolean
  isVisible?: boolean
}

export interface OptionsPoint extends OptionsElement2D {
  x: number
  y: number
  shape: 'x' | 'o' | '' | '|'
  sizeInPixels?: number
  label?: string
  labelDxInPixels?: number
  labelDyInPixels?: number
  isFree: boolean
}

export interface OptionsPointBy extends OptionsElement2D {
  shape: 'x' | 'o' | '' | '|'
  sizeInPixels?: number
  label?: string
  labelDxInPixels?: number
  labelDyInPixels?: number
  isFree?: boolean
}

export interface OptionsPointByTranslation extends OptionsElement2D {
  origin: Point
  vector: Vector
  shape: 'x' | 'o' | '' | '|'
  sizeInPixels?: number
  isChild?: boolean
  label?: string
  labelDxInPixels?: number
  labelDyInPixels?: number
}
export interface OptionsElementByTranslation extends OptionsElement2D {
  origin: Element2D
  vector: Vector
  shape: 'x' | 'o' | '' | '|'
  sizeInPixels?: number
  isChild?: boolean
  label?: string
  labelDxInPixels?: number
  labelDyInPixels?: number
}

export interface OptionsMiddle extends OptionsElement2D {
  point1: Point
  point2: Point
  shape: 'x' | 'o' | '' | '|'
  sizeInPixels?: number
  isChild?: boolean
  label?: string
  labelDxInPixels?: number
  labelDyInPixels?: number
}

export interface OptionsIntersectionLL extends OptionsElement2D {
  line1: Line
  line2: Line
  shape: 'x' | 'o' | '' | '|'
  InPixels?: number
}

export interface OptionsIntersectionCC extends OptionsElement2D {
  circle1: Circle
  circle2: Circle
  n?: 1 | 2
  shape: 'x' | 'o' | '' | '|'
  sizeInPixels?: number
}

export interface OptionsIntersectionLC extends OptionsElement2D {
  line: Line
  circle: Circle
  n?: 1 | 2
  shape: 'x' | 'o' | '' | '|'
  sizeInPixels: number
}

export interface OptionsCircle extends OptionsElement2D {
  center: Point
  radius: number
}

export interface OptionsCircleCenterDynamicRadius extends OptionsElement2D {
  center: Point
  radius: DynamicNumber
}

/**
 * @param {Point} center
 * @param {Point} point
 */
export interface OptionsCircleCenterPoint extends OptionsElement2D {
  center: Point
  point: Point
}

export interface OptionsPolyline extends OptionsElement2D {
  points: Point[]
}

export interface OptionsPolygon extends OptionsElement2D {
  points: Point[]
}

export interface OptionsLine extends OptionsElement2D {
  point1: Point
  point2: Point
  shape?: '' | '|-|' | '|-' | '-|'
  borderSize?: number
}

export interface OptionsLineParallel extends OptionsElement2D {
  line: Line
  point: Point
}

export interface OptionsLinePerpendicular extends OptionsElement2D {
  line: Line
  point: Point
}

export interface OptionsText extends OptionsElement2D {
  x: number
  y: number
  fontSize?: string
  dx?: number
  dy?: number
  dxInPixels?: number
  dyInPixels?: number
  text: string
  anchor?: 'topLeft' | 'topRight' | 'topCenter' | 'bottomLeft' | 'bottomRight' | 'bottomCenter' | 'middleLeft' | 'middleRight' | 'middleCenter'
}

export interface OptionsDynamicNumber extends OptionsElement2D {
  isChild?: boolean
  textBefore?: string
  textAfter?: string
}

export interface OptionsDynamicText extends OptionsElement2D {
  x: number
  y: number
  dx?: number
  dy?: number
  dynamicNumber: DynamicNumber
  textBefore: string
  textAfter: string
  minimumFractionDigits?: number
  maximumFractionDigits?: number
}

export interface OptionsRestrictedText extends OptionsElement2D {
  point: Point
  dxInPixels?: number
  dyInPixels?: number
  text: string
}

export interface OptionsVector extends OptionsElement2D {
  x: number
  y: number
}

export interface OptionsVectorByPoints extends OptionsElement2D {
  point1: Point
  point2: Point
  origin?: Point
}

export interface OptionsVectorPerpendicular extends OptionsElement2D {
  origin: Point
  line: Line
}

export type typeElement2D = '' |
'Point' | 'PointIntersectionLL' | 'PointIntersectionCC' | 'PointsIntersectionCC' | 'PointIntersectionLC' | 'PointsIntersectionLC' | 'Middle' | 'PointOnLine' |
'PointByTranslation' | 'PointByRotation' | 'PointByDynamicRotation' | 'PointByDilate' | 'PointByDynamicDilate' | 'PointByProjection' | 'PointByProjectionOnAxisX' | 'PointByProjectionOnAxisY' | 'PointByReflectOverLine' | 'PointBySimilarity' |
'PointOnLineAtDistance' | 'PointOnGraph' |
'Segment' | 'Line' | 'Ray' | 'LineParallel' | 'LinePerpendicular' | 'LineByPointVector' | 'PerpendicularBissector' | 'PerpendicularBissectorByPoints' |
'Polyline' | 'Polygon' |
'Circle' | 'CircleDynamicRadius' | 'CircleCenterPoint' |
'TextByPosition' | 'TextByPoint' | 'DisplayDistance' | 'TextDynamicByPosition' |
'Vector' | 'VectorByPoints' | 'VectorPerpendicular' |
'Arc' | 'ArcBy3PointsAndRadius' |
'Distance' | 'Angle' | 'DynamicCalcul' | 'DynamicX' | 'DynamicY' |
'Grid' | 'Graph' | 'Graph2' |
'pointer'
