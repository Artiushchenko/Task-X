import {
	BookOpen,
	Briefcase,
	Folder,
	Hammer,
	Plane,
	ShoppingBasket,
	TabletSmartphone,
	type LucideIcon
} from 'lucide-react'

export const ICON_NAMES = [
	'Plane',
	'ShoppingBasket',
	'TabletSmartphone',
	'Briefcase',
	'BookOpen',
	'Hammer',
	'Folder'
] as const

export type IconName = (typeof ICON_NAMES)[number]

export const ICON_MAP: Record<IconName, LucideIcon> = {
	Plane,
	ShoppingBasket,
	TabletSmartphone,
	Briefcase,
	BookOpen,
	Hammer,
	Folder
}
