'use server'

import { createClientFromServer } from '@/utils/supabase/server'

export async function getServerProjectsStats() {
	return (await createClientFromServer()).from('projects_stats').select('*')
}
