import type { IconProps } from '@/components/animate-ui/icons/icon'
import type { LucideIcon } from 'lucide-react'
import type { FC } from 'react'

export interface IMenuItem {
	icon: FC<IconProps<'default'>> | LucideIcon
	label: string
	href: string
}
