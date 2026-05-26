import { SubTaskCreateModal } from '@/app/dashboard/last-tasks/create-subtask/SubTaskCreateModal'
import { DashboardPages } from '@/config/dashboard-pages'
import type { ITask } from '@/types/task.types'
import { ICON_MAP } from '@/utils/icon-map'
import cn from 'clsx'
import { format, isToday } from 'date-fns'
import {
	Edit2,
	Image as LucideImage,
	Link as LucideLink,
	MessageSquareMore
} from 'lucide-react'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo } from 'react'
import { ProgressBar } from '../ProgressBar'

interface Props {
	task: ITask
	isColor?: boolean
	isMinimal?: boolean
}

export const Task = observer(({ task, isColor, isMinimal }: Props) => {
	const completedCount = task.subTasks.filter(st => st.isCompleted).length
	const totalCount = task.subTasks.length
	const progress = Math.round((completedCount / totalCount) * 100)
	const Icon = ICON_MAP[task.icon]

	const dueDate = useMemo(
		() =>
			isToday(task.dueDate.date)
				? 'Today'
				: Math.ceil((+task.dueDate.date - Date.now()) / (1000 * 60 * 60 * 24)) +
					' days',
		[task.dueDate.date]
	)

	return (
		<div
			className={cn(
				'bg-card rounded-xl p-3.5',
				isColor && task.color,
				isColor && 'text-white'
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
							isColor && 'text-primary bg-white'
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
								{isMinimal ? (
									<>
										{format(task.dueDate.startTime!, 'ha')} -{' '}
										{format(task.dueDate.endTime!, 'ha')}
									</>
								) : (
									<>Due: {dueDate}</>
								)}
							</span>
						</div>
					</div>
				</div>

				<div className='flex items-center -space-x-3'>
					{task.users.map(user => (
						<div key={user.id}>
							<Image
								src={user.avatarPath || ''}
								alt={user.name}
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
							{task.comments.length}
						</span>
						<span className='flex items-center gap-1 text-sm'>
							<LucideImage
								size={16}
								className={isColor ? 'opacity-80' : 'opacity-40'}
							/>{' '}
							{task.resources.length}
						</span>
						<span className='flex items-center gap-1 text-sm'>
							<LucideLink
								size={16}
								className={isColor ? 'opacity-80' : 'opacity-40'}
							/>{' '}
							{task.links.length}
						</span>
					</div>

					<div className='flex items-center gap-2'>
						{/* TODO: Add animate icon */}
						<SubTaskCreateModal taskId={task.id} />

						<Link
							href={DashboardPages.TASK_EDIT(task.id)}
							className='border-primary text-primary hover:bg-primary/10 rounded-full border bg-white p-2 transition-colors'
						>
							<Edit2 size={18} />
						</Link>
					</div>
				</div>
			)}
		</div>
	)
})
