'use client'

import { LastTasks } from './last-tasks/LastTasks'
import { ProjectStatisticsChart } from './project-chart/ProjectStatisticsChart'
import { ProjectStatistics } from './project-statistics/ProjectStatistics'

import { Heading } from '@/components/ui/Heading'
import { SearchField } from '@/components/ui/search-field/SearchField'

export function Dashboard() {
	return (
		<div className='grid grid-cols-[2.7fr_1fr]'>
			<div>
				<div className='mb-6 flex items-center justify-between'>
					<Heading>Dashboard</Heading>

					<SearchField
						value=''
						onChange={() => {}}
					/>
				</div>

				<div className='mb-7 grid grid-cols-[30%_70%] gap-5'>
					<ProjectStatistics />

					<ProjectStatisticsChart />
				</div>

				<LastTasks />
			</div>

			<div className='flex h-screen items-center justify-center p-5'>CHAT</div>
		</div>
	)
}
