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
