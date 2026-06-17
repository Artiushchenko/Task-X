'use client'

import { SubTaskCreateModal } from '@/app/dashboard/tasks/create-subtask/SubTaskCreateModal'
import { Brush } from '@/components/animate-ui/icons/brush'
import { AnimateIcon } from '@/components/animate-ui/icons/icon'
import PermissionGuard from '@/components/guards/PermissionGuard'
import { DashboardPages } from '@/config/dashboard-pages'
import { useTaskDelete } from '@/hooks/task/useTaskDelete'
import type { TRole } from '@/types/role.types'
import type { TTask } from '@/types/task.types'
import { cn } from '@/utils'
import { ICON_MAP } from '@/utils/icon-map'
import { parseTime } from '@/utils/parse-time'
import { format, isToday } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo } from 'react'
import { ConfirmDialog } from '../ConfirmDialog'
import { ProgressBar } from '../ProgressBar'
import { ExportTaskDialog } from './ExportTaskDialog'

interface Props {
	task: TTask
	userRole?: TRole | null
	isColor?: boolean
	isMinimal?: boolean
}

export const Task = ({ task, userRole, isColor, isMinimal }: Props) => {
	const { isDeleting, deleteTask } = useTaskDelete()

	const completedCount =
		task?.subtasks?.filter(st => st.is_completed).length || 0

	const totalCount = task?.subtasks?.length || 0

	const progress =
		totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100)

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

	/* Participants logic */
	const participants = task.task_participants.filter(u => Boolean(u.profiles))

	const visibleParticipants = participants.slice(0, 3)
	const hiddenCount = participants.length - visibleParticipants.length

	return (
		<div
			data-testid='task-card'
			data-task-id={task.id}
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

				{/* PARTICIPANTS */}
				<div className='flex items-center -space-x-3'>
					{visibleParticipants.map(({ profiles }) => (
						<Image
							key={profiles.id}
							src={profiles?.avatar_path || ''}
							alt={profiles?.name || 'Task participant'}
							width={36}
							height={36}
							className='h-9! shrink-0 rounded-full border border-white object-cover dark:border-neutral-800'
							draggable={false}
							unoptimized
						/>
					))}

					{hiddenCount > 0 && (
						<div
							className='bg-muted text-muted-foreground flex h-9 w-9 items-center justify-center rounded-full border border-neutral-500 text-xs font-medium transition-colors dark:border-neutral-600'
							title={`${hiddenCount} more participant${
								hiddenCount > 1 ? 's' : ''
							}`}
						>
							+{hiddenCount}
						</div>
					)}
				</div>
			</div>

			{!isMinimal && (
				<div className='mb-4'>
					<ProgressBar
						progress={progress}
						data-testid='task-progress'
					/>
				</div>
			)}

			{!isMinimal && (
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-3'>
						<SubTaskCreateModal taskId={task.id} />

						<AnimateIcon
							animateOnHover
							asChild
						>
							<Link
								href={DashboardPages.TASK_EDIT(task.id)}
								className='border-primary text-primary hover:bg-primary/10 bg-card rounded-full border p-2 transition-colors'
								aria-label={`Edit task: ${task.title}`}
								data-testid='edit-task-button'
							>
								<Brush size={18} />
							</Link>
						</AnimateIcon>

						<ExportTaskDialog task={task} />
					</div>

					{userRole && (
						<PermissionGuard
							userRole={userRole}
							permission='canDeleteTasks'
						>
							<ConfirmDialog
								title={task.title}
								description='You’re about to permanently delete this task. This action is irreversible'
								onConfirm={() => deleteTask(task.id)}
								isDeleting={isDeleting}
								isTask
							/>
						</PermissionGuard>
					)}
				</div>
			)}
		</div>
	)
}
