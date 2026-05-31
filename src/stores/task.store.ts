import type {
	TGetTasksResponse,
	TSubTaskFormData,
	TTask,
	TTaskFormData,
	TTaskSortBy,
	TTaskStatus
} from '@/types/task.types'
import { isToday } from 'date-fns'
import { makeAutoObservable } from 'mobx'

class TaskStore {
	tasks: TGetTasksResponse = []
	status: TTaskStatus | null = null
	sortByDueDate: TTaskSortBy = 'asc'

	constructor() {
		makeAutoObservable(this)
	}

	loadStoreFromServer(tasks: TGetTasksResponse): void {
		this.tasks = tasks
	}

	get todayTasks() {
		return this.tasks.filter(
			task =>
				isToday(new Date(task.due_date)) && task.start_time && task.end_time
		) as TGetTasksResponse
	}

	getTaskById(id: string): TGetTasksResponse[0] | undefined {
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

		if (!task.subtasks) {
			task.subtasks = []
		}

		// task.subtasks.push({
		// 	id: crypto.randomUUID(),
		// 	title: subTask.title,
		// 	is_completed: false
		// })
	}

	setStatus(status: TTaskStatus | null): void {
		this.status = status
	}

	setSortByDueDate(sortBy: TTaskSortBy): void {
		this.sortByDueDate = sortBy
	}

	get filteredTasks(): TTask[] {
		let filtered = this.tasks

		if (this.status) {
			filtered = filtered.filter(task => {
				switch (this.status) {
					case 'not-started':
						return task?.subtasks?.every(subTask => !subTask.is_completed)

					case 'in-progress':
						return task?.subtasks?.some(subTask => !subTask.is_completed)

					case 'completed':
						return task?.subtasks?.every(subTask => subTask.is_completed)

					default:
						return true
				}
			})
		}

		return filtered.slice().sort((a, b) => {
			const dateA = new Date(a.due_date).getTime()
			const dateB = new Date(b.due_date).getTime()

			return this.sortByDueDate === 'asc' ? dateA - dateB : dateB - dateA
		})
	}
}

export const taskStore = new TaskStore()
