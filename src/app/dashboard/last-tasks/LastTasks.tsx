'use client'

import { TaskList } from '@/components/elements/TaskList'
import { getClientTasks } from '@/services/tasks/task-client.service'
import type {
	TClientTasksResponse,
	TTaskSortBy,
	TTaskStatus
} from '@/types/task.types'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { LastTasksFilter } from './LastTasksFilter'
import { LastTasksSort } from './LastTasksSort'
import { AddTaskModal } from './add-task-modal/AddTaskModal'

export const LastTasks = ({ tasks }: { tasks: TClientTasksResponse }) => {
	const [status, setStatus] = useState<TTaskStatus | undefined>(undefined)
	const [sort, setSort] = useState<TTaskSortBy>('asc')

	const { data, isPending, refetch } = useQuery({
		queryKey: ['last-tasks', status, sort],
		queryFn: () => getClientTasks({ status, sortByDueDate: sort }),
		placeholderData: tasks
	})

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
					<AddTaskModal refetch={refetch} />

					<LastTasksFilter
						status={status}
						setStatus={setStatus}
					/>

					<LastTasksSort
						sort={sort}
						setSort={setSort}
					/>
				</div>
			</div>

			<TaskList
				isPending={isPending}
				tasks={data || []}
			/>
		</div>
	)
}
