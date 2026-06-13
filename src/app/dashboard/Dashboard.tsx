'use client'

import { TasksTimeline } from '@/components/tasks-timeline/TasksTimeline'
import { LastTasks } from './last-tasks/LastTasks'
import { ProjectStatisticsChart } from './project-chart/ProjectStatisticsChart'
import { ProjectStatistics } from './project-statistics/ProjectStatistics'

import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/Heading'
import { isGlobalSearchOpenAtom } from '@/store/store'
import type { TProjectsList } from '@/types/project/project.types'
import type {
	TGetProjectsChartDataResponse,
	TGetProjectsStatsResponse
} from '@/types/statistics.types'
import type {
	TGetTasksResponse,
	TGetTodayTasksResponse
} from '@/types/task.types'
import { cn } from '@/utils'
import { useSetAtom } from 'jotai'
import { Search } from 'lucide-react'
import { Chat } from './chat/Chat'

interface Props {
	tasks: TGetTasksResponse
	todayTasks: TGetTodayTasksResponse
	userId: string
	projects: TProjectsList
	projectsStats: TGetProjectsStatsResponse
	projectsChartData: TGetProjectsChartDataResponse
}

export function Dashboard({
	tasks,
	todayTasks,
	userId,
	projects,
	projectsStats,
	projectsChartData
}: Props) {
	const setIsOpen = useSetAtom(isGlobalSearchOpenAtom)

	return (
		<div className='grid h-screen grid-cols-[3.5fr_1fr]'>
			<div className='overflow-y-auto p-5'>
				<div className='mb-6 flex items-center justify-between'>
					<Heading>Dashboard</Heading>

					<Button
						variant='outline'
						className='text-muted-foreground relative h-9 w-full max-w-sm justify-start gap-2 text-sm'
						onClick={() => setIsOpen(true)}
					>
						<Search className='h-4 w-4' />

						<span>What are you looking for?</span>

						<span className='text-muted-foreground ml-auto hidden items-center gap-1 text-xs sm:flex'>
							<kbd className='bg-muted hidden h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] leading-none sm:flex'>
								⌘<span className='opacity-60'>or</span>
								Ctrl
								<span className='opacity-60'>+</span>K
							</kbd>
						</span>
					</Button>
				</div>

				<div
					className={cn(
						'mb-7 grid gap-4',
						projectsChartData.length && !projectsStats.length
							? 'grid-cols-1'
							: 'grid-cols-[1fr_3.5fr]'
					)}
				>
					<ProjectStatistics projectsStats={projectsStats} />

					<ProjectStatisticsChart projectsChartData={projectsChartData} />
				</div>

				<LastTasks
					projects={projects}
					tasks={tasks}
				/>

				<TasksTimeline todayTasks={todayTasks} />
			</div>

			<Chat userId={userId} />
		</div>
	)
}
