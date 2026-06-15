'use client'

import { PageHeader } from '@/components/ui/PageHeader'
import type { IInsightsData } from '@/types/insights.types'
import { getMetricCards } from '@/utils/get-metric-cards'
import { useMemo } from 'react'
import { InsightsMetrics } from './metrics/InsightsMetrics'
import { TasksByStatusChart } from './TasksByStatusChart'
import { TasksOvertimeChart } from './TasksOvertimeChart'
import { TopProjectsTable } from './TopProjectsTable'

interface Props {
	data: IInsightsData
}

export function Insights({ data }: Props) {
	const metricItems = useMemo(
		() => getMetricCards(data.metrics),
		[data.metrics]
	)

	return (
		<div className='h-screen overflow-y-auto p-5'>
			<PageHeader
				title='Insights'
				description='Overview of all your projects and tasks'
			/>

			<div className='mb-4'>
				<InsightsMetrics metricItems={metricItems} />
			</div>

			<div className='mb-4 grid grid-cols-2 gap-4'>
				<TasksOvertimeChart data={data.tasksOvertime} />

				<TasksByStatusChart data={data.tasksByStatus} />
			</div>

			<div>
				<TopProjectsTable projects={data.topProjects} />
			</div>
		</div>
	)
}
