import { createClient } from '@/utils/supabase/client'

export async function getProjects() {
	const { data, error } = await createClient()
		.from('projects')
		.select(`*`)
		.order('created_at', {
			ascending: true
		})

	if (error || !data) {
		throw new Error(error.message || 'Failed to get projects')
	}

	return data
}
