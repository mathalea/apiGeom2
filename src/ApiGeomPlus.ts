import { ApiGeom } from './ApiGeom'
import { Point } from './elements/Point/Point'
import { Segment } from './elements/Line/Segment'
import { TextByPoint } from './elements/Text/TextByPoint'
import { TextByPosition } from './elements/Text/TextByPosition'

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
  point (x: number, y: number, { name, color, thickness, style, size }: { name?: string, color?: string, thickness?: number, style?: 'x' | 'o' | '', size?: number } = {}): Point {
    return new Point(this, x, y, { name, color, thickness, style, size })
  }

  /** Trace un segment qui a pour extrémités deux points (donnés par leur nom ou par la variable qui pointe vers ces points) */
  segment (point1: string | Point, point2: string | Point, { name, color, thickness }: { name?: string, color?: string, thickness?: number } = {}): Segment {
    return new Segment(this, point1, point2, { name, color, thickness })
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
