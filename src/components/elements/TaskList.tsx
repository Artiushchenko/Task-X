import type { TRole } from '@/types/role.types'
import type { TClientTasksResponse } from '@/types/task.types'
import { SkeletonLoader } from '../ui/SkeletonLoader'
import { Task } from '../ui/task/Task'

interface Props {
	isFetching?: boolean
	tasks: TClientTasksResponse
	userRole: TRole | null
}

export function TaskList({ isFetching, tasks, userRole }: Props) {
	return isFetching ? (
		<div className='grid grid-cols-4 gap-4'>
			<SkeletonLoader
				count={3}
				className='h-51'
			/>
		</div>
	) : tasks?.length ? (
		<div className='grid grid-cols-4 gap-4'>
			{tasks.map(task => (
				<Task
					key={task.id}
					task={task}
					userRole={userRole}
				/>
			))}
		</div>
	) : (
		<div>
			<p className='opacity-50'>No tasks available</p>
		</div>
	)
}
