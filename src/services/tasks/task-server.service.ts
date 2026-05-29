'use server'

import { createClientFromServer } from '@/utils/supabase/server'

export async function taskServerGetAll() {
	return (await createClientFromServer()).from('tasks').select(`*, subtasks(*)`)
}

// update(task: TTaskFormData)
// addSubTask
