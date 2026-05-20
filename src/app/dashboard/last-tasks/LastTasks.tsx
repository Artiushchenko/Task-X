import { Task } from '@/components/ui/task/Task'
import { TASKS } from '../data/last-tasks.data'

export function LastTasks() {
	return (
		<div>
			<h2 className='text-xl font-medium mb-2'>
				Last Tasks{' '}
				<span className='opacity-50 font-normal'>({TASKS.length})</span>
			</h2>

			{TASKS.length ? (
				<div className='grid grid-cols-3 gap-4'>
					{TASKS.map(task => (
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
