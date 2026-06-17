'use client'

import { TaskList } from '@/components/elements/TaskList'
import { getClientTasks } from '@/services/tasks/task-client.service'
import type { TProjectsList } from '@/types/project/project.types'
import type { TRole } from '@/types/role.types'
import type {
	TClientTasksResponse,
	TTaskSortBy,
	TTaskStatus
} from '@/types/task.types'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { AddTaskModal } from './add-task-modal/AddTaskModal'
import { TasksProjectFilter } from './TasksProjectFilter'
import { TasksSort } from './TasksSort'
import { TasksStatusFilter } from './TasksStatusFilter'

interface Props {
	projects: TProjectsList
	tasks: TClientTasksResponse
	userRole: TRole | null
}

export const Tasks = ({ projects, tasks, userRole }: Props) => {
	const [currentProjectId, setCurrentProjectId] = useState<string | null>(null)
	const [status, setStatus] = useState<TTaskStatus | undefined>(undefined)
	const [sort, setSort] = useState<TTaskSortBy>('asc')

	const { data, isFetching, refetch } = useQuery({
		queryKey: ['tasks', currentProjectId, status, sort],
		queryFn: () =>
			getClientTasks({
				projectId: currentProjectId,
				status,
				sortByDueDate: sort
			}),
		placeholderData: tasks
	})

	return (
		<div className='mb-4'>
			<div className='mb-5 flex items-center justify-end'>
				<div className='flex items-center gap-4'>
					<TasksProjectFilter
						projects={projects}
						currentProjectId={currentProjectId}
						setCurrentProjectId={setCurrentProjectId}
					/>

					<TasksStatusFilter
						status={status}
						setStatus={setStatus}
					/>

					<TasksSort
						sort={sort}
						setSort={setSort}
					/>

					<AddTaskModal refetch={refetch} />
				</div>
			</div>

			<TaskList
				isFetching={isFetching}
				tasks={data || []}
				userRole={userRole}
			/>
		</div>
	)
}
