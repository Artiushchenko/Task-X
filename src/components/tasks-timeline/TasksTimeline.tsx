import type { TTask } from '@/types/task.types'
import { assignTaskRows } from '@/utils/timeline/assign-task-rows'
import Image from 'next/image'

import { useTimelineHeight } from '@/hooks/useTimelineHeight'
import { cn } from '@/utils'
import { getTimelineHours } from '@/utils/timeline/get-hours'
import { getTimelinePoints } from '@/utils/timeline/get-timeline-points'
import TaskTimelineCard from './TaskTimelineCard'

export const TasksTimeline = ({ todayTasks }: { todayTasks: TTask[] }) => {
	const timedTasks = todayTasks.filter(task => task.start_time && task.end_time)
	const floatingTasks = todayTasks.filter(
		task => !task.start_time || !task.end_time
	)

	const tasksWithRows = assignTaskRows(timedTasks)

	const timelinePoints = getTimelinePoints(
		getTimelineHours(),
		new Date().getHours()
	)

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
								className='h-10! shrink-0 rounded-full border border-white object-cover dark:border-neutral-800'
								draggable={false}
								unoptimized
							/>
						</div>
					))}
				</div>
			</div>

			<div className='w-full overflow-hidden'>
				<div className='relative mb-1 h-10 w-full'>
					{timelinePoints.map(point => (
						<div
							key={point.hour}
							className={cn(
								'absolute text-sm whitespace-nowrap transition-all',
								point.isPast && 'opacity-30',
								point.isCurrent && 'font-bold opacity-100',
								!point.isPast && !point.isCurrent && 'opacity-50'
							)}
							style={{
								left: `${point.left}%`,
								transform: 'translateX(-50%)'
							}}
						>
							{point.hour > 12 ? `${point.hour - 12} pm` : `${point.hour} am`}
						</div>
					))}
				</div>

				<div
					className='relative w-full overflow-hidden'
					style={{ height: timelineHeight }}
				>
					<div className='pointer-events-none absolute inset-0'>
						{timelinePoints.map(point => (
							<div
								key={point.hour}
								className={cn(
									'absolute top-0 bottom-0 w-0.5 transition-all',
									point.isPast && 'bg-primary/15',
									point.isCurrent && 'bg-primary w-0.75',
									!point.isPast && !point.isCurrent && 'bg-primary/30'
								)}
								style={{
									left: `${point.left}%`
								}}
							/>
						))}
					</div>

					{tasksWithRows.map(task => (
						<TaskTimelineCard
							key={task.id}
							task={task}
						/>
					))}
				</div>
			</div>

			{floatingTasks.length > 0 && (
				<div className='mt-6 border-t pt-4'>
					<div className='text-muted-foreground mb-2 text-xs uppercase'>
						No scheduled time
					</div>

					<div className='flex flex-wrap gap-4'>
						{floatingTasks.map(task => (
							<TaskTimelineCard
								key={task.id}
								task={task as any}
								variant='floating'
							/>
						))}
					</div>
				</div>
			)}
		</div>
	)
}
