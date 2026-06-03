'use server'

import { createClientFromServer } from '@/utils/supabase/server'

export async function getServerProjectsChartData(
	rangeType: 'yearly' | 'monthly'
) {
	return (await createClientFromServer())
		.from('projects_chart_points')
		.select('*')
		.eq('range_type', rangeType)
		.order('period', { ascending: true })
}
