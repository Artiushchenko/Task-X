import { SubTaskCreateModal } from '@/app/dashboard/last-tasks/create-subtask/SubTaskCreateModal'
import { DashboardPages } from '@/config/dashboard-pages'
import type { TTask } from '@/types/task.types'
import { ICON_MAP } from '@/utils/icon-map'
import { parseTime } from '@/utils/parse-time'
import cn from 'clsx'
import { format, isToday } from 'date-fns'
import {
	Edit2,
	Image as LucideImage,
	Link as LucideLink,
	MessageSquareMore
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo } from 'react'
import { ProgressBar } from '../ProgressBar'

interface Props {
	task: TTask
	isColor?: boolean
	isMinimal?: boolean
}

export const Task = ({ task, isColor, isMinimal }: Props) => {
	const completedCount =
		task?.subtasks?.filter(st => st.is_completed).length || 0
	const totalCount = task?.subtasks?.length || 0
	const progress = Math.round((completedCount / totalCount) * 100)
	const Icon = ICON_MAP[task.icon as keyof typeof ICON_MAP]
	const formattedDate = new Date(task.due_date)

	const dueDate = useMemo(
		() =>
			isToday(formattedDate)
				? 'Today'
				: Math.ceil((+formattedDate - Date.now()) / (1000 * 60 * 60 * 24)) +
					' days',
		[task.due_date]
	)

	return (
		<div
			className={cn(
				'bg-card rounded-xl p-3.5',
				isColor && task.color,
				isColor && 'text-foreground'
			)}
		>
			<div
				className={cn(
					'mb-3 flex items-start justify-between',
					isMinimal && 'mb-0 flex-col gap-3'
				)}
			>
				<div className='flex items-start gap-3'>
					<div
						className={cn(
							'bg-primary/10 text-primary flex items-center justify-center rounded-full p-1.5',
							isColor && 'text-primary bg-card'
						)}
					>
						<Icon />
					</div>

					<div className={cn(!isMinimal && 'w-32')}>
						<div className='leading-tight font-medium wrap-normal opacity-90'>
							{task.title}
						</div>

						<div>
							<span
								className={cn('text-sm opacity-50', isColor && 'opacity-75')}
							>
								{isMinimal && task.start_time && task.end_time ? (
									<>
										{format(parseTime(task.due_date, task.start_time), 'ha')} -{' '}
										{format(parseTime(task.due_date, task.end_time), 'ha')}
									</>
								) : (
									<>Due: {dueDate}</>
								)}
							</span>
						</div>
					</div>
				</div>

				<div className='flex items-center -space-x-3'>
					{task.task_participants
						.filter(u => Boolean(u.profiles))
						.map(({ profiles }) => (
							<div key={profiles.id}>
								<Image
									src={profiles?.avatar_path || ''}
									alt={profiles?.name || ''}
									width={36}
									height={36}
									className='rounded-full border border-white dark:border-neutral-800'
								/>
							</div>
						))}
				</div>
			</div>

			{!isMinimal && (
				<div className='mb-4'>
					<ProgressBar progress={progress} />
				</div>
			)}

			{!isMinimal && (
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-4'>
						<span className='flex items-center gap-1 text-sm'>
							<MessageSquareMore
								size={16}
								className={isColor ? 'opacity-80' : 'opacity-40'}
							/>{' '}
							{/* {task.comments.length} */}3
						</span>
						<span className='flex items-center gap-1 text-sm'>
							<LucideImage
								size={16}
								className={isColor ? 'opacity-80' : 'opacity-40'}
							/>{' '}
							{/* {task.resources.length} */}6
						</span>
						<span className='flex items-center gap-1 text-sm'>
							<LucideLink
								size={16}
								className={isColor ? 'opacity-80' : 'opacity-40'}
							/>{' '}
							{/* {task.links.length} */}2
						</span>
					</div>

					<div className='flex items-center gap-2'>
						{/* TODO: Add animate icon */}
						<SubTaskCreateModal taskId={task.id} />

						<Link
							href={DashboardPages.TASK_EDIT(task.id)}
							className='border-primary text-primary hover:bg-primary/10 bg-card rounded-full border p-2 transition-colors'
						>
							<Edit2 size={18} />
						</Link>
					</div>
				</div>
			)}
		</div>
	)
}
