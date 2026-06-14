import type { TRole } from '@/types/role.types'
import { Crown, ShieldCheck, User, type LucideIcon } from 'lucide-react'

interface IRoleConfig {
	icon: LucideIcon
	label: string
	color: string
	bgColor: string
	iconColor: string
}

export const ROLE_CONFIG: Record<TRole, IRoleConfig> = {
	owner: {
		icon: Crown,
		label: 'Owner',
		color: 'text-yellow-700 dark:text-yellow-400',
		bgColor: 'bg-yellow-100 dark:bg-yellow-900/70',
		iconColor: 'text-yellow-600 dark:text-yellow-400'
	},
	admin: {
		icon: ShieldCheck,
		label: 'Admin',
		color: 'text-blue-700 dark:text-blue-400',
		bgColor: 'bg-blue-100 dark:bg-blue-900/70',
		iconColor: 'text-blue-600 dark:text-blue-400'
	},
	member: {
		icon: User,
		label: 'Member',
		color: 'text-gray-700 dark:text-gray-400',
		bgColor: 'bg-gray-100 dark:bg-gray-900/70',
		iconColor: 'text-gray-600 dark:text-gray-400'
	}
}
