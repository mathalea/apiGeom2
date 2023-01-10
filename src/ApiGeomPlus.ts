import { ApiGeom } from './ApiGeom'
import { Point } from './elements/Points/Point'
import { Segment } from './elements/Lines/Segment'
import { TextByPoint } from './elements/Text/TextByPoint'
import { TextByPosition } from './elements/Text/TextByPosition'
import { Line } from './elements/Lines/Line'
import { Ray } from './elements/Lines/Ray'
import { Circle } from './elements/Lines/Circle'
import { CircleCenterPoint } from './elements/Lines/CircleCenterPoint'
import { CircleCenterDynamicRadius } from './elements/Lines/CircleCenterDyamicRadius'
import { DynamicNumber } from './dynamicNumbers/DynamicNumber'
import { PointIntersectionLL } from './elements/Points/PointIntersectionLL'

/**
 * Créé un espace de travail avec les méthodes pour y créer les objets géométriques.
 *
 * ApiGeomPlus est ApiGeom avec des méthodes supplémentaires qui ne sont
 * que des raccourcis pratiques pour l'utilisateur
 *
 * Au lieu de faire :
 *
 *  ```js
 *  const geo = new ApiGeom()
 *  const A = new Point(geo, 3, 5)
 *  ```
 *
 *  On peut faire :
 *
 *  ```js
 *  const geo = new ApiGeomPlus()
 *  const A = geo.point(3, 5)
 *  ```
 */
export class ApiGeomPlus extends ApiGeom {
  /** Crée un point de coordonnées (x, y) */
  point (x: number, y: number, { name, id, color, thickness, style, size }: { name?: string, id?: string, color?: string, thickness?: number, style?: 'x' | 'o' | '', size?: number } = {}): Point {
    return new Point(this, x, y, { name, id, color, thickness, style, size })
  }

  /** Crée un point à l'intersection de deux droites */
  pointIntersectionLL (line1: string | Line, line2: string | Line, { name, id, color, thickness, style, size }: { name?: string, id?: string, color?: string, thickness?: number, style?: 'x' | 'o' | '', size?: number } = {}): PointIntersectionLL {
    return new PointIntersectionLL(this, line1, line2, { name, id, color, thickness, style, size })
  }

  /** Trace un segment qui a pour extrémités deux points (donnés par leur nom ou par la variable qui pointe vers ces points) */
  segment (point1: string | Point, point2: string | Point, { id, color, thickness, isDashed }: { id?: string, color?: string, thickness?: number, isDashed?: boolean } = {}): Segment {
    return new Segment(this, point1, point2, { id, color, thickness, isDashed })
  }

  /** Trace la droite qui passe par les deux points (donnés par leur nom ou par la variable qui pointe vers ces points) */
  line (point1: string | Point, point2: string | Point, { id, color, thickness, isDashed }: { id?: string, color?: string, thickness?: number, isDashed?: boolean } = {}): Line {
    return new Line(this, point1, point2, { id, color, thickness, isDashed })
  }

  /** Trace la demi-droite d'origine le premier point et qui passe par le deuxième (donnés par leur nom ou par la variable qui pointe vers ces points) */
  ray (point1: string | Point, point2: string | Point, { id, color, thickness, isDashed }: { id?: string, color?: string, thickness?: number, isDashed?: boolean } = {}): Ray {
    return new Ray(this, point1, point2, { id, color, thickness, isDashed })
  }

  /** Trace le cercle à partir de son centre et de son rayon */
  circle (center: string | Point, radius: number, { id, color, fillColor, fillOpacity, thickness, isDashed }: { id?: string, color?: string, fillColor?: string | 'none', fillOpacity?: number, thickness?: number, isDashed?: boolean } = {}): Circle {
    return new Circle(this, center, radius, { id, color, fillColor, fillOpacity, thickness, isDashed })
  }

  /** Trace le cercle à partir de son centre et de son rayon */
  circleCenterPoint (center: string | Point, point: string | Point, { id, color, fillColor, fillOpacity, thickness, isDashed }: { id?: string, color?: string, fillColor?: string | 'none', fillOpacity?: number, thickness?: number, isDashed?: boolean } = {}): CircleCenterPoint {
    return new CircleCenterPoint(this, center, point, { id, color, fillColor, fillOpacity, thickness, isDashed })
  }

  /** Trace le cercle à partir de son centre et de son rayon */
  circleCenterDistance (center: string | Point, distance: string | DynamicNumber, { id, color, fillColor, fillOpacity, thickness, isDashed }: { id?: string, color?: string, fillColor?: string | 'none', fillOpacity?: number, thickness?: number, isDashed?: boolean } = {}): CircleCenterDynamicRadius {
    return new CircleCenterDynamicRadius(this, center, distance, { id, color, fillColor, fillOpacity, thickness, isDashed })
  }

  /** Créé un texte aux coordonnées (x, y) avec rendu LaTeX par défaut */
  textByPosition (x: number, y: number, text: string, { isLatex = true, color = 'black' }: { isLatex?: boolean, color?: string } = {}): TextByPosition {
    return new TextByPosition(this, x, y, text, { isLatex, color })
  }

  /** Créé un texte aux coordonnées (x, y) avec rendu LaTeX par défaut */
  textByPoint (point: string | Point, text: string, { isLatex = true, color = 'black', dx, dy }: { isLatex?: boolean, color?: string, dx?: number, dy?: number } = {}): TextByPosition {
    return new TextByPoint(this, point, text, { isLatex, color, dx, dy })
  }
}
