'use client'

import { TasksTimeline } from '@/components/tasks-timeline/TasksTimeline'
import { LastTasks } from './last-tasks/LastTasks'
import { ProjectStatisticsChart } from './project-chart/ProjectStatisticsChart'
import { ProjectStatistics } from './project-statistics/ProjectStatistics'

import { Heading } from '@/components/ui/Heading'
import { SearchField } from '@/components/ui/search-field/SearchField'
import { taskStore } from '@/stores/task.store'
import type { TTask } from '@/types/task.types'
import { useEffect } from 'react'

export function Dashboard({ tasks }: { tasks: TTask[] }) {
	useEffect(() => {
		taskStore.loadStoreFromServer(tasks)
	}, [])

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

				<TasksTimeline />
			</div>

			<div className='flex min-h-screen items-center justify-center p-5'>
				CHAT
			</div>
		</div>
	)
}
