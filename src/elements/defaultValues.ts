// Distance entre l'endroit où on clique et les élément
export const defaultDistanceClick = 15

// Taille de l'historique pour la navigation avec le bouton précédent
export const defaultHistorySize = 100

// Nombre de chiffres après la virgule dans les affichages
export const displayDigits = 2

// Pente d'une droite verticale
export const defaultMaxSlope = 10 ** 4

// Pente d'une droite horizontale
export const defaultMinSlope = 10 ** -4

// Ecart entre le lieu du clic et la position de la fenêtre modale en unité de la figure
export const defaultDeltaXModal = 1

// Espace horizontal laissé pour les boutons
export const defaultButtonsWidth = 300

// Espace vertical laissé pour le footer
export const defaultFooterHeight = 30

// Largeur minimale du svg
export const defaultMinWidth = 200

// Hauteur minimale du svg
export const defaultMinHeight = 200

// Déplacement en unités lors du dragAll
export const defaultDragAllDelta = 0.1

// Couleurs
export const colors = {
  DEFAULT: '#F15929',
  lightest: '#f87f5c',
  light: '#f56d45',
  dark: '#F45E27',
  darkest: '#E64A10',
  back: '#f5f1f3',
  backdark: '#dadbdf',
  backdarker: '#cecfd4',
  backcorrection: '#E0A588',
  backnav: '#F15929',
  backnavlight: '#f56d45',
  title: '#342A34',
  titlemenu: '#F15929',
  titlelight: '#f5f1f3',
  titleexercise: '#F15929',
  darkmode: '#2e2e2b',
  darkmodelight: '#363633'
}

export const orangeMathalea = '#F15929'
export const orangeMathaleaLight = 'rgba(241, 89, 41, 0.5)'

const defaultOptions = {
  fontSize: '1em',
  pointSize: 5,
  thickness: 1,
  color: 'black',
  fillColor: 'blue',
  fillOpacity: 0.2,
  isDashed: false,
  tmpThickness: 1,
  tmpColor: 'gray',
  tmpFillColor: orangeMathaleaLight,
  tmpFillOpacity: 0.2,
  tmpIsDashed: true,
  labelDxInPixels: 15,
  labelDyInPixels: 15,
  latexWidth: 18,
  latexHeight: 12,
  moveTextGrid: 15
}

export default defaultOptions
