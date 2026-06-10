import type {
	IInsightsData,
	ITasksByDay,
	ITasksByStatus,
	ITopProject
} from '@/types/insights.types'
import type { TProjectInsight } from '@/types/project.types'

class InsightsService {
	private calculateMetrics(projects: TProjectInsight[]) {
		const totalProjects = projects.length

		const allTasks = projects.flatMap(project => project.tasks || [])
		const totalTasks = allTasks.length
		const completedTasks = allTasks.filter(task =>
			task.subtasks.every(subTask => subTask.is_completed)
		).length
		const activeTasks = allTasks.filter(
			task =>
				task.subtasks.some(subTask => !subTask.is_completed) &&
				task.subtasks.some(subTask => subTask.is_completed)
		).length

		const overallProgress =
			totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

		return {
			totalProjects,
			totalTasks,
			completedTasks,
			activeTasks,
			overallProgress
		}
	}

	private calculateTasksLast90Days(projects: TProjectInsight[]): ITasksByDay[] {
		const allTasks = projects.flatMap(project => project.tasks || [])

		const ninetyDaysAgo = new Date()
		ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90)

		const tasksByDate = new Map<string, number>()

		allTasks.forEach(task => {
			const taskDate = new Date(task.due_date)

			if (taskDate >= ninetyDaysAgo) {
				const dateKey = taskDate.toISOString().split('T')[0]

				tasksByDate.set(dateKey, (tasksByDate.get(dateKey) || 0) + 1)
			}
		})

		const result: ITasksByDay[] = []

		for (let i = 0; i < 90; i++) {
			const date = new Date()
			date.setDate(date.getDate() - i)
			const dateKey = date.toISOString().split('T')[0]

			result.push({
				date: dateKey,
				count: tasksByDate.get(dateKey) || 0
			})
		}

		return result
	}

	private calculateTasksByStatus(projects: TProjectInsight[]): ITasksByStatus {
		const allTasks = projects.flatMap(project => project.tasks || [])
		const completed = allTasks.filter(task =>
			task.subtasks.every(subTask => subTask.is_completed)
		).length
		const active = allTasks.filter(
			task =>
				task.subtasks.some(subTask => !subTask.is_completed) &&
				task.subtasks.some(subTask => subTask.is_completed)
		).length
		const pending = allTasks.filter(task =>
			task.subtasks.every(subTask => !subTask.is_completed)
		).length

		return {
			completed,
			active,
			pending
		}
	}

	private calculateTopProjects(projects: TProjectInsight[]): ITopProject[] {
		return projects
			.map(project => {
				const tasks = project.tasks || []
				const totalTasks = tasks.length
				const completedTasks = tasks.filter(task =>
					task.subtasks.every(subTask => subTask.is_completed)
				).length
				const progress =
					totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

				return {
					...project,
					progress,
					totalTasks,
					completedTasks
				}
			})
			.filter(project => project.totalTasks > 0)
			.sort((a, b) => b.progress - a.progress)
			.slice(0, 10)
	}

	calculate(projects: TProjectInsight[] | null): IInsightsData {
		if (!projects || projects.length === 0) {
			return {
				metrics: this.calculateMetrics(projects || []),
				tasksOvertime: [],
				tasksByStatus: {
					active: 0,
					completed: 0,
					pending: 0
				},
				topProjects: []
			}
		}

		return {
			metrics: this.calculateMetrics(projects),
			tasksOvertime: this.calculateTasksLast90Days(projects),
			tasksByStatus: this.calculateTasksByStatus(projects),
			topProjects: this.calculateTopProjects(projects)
		}
	}
}

export const insightsService = new InsightsService()
