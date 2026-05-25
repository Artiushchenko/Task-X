import type { IProfile } from './profile.types'

import type { IconName } from '@/utils/icon-map'

export interface ISubTask {
	id: string
	title: string
	isCompleted: boolean
}

export interface ITask extends Omit<ISubTask, 'isCompleted'> {
	icon: IconName
	dueDate: {
		date: Date
		startTime?: Date
		endTime?: Date
	}
	users: IProfile[]
	subTasks: ISubTask[]
	comments: string[]
	resources: string[]
	links: string[]
}

export interface ITaskWithTime extends ITask {
	dueDate: {
		date: Date
		startTime: Date
		endTime: Date
	}
}

export type TTaskStatus = 'not-started' | 'in-progress' | 'completed'
export type TTaskSortBy = 'asc' | 'desc'
export type TTaskFormData = Pick<ITask, 'title' | 'icon' | 'dueDate'>
export type TSubTaskFormData = Pick<ISubTask, 'title'>
