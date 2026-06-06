import type { getClientTasks } from '@/services/tasks/task-client.service'
import type {
	getServerTasks,
	getServerTodayTasks
} from '@/services/tasks/task-server.service'
import type { TaskSchema } from '@/zod-schemes/task.zod'
import type { Control } from 'react-hook-form'
import type z from 'zod'
import type { Database } from './db.types'

export interface ICreateTaskWithParticipants {
	task: Database['public']['Tables']['tasks']['Insert']
	participants?: string[]
}

export type TClientTasksResponse = Awaited<ReturnType<typeof getClientTasks>>
export type TGetTasksResponse = NonNullable<
	Awaited<ReturnType<typeof getServerTasks>>['data']
>
export type TGetTodayTasksResponse = NonNullable<
	Awaited<ReturnType<typeof getServerTodayTasks>>['data']
>

export type TSubTask = Database['public']['Tables']['subtasks']['Row']
export type TSubTaskFormData =
	Database['public']['Tables']['subtasks']['Insert']

export type TTask = Database['public']['Tables']['tasks']['Row'] & {
	subtasks: TSubTask[]
	task_participants: TGetTasksResponse[0]['task_participants']
}
export type TTaskStatus = 'not-started' | 'in-progress' | 'completed'
export type TTaskSortBy = 'asc' | 'desc'

export type TTaskFormData = Database['public']['Tables']['tasks']['Update']
export type TTaskFormControl = Control<z.infer<typeof TaskSchema>>
