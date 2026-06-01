'use client'

import { SkeletonLoader } from '@/components/ui/SkeletonLoader'
import { Task } from '@/components/ui/task/Task'
import { getClientTasks } from '@/services/tasks/task-client.service'
import type { TTaskSortBy, TTaskStatus } from '@/types/task.types'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { LastTasksFilter } from './LastTasksFilter'
import { LastTasksSort } from './LastTasksSort'

type TClientTasksResponse = Awaited<ReturnType<typeof getClientTasks>>

export const LastTasks = ({ tasks }: { tasks: TClientTasksResponse }) => {
	const [status, setStatus] = useState<TTaskStatus | undefined>(undefined)
	const [sort, setSort] = useState<TTaskSortBy>('asc')

	const { data, isPending } = useQuery({
		queryKey: ['tasks', status, sort],
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

			{isPending ? (
				<div className='grid grid-cols-3 gap-4'>
					<SkeletonLoader count={3} />
				</div>
			) : data?.length ? (
				<div className='grid grid-cols-3 gap-4'>
					{data.map(task => (
						<Task
							key={task.id}
							task={task}
						/>
					))}
				</div>
			) : (
				<div>
					<p className='opacity-50'>No tasks available</p>
				</div>
			)}
		</div>
	)
}
