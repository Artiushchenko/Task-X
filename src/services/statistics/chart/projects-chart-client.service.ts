'use client'

import { createClient } from '@/utils/supabase/client'

export async function getClientProjectsChartData(
	rangeType: 'yearly' | 'monthly'
) {
	const client = createClient()

	const { data, error } = await client
		.from('projects_chart_points')
		.select('*')
		.eq('range_type', rangeType)
		.order('period', { ascending: true })

	if (error || !data) {
		throw new Error(error.message || 'Failed to fetch projects chart data')
	}

	return data
}
