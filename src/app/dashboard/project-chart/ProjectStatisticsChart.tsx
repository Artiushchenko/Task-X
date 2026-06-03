'use client'

import { getClientProjectsChartData } from '@/services/statistics/chart/projects-chart-client.service'
import type { TClientProjectsChartDataResponse } from '@/types/statistics.types'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { ProjectChart } from './ProjectChart'
import { ProjectChartHeader } from './ProjectChartHeader'

interface Props {
	projectsChartData: TClientProjectsChartDataResponse
}

export function ProjectStatisticsChart({ projectsChartData }: Props) {
	const [selectedRange, setSelectedRange] = useState<ITimeRange>({
		label: 'Yearly',
		value: 'yearly'
	})

	const { data } = useQuery({
		queryKey: ['projects-stats-chart', selectedRange.value],
		queryFn: () => getClientProjectsChartData(selectedRange.value),
		initialData: projectsChartData
	})

	return (
		<div className='bg-card h-full rounded-2xl p-5'>
			<ProjectChartHeader
				onRangeChange={setSelectedRange}
				selectedRange={selectedRange}
			/>

			<ProjectChart data={data || []} />
		</div>
	)
}
