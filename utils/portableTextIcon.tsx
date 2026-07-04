import {
  Subscript,
  Superscript,
  CaseLower,
  Highlighter,
  Pen,
  Table,
  Palette,
  Link,
} from 'lucide-react'
import type {ComponentType} from 'react'

export const SubscriptIcon: ComponentType = () => <Subscript size={16} />
export const SuperscriptIcon: ComponentType = () => <Superscript size={16} />
export const SmallTextIcon: ComponentType = () => <CaseLower size={16} />
export const HighlightIcon: ComponentType = () => <Highlighter size={16} />
export const MarkIcon: ComponentType = () => <Pen size={16} />
export const TableIcon: ComponentType = () => <Table size={16} />
export const TextColorIcon: ComponentType = () => <Palette size={16} />
export const LinkIcon: ComponentType = () => <Link size={16} />
