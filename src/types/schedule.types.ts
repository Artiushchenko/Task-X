import type { Tables } from './db.types'

export type TScheduleTask = Tables<'tasks'> & {
	subtasks: Tables<'subtasks'>[]
	project?: {
		name: string
		color: string | null
	} | null
}

export interface ITaskByDate {
	[date: string]: TScheduleTask[]
}
