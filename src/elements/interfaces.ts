export interface optionsElement2D {
  id?: string
  name?: string
  color?: string
  thickness?: number
  hasToBeSaved?: boolean
}

export interface optionsPoint extends optionsElement2D {
  style?: 'x' // Croix
  | 'o' // Rond
  | '' // Point invisible
  size?: number
}
