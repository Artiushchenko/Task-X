import type { Database } from './db.types'

export type TSubTask = Database['public']['Tables']['subtasks']['Row']
export type TSubTaskFormData = Pick<TSubTask, 'title'>

export type TTask = Database['public']['Tables']['tasks']['Row'] & {
	subtasks?: TSubTask[]
}
export type TTaskStatus = 'not-started' | 'in-progress' | 'completed'
export type TTaskSortBy = 'asc' | 'desc'
export type TTaskFormData = Pick<TTask, 'title' | 'icon' | 'due_date'>
