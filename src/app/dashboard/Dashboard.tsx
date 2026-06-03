'use client'

import { TasksTimeline } from '@/components/tasks-timeline/TasksTimeline'
import { LastTasks } from './last-tasks/LastTasks'
import { ProjectStatisticsChart } from './project-chart/ProjectStatisticsChart'
import { ProjectStatistics } from './project-statistics/ProjectStatistics'

import { Heading } from '@/components/ui/Heading'
import { SearchField } from '@/components/ui/search-field/SearchField'
import type {
	TGetProjectsChartDataResponse,
	TGetProjectsStatsResponse
} from '@/types/statistics.types'
import type {
	TGetTasksResponse,
	TGetTodayTasksResponse
} from '@/types/task.types'
import { Chat } from './chat/Chat'

interface Props {
	tasks: TGetTasksResponse
	todayTasks: TGetTodayTasksResponse
	userId: string
	projectsStats: TGetProjectsStatsResponse
	projectsChartData: TGetProjectsChartDataResponse
}

export function Dashboard({
	tasks,
	todayTasks,
	userId,
	projectsStats,
	projectsChartData
}: Props) {
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
					<ProjectStatistics projectsStats={projectsStats} />

					<ProjectStatisticsChart projectsChartData={projectsChartData} />
				</div>

				<LastTasks tasks={tasks} />

				<TasksTimeline todayTasks={todayTasks} />
			</div>

			<Chat userId={userId} />
		</div>
	)
}
