'use client'

import { useState } from 'react'
import { monthlyData, yearlyData } from '../data/project-chart.data'
import { ProjectChart } from './ProjectChart'
import { ProjectChartHeader } from './ProjectChartHeader'

export function ProjectStatisticsChart() {
	const [selectedRange, setSelectedRange] = useState<ITimeRange>({
		label: 'Yearly',
		value: 'yearly'
	})

	const chartData = selectedRange.value === 'yearly' ? yearlyData : monthlyData

	return (
		<div className='h-full bg-white p-5 rounded-2xl'>
			<ProjectChartHeader
				onRangeChange={setSelectedRange}
				selectedRange={selectedRange}
			/>

			<ProjectChart data={chartData} />
		</div>
	)
}
