import type { LucideIcon } from 'lucide-react'
import type { TProjectWithSlug } from './project/project.types'

export interface IMetricItem {
	id: string
	label: string
	value: number | string
	icon: LucideIcon
	bgColor: string
}

export interface IInsightsMetrics {
	totalProjects: number
	totalTasks: number
	completedTasks: number
	activeTasks: number
	overallProgress: number
}

export interface ITasksByDay {
	date: string
	count: number
}

export interface ITasksByStatus {
	completed: number
	active: number
	pending: number
}

export interface ITopProject extends Pick<
	TProjectWithSlug,
	'id' | 'name' | 'slug' | 'color'
> {
	totalTasks: number
	completedTasks: number
	progress: number
}

export interface IInsightsData {
	metrics: IInsightsMetrics
	tasksOvertime: ITasksByDay[]
	tasksByStatus: ITasksByStatus
	topProjects: ITopProject[]
}
