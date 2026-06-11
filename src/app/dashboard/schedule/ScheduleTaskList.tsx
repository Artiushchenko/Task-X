import { scheduleService } from '@/services/schedule/schedule.service'
import type { TScheduleTask } from '@/types/schedule.types'
import { useMemo } from 'react'
import { ScheduleTaskCard } from './ScheduleTaskCard'

interface Props {
	tasks: TScheduleTask[]
	selectedDate: Date
}

export function ScheduleTaskList({ tasks, selectedDate }: Props) {
	const sortedTasks = useMemo(() => {
		return scheduleService.sortTasksByTime(tasks)
	}, [tasks])

	const formattedDate = selectedDate.toLocaleDateString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	})

	return (
		<div className='bg-card rounded-2xl p-5'>
			<div className='mb-6'>
				<h2 className='text-lg font-medium'>Tasks for {formattedDate}</h2>

				<p className='text-muted-foreground text-sm'>
					{sortedTasks.length} task{sortedTasks.length !== 1 ? 's' : ''}
				</p>
			</div>

			{sortedTasks.length === 0 ? (
				<div className='py-12 text-center'>
					<p className='text-muted-foreground text-sm'>
						No tasks scheduled for this day
					</p>
				</div>
			) : (
				<div className='space-y-3'>
					{sortedTasks.map(task => (
						<ScheduleTaskCard
							key={task.id}
							task={task}
						/>
					))}
				</div>
			)}
		</div>
	)
}
