'use client'

import { TasksTimeline } from '@/components/tasks-timeline/TasksTimeline'
import { LastTasks } from './last-tasks/LastTasks'
import { ProjectStatisticsChart } from './project-chart/ProjectStatisticsChart'
import { ProjectStatistics } from './project-statistics/ProjectStatistics'

import { Heading } from '@/components/ui/Heading'
import { SearchField } from '@/components/ui/search-field/SearchField'
import { taskStore } from '@/stores/task.store'
import type {
	TGetTasksResponse,
	TGetTodayTasksResponse
} from '@/types/task.types'
import { useEffect } from 'react'
import { Chat } from './chat/Chat'

interface Props {
	tasks: TGetTasksResponse
	todayTasks: TGetTodayTasksResponse
}

export function Dashboard({ tasks, todayTasks }: Props) {
	useEffect(() => {
		taskStore.loadStoreFromServer(tasks)
	}, [])

	return (
		<div className='grid h-screen grid-cols-[3.5fr_1fr]'>
			<div className='overflow-y-auto p-5'>
				<div className='mb-6 flex items-center justify-between'>
					<Heading>Dashboard</Heading>

					<SearchField
						value=''
						onChange={() => {}}
					/>
				</div>

				<div className='mb-7 grid grid-cols-[1fr_3.5fr] gap-4'>
					<ProjectStatistics />

					<ProjectStatisticsChart />
				</div>

				<LastTasks />

				<TasksTimeline todayTasks={todayTasks} />
			</div>

			<Chat />
		</div>
	)
}
