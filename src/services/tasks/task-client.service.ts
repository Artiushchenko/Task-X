'use client'

import type { Database } from '@/types/db.types'
import { createClient } from '@/utils/supabase/client'

export async function taskClientGetById(id: string) {
	const { data, error } = await createClient()
		.from('tasks')
		.select(`*, subtasks(*)`)
		.eq('id', id)
		.single()

	if (error || !data) {
		throw new Error(error.message || 'Failed to fetch task')
	}

	return data
}

export async function taskClientCreate(
	task: Database['public']['Tables']['tasks']['Insert']
) {
	const { data, error } = await createClient()
		.from('tasks')
		.insert(task)
		.select(`*, subtasks(*)`)
		.single()

	if (error || !data) {
		throw new Error(error.message || 'Failed to create task')
	}

	return data
}

export async function taskClientUpdate(
	id: string,
	task: Database['public']['Tables']['tasks']['Update']
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
