import { getServerAuth } from '@/utils/supabase/get-server-auth'
import { createClientFromServer } from '@/utils/supabase/server'

export async function getServerUserEntities() {
	const client = await createClientFromServer()
	const user = await getServerAuth()

	if (!user) {
		throw new Error('User not authenticated')
	}

	const { data: projects, error: projectsError } = await client
		.from('projects')
		.select('id, name, created_at')
		.eq('owner_id', user.id)
		.order('created_at', { ascending: false })
		.limit(30)

	const { data: tasks, error: tasksError } = await client
		.from('tasks')
		.select('id, title, created_at, subtasks(*)')
		.eq('owner_id', user.id)
		.order('created_at', { ascending: false })
		.limit(30)

	if (!projects || !tasks) {
		throw new Error('Missing data')
	}

	if (projectsError) {
		throw projectsError
	}

	if (tasksError) {
		throw tasksError
	}

	return {
		projects,
		tasks
	}
}
