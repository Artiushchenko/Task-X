import type { LucideIcon } from 'lucide-react'
import type { IProfile } from './profile.types'

export interface ISubTask {
	id: string
	title: string
	isCompleted: boolean
}

export interface ITask extends Omit<ISubTask, 'isCompleted'> {
	icon: LucideIcon
	dueDate: Date
	users: IProfile[]
	subTasks: ISubTask[]
	comments: string[]
	resources: string[]
	links: string[]
}

export type TTaskStatus = 'not-started' | 'in-progress' | 'completed'
