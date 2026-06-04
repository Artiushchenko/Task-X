import type { TTask } from '@/types/task.types'
import { parseTime } from '@/utils/parse-time'
import { assignTaskRows } from '@/utils/timeline/assign-task-rows'
import Image from 'next/image'
import { Task } from '../ui/task/Task'

import { TIMELINE_CONFIG } from '@/config/timeline'
import { useTimelineHeight } from '@/hooks/useTimelineHeight'
import { getTimelineHours } from '@/utils/timeline/get-hours'
import { timeToPercent } from '@/utils/timeline/time-to-percent'

export const TasksTimeline = ({ todayTasks }: { todayTasks: TTask[] }) => {
	const tasksWithRows = assignTaskRows(todayTasks)

	const HOURS = getTimelineHours()

	const users = [
		...new Map(
			todayTasks
				.flatMap(task => task.task_participants)
				.filter(u => Boolean(u.profiles))
				.map(user => [user.profiles.id, user.profiles])
		).values()
	]

	const maxRow = Math.max(...tasksWithRows.map(t => t.row), 0)
	const timelineHeight = useTimelineHeight(maxRow)

	const ROW_HEIGHT = TIMELINE_CONFIG.TASK_HEIGHT + TIMELINE_CONFIG.ROW_GAP

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

			<div className='w-full overflow-hidden'>
				<div className='relative mb-1 h-10 w-full'>
					{HOURS.map((hour, i) => {
						const raw = (i / (HOURS.length - 1)) * 100
						const left =
							TIMELINE_CONFIG.LEFT_PAD +
							(raw / 100) *
								(100 - TIMELINE_CONFIG.LEFT_PAD - TIMELINE_CONFIG.RIGHT_PAD)

						return (
							<div
								key={hour}
								className='absolute text-sm font-medium whitespace-nowrap opacity-50'
								style={{
									left: `${left}%`,
									transform: 'translateX(-50%)'
								}}
							>
								{hour > 12 ? `${hour - 12} pm` : `${hour} am`}
							</div>
						)
					})}
				</div>

				<div
					className='relative w-full overflow-hidden'
					style={{ height: timelineHeight }}
				>
					<div className='pointer-events-none absolute inset-0'>
						{HOURS.map((_, i) => {
							const raw = (i / (HOURS.length - 1)) * 100
							const left =
								TIMELINE_CONFIG.LEFT_PAD +
								(raw / 100) *
									(100 - TIMELINE_CONFIG.LEFT_PAD - TIMELINE_CONFIG.RIGHT_PAD)

							return (
								<div
									key={i}
									className='bg-primary/30 absolute top-0 bottom-0 w-0.5'
									style={{
										left: `${left}%`
									}}
								/>
							)
						})}
					</div>

					{tasksWithRows.map(task => {
						if (!task.start_time || !task.end_time) {
							return null
						}

						const startTime = parseTime(task.due_date, task.start_time)
						const endTime = parseTime(task.due_date, task.end_time)

						const startPercent = timeToPercent(startTime)
						const endPercent = timeToPercent(endTime)

						const widthPercent = endPercent - startPercent

						return (
							<div
								key={task.id}
								className='absolute z-10'
								style={{
									left: `${startPercent}%`,
									width: `${widthPercent}%`,
									top: `calc(${task.row * ROW_HEIGHT}px + 6px)`
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
