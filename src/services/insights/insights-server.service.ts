'use server'

import { createClientFromServer } from '@/utils/supabase/server'

export async function getServerInsightsData() {
	return (await createClientFromServer())
		.from('projects')
		.select(
			`
			*,
			tasks (
				*,
				subtasks (*)
			)
		`
		)
		.order('created_at', { ascending: true })
}
