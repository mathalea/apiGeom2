import DynamicNumber from '../dynamicNumbers/DynamicNumber'
import Line from './lines/Line'
import Point from './points/Point'

export interface optionsElement2D {
  id?: string
  label?: string
  color?: string
  fillColor?: string | 'none'
  fillOpacity?: number
  thickness?: number
  isDashed?: boolean
  hasToBeSaved?: boolean
}

export interface optionsPoint extends optionsElement2D {
  x: number
  y: number
  shape?: 'x' | 'o' | ''
  size?: number
}

export interface optionsMiddle extends optionsElement2D {
  point1: Point
  point2: Point
  shape?: 'x' | 'o' | ''
  size?: number
  hasToBeSaved?: boolean
}

export interface optionsIntersectionLL extends optionsElement2D {
  line1: Line
  line2: Line
  shape?: 'x' | 'o' | ''
  size?: number
}

export interface optionsCircle extends optionsElement2D {
  center: Point
  radius: number
}

export interface optionsCircleCenterDynamicRadius extends optionsElement2D {
  center: Point
  radius: DynamicNumber
}

export interface optionsCircleCenterPoint extends optionsElement2D {
  center: Point
  point: Point
}

export interface optionsLine extends optionsElement2D {
  point1: Point
  point2: Point
}

export interface optionsText extends optionsElement2D {
  x: number
  y: number
  dx?: number
  dy?: number
  text: string
  isLatex?: boolean
}

export interface optionsRestrictedText extends optionsElement2D {
  point: Point
  dx?: number
  dy?: number
  text: string
  isLatex?: boolean
}

export type typeElement2D = '' |
'Point' | 'PointIntersectionLL' | 'Middle' |
'Segment' | 'Line' | 'Ray' |
'Circle' | 'CircleDynamicRadius' | 'CircleCenterPoint' |
'TextByPosition' | 'TextByPoint' | 'DisplayDistance'
