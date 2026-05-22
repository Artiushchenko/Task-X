import { Task } from '@/components/ui/task/Task'
import type { TTaskSortBy, TTaskStatus } from '@/types/task.types'
import { useMemo, useState } from 'react'
import { TASKS } from '../data/last-tasks.data'
import { LastTasksFilter } from './LastTasksFilter'
import { LastTasksSort } from './LastTasksSort'

export function LastTasks() {
	// TODO: Create a custom hook to manage tasks state
	const [status, setStatus] = useState<TTaskStatus | null>(null)
	const [sortByDueDate, setSortByDueDate] = useState<TTaskSortBy>('asc')

	const filteredTasks = useMemo(() => {
		const filtered = !status
			? TASKS
			: TASKS.filter(task => {
					switch (status) {
						case 'not-started':
							return task.subTasks.every(subTask => !subTask.isCompleted)

						case 'in-progress':
							return task.subTasks.some(subTask => !subTask.isCompleted)

						case 'completed':
							return task.subTasks.every(subTask => subTask.isCompleted)

						default:
							return true
					}
				})

		const sortedTasks = filtered.sort((a, b) => {
			const dateA = new Date(a.dueDate).getTime()
			const dateB = new Date(b.dueDate).getTime()

			return sortByDueDate === 'asc' ? dateA - dateB : dateB - dateA
		})

		return sortedTasks
	}, [status, sortByDueDate])

	return (
		<div>
			<div className='mb-5 flex items-center justify-between'>
				<h2 className='text-xl font-medium'>
					Last Tasks{' '}
					<span className='text-lg font-normal opacity-40'>
						({filteredTasks.length})
					</span>
				</h2>

				<div className='flex items-center gap-4'>
					<LastTasksFilter
						status={status}
						setStatus={setStatus}
					/>

					<LastTasksSort
						sortByDueDate={sortByDueDate}
						setSortByDueDate={setSortByDueDate}
					/>
				</div>
			</div>

			{filteredTasks.length ? (
				<div className='grid grid-cols-3 gap-4'>
					{filteredTasks.map(task => (
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
