'use server'

import { createClientFromServer } from '@/utils/supabase/server'

export async function getServerTasks() {
	return (await createClientFromServer())
		.from('tasks')
		.select(`*, subtasks(*), task_participants(profiles(*))`)
}

export async function getServerTodayTasks() {
	return (await createClientFromServer())
		.from('tasks')
		.select(`*, subtasks(*), task_participants(profiles(*))`)
		.eq('due_date', new Date().toISOString().split('T')[0])
}
