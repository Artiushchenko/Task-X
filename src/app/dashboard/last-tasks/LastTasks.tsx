'use client'

import { TaskList } from '@/components/elements/TaskList'
import { Button } from '@/components/ui/button'
import { getClientTasks } from '@/services/tasks/task-client.service'
import type { TProjectsList } from '@/types/project/project.types'
import type {
	TClientTasksResponse,
	TTaskSortBy,
	TTaskStatus
} from '@/types/task.types'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { AddTaskModal } from './add-task-modal/AddTaskModal'
import { LastTasksProjectFilter } from './LastTasksProjectFilter'
import { LastTasksSort } from './LastTasksSort'
import { LastTasksStatusFilter } from './LastTasksStatusFilter'

interface Props {
	projects: TProjectsList
	tasks: TClientTasksResponse
}

export const LastTasks = ({ projects, tasks }: Props) => {
	const [currentProjectId, setCurrentProjectId] = useState<string | null>(null)
	const [status, setStatus] = useState<TTaskStatus | undefined>(undefined)
	const [sort, setSort] = useState<TTaskSortBy>('asc')
	const [expanded, setExpanded] = useState(false)

	const { data, isFetching, refetch } = useQuery({
		queryKey: ['last-tasks', currentProjectId, status, sort],
		queryFn: () =>
			getClientTasks({
				projectId: currentProjectId,
				status,
				sortByDueDate: sort
			}),
		placeholderData: tasks
	})

	const tasksData = data || []
	const visibleTasks = expanded ? tasksData : tasksData.slice(0, 3)
	const hasMore = tasksData.length > 3

	return (
		<div className='mb-4'>
			<div className='mb-5 flex items-center justify-between'>
				<h2 className='text-xl font-medium'>
					Last Tasks{' '}
					{data && data.length > 0 && (
						<span className='text-lg font-normal opacity-40'>
							({data.length})
						</span>
					)}
				</h2>

				<div className='flex items-center gap-4'>
					<LastTasksProjectFilter
						projects={projects}
						currentProjectId={currentProjectId}
						setCurrentProjectId={setCurrentProjectId}
					/>

					<LastTasksStatusFilter
						status={status}
						setStatus={setStatus}
					/>

					<LastTasksSort
						sort={sort}
						setSort={setSort}
					/>

					<AddTaskModal refetch={refetch} />
				</div>
			</div>

			<TaskList
				isFetching={isFetching}
				tasks={visibleTasks || []}
			/>

			{hasMore && (
				<div className='mt-3 flex justify-center'>
					<Button
						onClick={() => setExpanded(v => !v)}
						aria-expanded={expanded}
						aria-controls='last-tasks-list'
					>
						{expanded ? 'Show less' : `Show ${tasksData.length - 3} more`}
					</Button>
				</div>
			)}
		</div>
	)
}
