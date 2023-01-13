import Figure from './Figure'
import Point from './elements/points/Point'
import Segment from './elements/lines/Segment'
import TextByPoint from './elements/text/TextByPoint'
import TextByPosition from './elements/text/TextByPosition'
import Line from './elements/lines/Line'
import Ray from './elements/lines/Ray'
import Circle from './elements/lines/Circle'
import CircleCenterPoint from './elements/lines/CircleCenterPoint'
import CircleCenterDynamicRadius from './elements/lines/CircleCenterDyamicRadius'
import DynamicNumber from './dynamicNumbers/DynamicNumber'
import PointIntersectionLL from './elements/points/PointIntersectionLL'
import Middle from './elements/points/Middle'

/**
 * Créé un espace de travail avec les méthodes pour y créer les objets géométriques.
 *
 * FigurePlus est Figure avec des méthodes supplémentaires qui ne sont
 * que des raccourcis pratiques pour l'utilisateur
 *
 * Au lieu de faire :
 *
 *  ```js
 *  const geo = new Figure()
 *  const A = new Point(geo, 3, 5)
 *  ```
 *
 *  On peut faire :
 *
 *  ```js
 *  const geo = new FigurePlus()
 *  const A = geo.point(3, 5)
 *  ```
 */
export class FigurePlus extends Figure {
  /** Crée un point de coordonnées (x, y) */
  point (x: number, y: number, { label, id, color, thickness, shape, size }: { label?: string, id?: string, color?: string, thickness?: number, shape?: 'x' | 'o' | '', size?: number } = {}): Point {
    return new Point(this, { x, y, label, id, color, thickness, shape, size })
  }

  /** Crée un point de coordonnées (x, y) */
  middle (point1: Point, point2: Point, { label, id, color, thickness, shape, size }: { label?: string, id?: string, color?: string, thickness?: number, shape?: 'x' | 'o' | '', size?: number } = {}): Middle {
    return new Middle(this, { point1, point2, label, id, color, thickness, shape, size })
  }

  /** Crée un point à l'intersection de deux droites */
  pointIntersectionLL (line1: Line, line2: Line, { label, id, color, thickness, shape, size }: { label?: string, id?: string, color?: string, thickness?: number, shape?: 'x' | 'o' | '', size?: number } = {}): PointIntersectionLL {
    return new PointIntersectionLL(this, { line1, line2, label, id, color, thickness, shape, size })
  }

  /** Trace un segment qui a pour extrémités deux points (donnés par leur nom ou par la variable qui pointe vers ces points) */
  segment (point1: Point, point2: Point, { id, color, thickness, isDashed }: { id?: string, color?: string, thickness?: number, isDashed?: boolean } = {}): Segment {
    return new Segment(this, { point1, point2, id, color, thickness, isDashed })
  }

  /** Trace la droite qui passe par les deux points (donnés par leur nom ou par la variable qui pointe vers ces points) */
  line (point1: Point, point2: Point, { id, color, thickness, isDashed }: { id?: string, color?: string, thickness?: number, isDashed?: boolean } = {}): Line {
    return new Line(this, { point1, point2, id, color, thickness, isDashed })
  }

  /** Trace la demi-droite d'origine le premier point et qui passe par le deuxième (donnés par leur nom ou par la variable qui pointe vers ces points) */
  ray (point1: Point, point2: Point, { id, color, thickness, isDashed }: { id?: string, color?: string, thickness?: number, isDashed?: boolean } = {}): Ray {
    return new Ray(this, { point1, point2, id, color, thickness, isDashed })
  }

  /** Trace le cercle à partir de son centre et de son rayon */
  circle (center: Point, radius: number, { id, color, fillColor, fillOpacity, thickness, isDashed }: { id?: string, color?: string, fillColor?: 'none', fillOpacity?: number, thickness?: number, isDashed?: boolean } = {}): Circle {
    return new Circle(this, { center, radius, id, color, fillColor, fillOpacity, thickness, isDashed })
  }

  /** Trace le cercle à partir de son centre et de son rayon */
  circleCenterPoint (center: Point, point: Point, { id, color, fillColor, fillOpacity, thickness, isDashed }: { id?: string, color?: string, fillColor?: 'none', fillOpacity?: number, thickness?: number, isDashed?: boolean } = {}): CircleCenterPoint {
    return new CircleCenterPoint(this, { center, point, id, color, fillColor, fillOpacity, thickness, isDashed })
  }

  /** Trace le cercle à partir de son centre et de son rayon */
  circleCenterDistance (center: Point, radius: DynamicNumber, { id, color, fillColor, fillOpacity, thickness, isDashed }: { id?: string, color?: string, fillColor?: 'none', fillOpacity?: number, thickness?: number, isDashed?: boolean } = {}): CircleCenterDynamicRadius {
    return new CircleCenterDynamicRadius(this, { center, radius, id, color, fillColor, fillOpacity, thickness, isDashed })
  }

  /** Créé un texte aux coordonnées (x, y) avec rendu LaTeX par défaut */
  textByPosition (x: number, y: number, text: string, { isLatex = true, color = 'black' }: { isLatex?: boolean, color?: string } = {}): TextByPosition {
    return new TextByPosition(this, { x, y, text, isLatex, color })
  }

  /** Créé un texte aux coordonnées (x, y) avec rendu LaTeX par défaut */
  textByPoint (point: Point, text: string, { isLatex = true, color = 'black', dx, dy }: { isLatex?: boolean, color?: string, dx?: number, dy?: number } = {}): TextByPosition {
    return new TextByPoint(this, { point, text, isLatex, color, dx, dy })
  }
}
