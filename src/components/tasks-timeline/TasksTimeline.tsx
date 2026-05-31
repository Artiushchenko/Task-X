import type { TTask } from '@/types/task.types'
import { parseTime } from '@/utils/parse-time'
import { getHours, getMinutes } from 'date-fns'
import Image from 'next/image'
import { Task } from '../ui/task/Task'

const HOURS = Array.from({ length: 9 }, (_, i) => i + 9)

interface Props {
	todayTasks: TTask[]
}

export const TasksTimeline = ({ todayTasks }: Props) => {
	const users = [
		...new Map(
			todayTasks
				.flatMap(task => task.task_participants)
				.filter(u => Boolean(u.profiles))
				.map(user => [user.profiles.id, user.profiles])
		).values()
	]

	return (
		<div className='bg-card rounded-xl p-5'>
			<div className='mb-4 flex items-center justify-between'>
				<h2 className='text-xl font-medium'>Today Tasks</h2>

				<div className='flex items-center -space-x-3'>
					{users.map(user => (
						<div key={user.id}>
							<Image
								src={user.avatar_path || ''}
								alt={user.name || ''}
								width={40}
								height={40}
								className='rounded-full border border-white dark:border-neutral-800'
							/>
						</div>
					))}
				</div>
			</div>

			<div className='w-full overflow-x-auto p-3'>
				<div className='grid grid-cols-9'>
					{HOURS.map(hour => (
						<div
							key={hour}
							className='text-left text-sm font-medium opacity-50'
						>
							{hour > 12 ? `${hour - 12} pm` : `${hour} am`}
						</div>
					))}
				</div>

				{/* TODO: Active vertical line by current time */}

				<div className='relative h-72'>
					{todayTasks.map(task => {
						if (!task.start_time || !task.end_time) {
							return null
						}

						const formattedStartTime = parseTime(task.due_date, task.start_time)
						const formattedEndTime = parseTime(task.due_date, task.end_time)

						// TODO: Move this logic to the store

						const start = getHours(formattedStartTime)
						const end = getHours(formattedEndTime)

						const startMinutes = getMinutes(formattedStartTime)
						const endMinutes = getMinutes(formattedEndTime)

						const startPercent =
							(((start - 9) * 60 + startMinutes) / ((17 - 9) * 60)) * 100
						const endPercent =
							(((end - 9) * 60 + endMinutes) / ((17 - 9) * 60)) * 100
						const widthPercent = endPercent - startPercent

						return (
							<div
								key={task.id}
								className='border-primary absolute top-8'
								style={{
									left: `${startPercent}%`,
									width: `${widthPercent}%`
								}}
							>
								<Task
									task={task}
									isColor
									isMinimal
								/>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
