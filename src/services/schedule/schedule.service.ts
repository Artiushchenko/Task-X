import type { ITaskByDate, TScheduleTask } from '@/types/schedule.types'

class ScheduleService {
	private formatDateKey(date: Date): string {
		return date.toISOString().split('T')[0]
	}

	groupTasksByDate(tasks: TScheduleTask[]): ITaskByDate {
		const taskByDate: ITaskByDate = {}

		tasks.forEach(task => {
			const dateKey = task.due_date.split('T')[0]

			if (!taskByDate[dateKey]) {
				taskByDate[dateKey] = []
			}

			taskByDate[dateKey].push(task)
		})

		return taskByDate
	}

	hasTasksOnDate(date: Date, tasksByDate: ITaskByDate): boolean {
		const dateKey = this.formatDateKey(date)

		return !!tasksByDate[dateKey] && tasksByDate[dateKey].length > 0
	}

	getTasksForDate(date: Date, tasksByDate: ITaskByDate): TScheduleTask[] {
		const dateKey = this.formatDateKey(date)

		return tasksByDate[dateKey] || []
	}

	sortTasksByTime(tasks: TScheduleTask[]): TScheduleTask[] {
		return tasks.sort((a, b) => {
			const timeA = a.start_time || '23:59'
			const timeB = b.start_time || '23:59'

			return timeA.localeCompare(timeB)
		})
	}

	private normalizeDate(date: Date): Date {
		return new Date(date.getFullYear(), date.getMonth(), date.getDate())
	}

	getStartOfDay(date: Date = new Date()): Date {
		return this.normalizeDate(date)
	}
}

export const scheduleService = new ScheduleService()
