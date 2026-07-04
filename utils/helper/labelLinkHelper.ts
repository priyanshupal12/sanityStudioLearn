import type {Path} from 'sanity'

export function isPortableTextAnnotation(path: Path | undefined): boolean {
  if (!path) return false

  return path.some((segment) => typeof segment === 'string' && segment === 'markDefs')
}
