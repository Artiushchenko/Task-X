import { Task } from '@/components/ui/task/Task'
import type { TTaskStatus } from '@/types/task.types'
import { useMemo, useState } from 'react'
import { TASKS } from '../data/last-tasks.data'
import { LastTasksFilter } from './LastTasksFilter'

export function LastTasks() {
	const [status, setStatus] = useState<TTaskStatus | null>(null)

	const filteredTasks = useMemo(() => {
		if (!status) {
			return TASKS
		}

		switch (status) {
			case 'not-started':
				return TASKS.filter(task =>
					task.subTasks.every(subTask => !subTask.isCompleted)
				)
			case 'in-progress':
				return TASKS.filter(task =>
					task.subTasks.some(subTask => !subTask.isCompleted)
				)
			case 'completed':
				return TASKS.filter(task =>
					task.subTasks.every(subTask => subTask.isCompleted)
				)
			default:
				return TASKS
		}
	}, [status])

	return (
		<div>
			<div className='mb-5 flex items-center justify-between'>
				<h2 className='text-xl font-medium'>
					Last Tasks{' '}
					<span className='text-lg font-normal opacity-40'>
						({filteredTasks.length})
					</span>
				</h2>

				<LastTasksFilter
					status={status}
					setStatus={setStatus}
				/>
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
