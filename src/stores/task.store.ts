import { TASKS } from '@/app/dashboard/data/last-tasks.data'
import type {
	ITask,
	ITaskWithTime,
	TSubTaskFormData,
	TTaskFormData,
	TTaskSortBy,
	TTaskStatus
} from '@/types/task.types'
import { isToday } from 'date-fns'
import { makeAutoObservable } from 'mobx'

class TaskStore {
	tasks: ITask[] = TASKS
	status: TTaskStatus | null = null
	sortByDueDate: TTaskSortBy = 'asc'

	constructor() {
		makeAutoObservable(this)
	}

	get todayTasks() {
		return this.tasks.filter(
			task =>
				isToday(new Date(task.dueDate.date)) &&
				task.dueDate.startTime &&
				task.dueDate.endTime
		) as ITaskWithTime[]
	}

	getTaskById(id: string): ITask | undefined {
		return this.tasks.find(task => task.id === id)
	}

	updateTask(id: string, updatedTask: TTaskFormData): void {
		const taskIndex = this.tasks.findIndex(task => task.id === id)

		if (taskIndex === -1) {
			return
		}

		this.tasks[taskIndex] = {
			...this.tasks[taskIndex],
			...updatedTask
		}
	}

	addSubTask(taskId: string, subTask: TSubTaskFormData): void {
		const task = this.getTaskById(taskId)

		if (!task) {
			return
		}

		if (!task.subTasks) {
			task.subTasks = []
		}

		task.subTasks.push({
			id: crypto.randomUUID(),
			title: subTask.title,
			isCompleted: false
		})
	}

	setStatus(status: TTaskStatus | null): void {
		this.status = status
	}

	setSortByDueDate(sortBy: TTaskSortBy): void {
		this.sortByDueDate = sortBy
	}

	get filteredTasks(): ITask[] {
		let filtered = this.tasks

		if (this.status) {
			filtered = filtered.filter(task => {
				switch (this.status) {
					case 'not-started':
						return task.subTasks.every(subTask => !subTask.isCompleted)

					case 'in-progress':
						return task.subTasks.some(subTask => !subTask.isCompleted)

					case 'completed':
						return task.subTasks.every(subTask => subTask.isCompleted)

					default:
						return true
				}
			})
		}

		return filtered.slice().sort((a, b) => {
			const dateA = new Date(a.dueDate.date).getTime()
			const dateB = new Date(b.dueDate.date).getTime()

			return this.sortByDueDate === 'asc' ? dateA - dateB : dateB - dateA
		})
	}
}

export const taskStore = new TaskStore()
