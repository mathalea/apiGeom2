export interface optionsElement2D {
  id?: string
  name?: string
  color?: string
  fillColor?: string | 'none'
  fillOpacity?: number
  thickness?: number
  hasToBeSaved?: boolean
}

export interface optionsPoint extends optionsElement2D {
  style?: 'x' // Croix
  | 'o' // Rond
  | '' // Point invisible
  size?: number
}

export type typeElement2D = '' |
'Point' |
'Segment' | 'Line' | 'Ray' |
'Circle' | 'CircleDynamicRadius' | 'CircleCenterPoint' |
'TextByPosition' | 'TextByPoint' | 'DisplayDistance'
