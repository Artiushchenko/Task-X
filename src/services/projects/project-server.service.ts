'use server'

import { createClientFromServer } from '@/utils/supabase/server'

export async function getServerProjects(onlyLatest = false) {
	const supabase = await createClientFromServer()

	let query = supabase
		.from('projects')
		.select(`*, tasks(id)`)
		.order('created_at', {
			ascending: false
		})

	if (onlyLatest) {
		query = query.limit(5)
	}

	return query
}

export async function getServerProjectBySlug(slug: string) {
	return (await createClientFromServer())
		.from('projects')
		.select(
			`*, tasks(*, subtasks(*), task_participants(*, profiles(*))), project_participants(profiles(*))`
		)
		.eq('slug', slug)
}
