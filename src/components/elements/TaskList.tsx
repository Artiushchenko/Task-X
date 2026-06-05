import type { TClientTasksResponse } from '@/types/task.types'
import { SkeletonLoader } from '../ui/SkeletonLoader'
import { Task } from '../ui/task/Task'

interface Props {
	isPending?: boolean
	tasks: TClientTasksResponse
}

export function TaskList({ isPending, tasks }: Props) {
	return isPending ? (
		<div className='grid grid-cols-3 gap-4'>
			<SkeletonLoader count={3} />
		</div>
	) : tasks?.length ? (
		<div className='grid grid-cols-3 gap-4'>
			{tasks.map(task => (
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
	)
}
