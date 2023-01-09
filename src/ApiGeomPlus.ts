import { ApiGeom } from './ApiGeom'
import { Point } from './elements/Points/Point'
import { Segment } from './elements/Lines/Segment'
import { TextByPoint } from './elements/Text/TextByPoint'
import { TextByPosition } from './elements/Text/TextByPosition'
import { Line } from './elements/Lines/Line'
import { Ray } from './elements/Lines/Ray'
import { Circle } from './elements/Lines/Circle'

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

  /** Trace un segment qui a pour extrémités deux points (donnés par leur nom ou par la variable qui pointe vers ces points) */
  segment (point1: string | Point, point2: string | Point, { id, color, thickness }: { id?: string, color?: string, thickness?: number } = {}): Segment {
    return new Segment(this, point1, point2, { id, color, thickness })
  }

  /** Trace la droite qui passe par les deux points (donnés par leur nom ou par la variable qui pointe vers ces points) */
  line (point1: string | Point, point2: string | Point, { id, color, thickness }: { id?: string, color?: string, thickness?: number } = {}): Line {
    return new Line(this, point1, point2, { id, color, thickness })
  }

  /** Trace la demi-droite d'origine le premier point et qui passe par le deuxième (donnés par leur nom ou par la variable qui pointe vers ces points) */
  ray (point1: string | Point, point2: string | Point, { id, color, thickness }: { id?: string, color?: string, thickness?: number } = {}): Ray {
    return new Ray(this, point1, point2, { id, color, thickness })
  }

  /** Trace le cercle à partir de son centre et de son rayon */
  circle (center: string | Point, radius: number, { id, color, fillColor, fillOpacity, thickness }: { id?: string, color?: string, fillColor?: string | 'none', fillOpacity?: number, thickness?: number } = {}): Circle {
    return new Circle(this, center, radius, { id, color, fillColor, fillOpacity, thickness })
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
