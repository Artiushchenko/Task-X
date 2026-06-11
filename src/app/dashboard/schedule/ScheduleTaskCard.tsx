import { ProgressBar } from '@/components/ui/ProgressBar'
import { DashboardPages } from '@/config/dashboard-pages'
import type { TScheduleTask } from '@/types/schedule.types'
import { ICON_MAP } from '@/utils/icon-map'
import { Clock } from 'lucide-react'
import Link from 'next/link'

interface Props {
	task: TScheduleTask
}

export function ScheduleTaskCard({ task }: Props) {
	const hasTime = task.start_time && task.end_time
	const completedCount = task.subtasks.filter(
		subTask => subTask.is_completed
	).length
	const totalCount = task.subtasks.length
	const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

	const Icon = ICON_MAP[task.icon as keyof typeof ICON_MAP]

	return (
		<Link
			href={DashboardPages.TASK_EDIT(task.id)}
			className='block'
		>
			<div className='group hover:border-primary hover:bg-muted/50 rounded-xl border p-4 transition-all'>
				<div className='mb-2 flex items-start justify-between'>
					<div className='flex items-start gap-3'>
						{task.icon && (
							<span className='text-2xl'>
								<Icon />
							</span>
						)}

						<div>
							<h4 className='group-hover:text-primary font-medium transition-colors'>
								{task.title}
							</h4>

							{task.project && (
								<p className='text-muted-foreground mt-1 text-xs'>
									{task.project.name}
								</p>
							)}
						</div>
					</div>

					{hasTime && (
						<div className='text-muted-foreground flex items-center gap-1 text-xs'>
							<Clock className='size-3' />
							<span>
								{task.start_time} - {task.end_time}
							</span>
						</div>
					)}
				</div>

				{totalCount > 0 && (
					<div className='mt-3'>
						<div className='mb-1 flex items-center justify-between text-xs'>
							<span className='text-muted-foreground'>
								{completedCount}/{totalCount} subtasks
							</span>

							<span className='font-medium'>{Math.round(progress)}%</span>
						</div>

						<ProgressBar progress={progress} />
					</div>
				)}
			</div>
		</Link>
	)
}
