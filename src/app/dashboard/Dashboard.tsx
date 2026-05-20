'use client'

import { Heading } from '@/components/ui/Heading'
import { SearchField } from '@/components/ui/search-field/SearchField'
import { LastTasks } from './last-tasks/LastTasks'
import { ProjectStatisticsChart } from './project-chart/ProjectStatisticsChart'
import { ProjectStatistics } from './project-statistics/ProjectStatistics'

export function Dashboard() {
	return (
		<div className='grid grid-cols-[2.7fr_1fr]'>
			<div>
				<div className='flex items-center justify-between mb-6'>
					<Heading>Dashboard</Heading>

					<SearchField
						value=''
						onChange={() => {}}
					/>
				</div>

				<div className='grid grid-cols-[30%_70%] gap-5 mb-7'>
					<ProjectStatistics />

					<ProjectStatisticsChart />
				</div>

				<LastTasks />
			</div>

			<div className='p-5 h-screen flex items-center justify-center'>CHAT</div>
		</div>
	)
}
