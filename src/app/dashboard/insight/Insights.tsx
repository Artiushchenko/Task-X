'use client'

import { Heading } from '@/components/ui/Heading'
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
			<div className='mb-6'>
				<Heading>Insights</Heading>

				<p className='text-muted-foreground mt-1 text-sm'>
					Overview of all your projects and tasks
				</p>
			</div>

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
