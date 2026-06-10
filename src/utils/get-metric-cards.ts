import type { IInsightsMetrics, IMetricItem } from '@/types/insights.types'
import { ChartArea, Check, Folder, Hourglass, NotebookPen } from 'lucide-react'

export function getMetricCards(metrics: IInsightsMetrics): IMetricItem[] {
	if (!metrics) {
		return []
	}

	return [
		{
			id: 'projects',
			label: 'Total Projects',
			value: metrics.totalProjects,
			icon: Folder,
			bgColor: 'bg-blue-200 dark:bg-blue-900/30'
		},
		{
			id: 'tasks',
			label: 'Total Tasks',
			value: metrics.totalTasks,
			icon: NotebookPen,
			bgColor: 'bg-purple-200 dark:bg-purple-900/30'
		},
		{
			id: 'completedTasks',
			label: 'Completed Tasks',
			value: metrics.completedTasks,
			icon: Check,
			bgColor: 'bg-green-200 dark:bg-green-900/30'
		},
		{
			id: 'activeTasks',
			label: 'Active Tasks',
			value: metrics.activeTasks,
			icon: Hourglass,
			bgColor: 'bg-yellow-200 dark:bg-yellow-900/30'
		},
		{
			id: 'progress',
			label: 'Overall Progress',
			value: `${metrics.overallProgress}%`,
			icon: ChartArea,
			bgColor: 'bg-indigo-200 dark:bg-indigo-900/30'
		}
	]
}
