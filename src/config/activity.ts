import type { TActivityType } from '@/types/activity.types'
import { Check, File, Plus, type LucideIcon } from 'lucide-react'

interface IActivityConfig {
	icon: LucideIcon
	getTitle: (name: string) => string
	classNameColor: string
}

export const ACTIVITY_CONFIG: Record<TActivityType, IActivityConfig> = {
	PROJECT_CREATED: {
		icon: Plus,
		getTitle: (name: string) => `Project "${name}" was created`,
		classNameColor: 'text-green-600 dark:text-green-400'
	},
	TASK_CREATED: {
		icon: Plus,
		getTitle: (name: string) => `Task "${name}" was created`,
		classNameColor: 'text-blue-600 dark:text-blue-400'
	},
	TASK_UPDATED: {
		icon: File,
		getTitle: (name: string) => `Task "${name}" was updated`,
		classNameColor: 'text-yellow-600 dark:text-yellow-400'
	},
	TASK_COMPLETED: {
		icon: Check,
		getTitle: (name: string) => `Task "${name}" was completed`,
		classNameColor: 'text-purple-600 dark:text-purple-400'
	}
}
