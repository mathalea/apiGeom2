export interface optionsElement2D {
  name?: string
  color?: string
  thickness?: number
}

export interface optionsPoint extends optionsElement2D {
  style?: 'x' // Croix
  | 'o' // Rond
  | '' // Point invisible
  size?: number
}
