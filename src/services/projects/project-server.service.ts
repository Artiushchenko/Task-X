'use server'

import { createClientFromServer } from '@/utils/supabase/server'

export async function getServerProjects() {
	return (await createClientFromServer())
		.from('projects')
		.select(`*`)
		.order('created_at', {
			ascending: true
		})
}

export async function getServerProjectBySlug(slug: string) {
	return (await createClientFromServer())
		.from('projects')
		.select(
			`*, tasks(*, subtasks(*), task_participants(*, profiles(*))), project_participants(profiles(*))`
		)
		.eq('slug', slug)
}
