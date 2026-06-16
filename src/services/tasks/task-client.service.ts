'use client'

import type { Database } from '@/types/db.types'
import type {
	ICreateTaskWithParticipants,
	TTask,
	TTaskSortBy,
	TTaskStatus
} from '@/types/task.types'
import { createClient } from '@/utils/supabase/client'

const TASK_SELECT_QUERY = `
	*, 
	subtasks(*), 
	task_participants(profiles(*))
`

function filterTasks(tasks: TTask[], status: TTaskStatus) {
	return tasks.filter(task => {
		switch (status) {
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

export async function getClientTasks({
	projectId,
	status,
	sortByDueDate
}: {
	projectId?: string | null
	status?: TTaskStatus
	sortByDueDate?: TTaskSortBy
}) {
	let query = createClient().from('tasks').select(TASK_SELECT_QUERY)

	if (projectId) {
		query = query.eq('project_id', projectId)
	}

	if (sortByDueDate) {
		query = query.order('due_date', {
			ascending: sortByDueDate === 'asc'
		})
	}

	const { data, error } = await query

	if (error || !data) {
		throw new Error(error.message || 'Failed to fetch tasks')
	}

	if (status) {
		return filterTasks(data, status)
	}

	return data
}

export async function taskClientGetById(id: string) {
	const { data, error } = await createClient()
		.from('tasks')
		.select(TASK_SELECT_QUERY)
		.eq('id', id)
		.single()

	if (error || !data) {
		throw new Error(error.message || 'Failed to fetch task')
	}

	return data
}

async function syncTaskParticipants(taskId: string, participants: string[]) {
	const client = createClient()

	const { error: deleteError } = await client
		.from('task_participants')
		.delete()
		.eq('task_id', taskId)

	if (deleteError) {
		throw new Error(deleteError.message)
	}

	if (!participants.length) {
		return
	}

	const { error: insertError } = await client.from('task_participants').insert(
		participants.map(profile_id => ({
			task_id: taskId,
			profile_id
		}))
	)

	if (insertError) {
		throw new Error(insertError.message)
	}
}

export async function taskClientCreate({
	task,
	participants = []
}: ICreateTaskWithParticipants) {
	const { data, error } = await createClient()
		.from('tasks')
		.insert(task)
		.select(`*, subtasks(*)`)
		.single()

	if (error || !data) {
		throw new Error(error.message || 'Failed to create task')
	}

	await syncTaskParticipants(data.id, participants)

	return data
}

export async function taskClientUpdate(
	id: string,
	task: Database['public']['Tables']['tasks']['Update'],
	participants: string[] = []
) {
	const { data, error } = await createClient()
		.from('tasks')
		.update(task)
		.eq('id', id)
		.select(`*, subtasks(*)`)
		.single()

	if (error || !data) {
		throw new Error(error.message || 'Failed to update task')
	}

	await syncTaskParticipants(id, participants)

	return data
}

export async function taskClientDelete(id: string) {
	const { data, error } = await createClient()
		.from('tasks')
		.delete()
		.eq('id', id)
		.select(`*, subtasks(*)`)
		.single()

	if (error || !data) {
		throw new Error(error.message || 'Failed to delete task')
	}

	return data
}

export async function createSubTask(
	taskId: string,
	subTask: Database['public']['Tables']['subtasks']['Insert']
) {
	const { data, error } = await createClient()
		.from('subtasks')
		.insert({ ...subTask, task_id: taskId })
		.select(`*`)
		.single()

	if (error || !data) {
		throw new Error(error.message || 'Failed to create subtask')
	}

	return data
}
