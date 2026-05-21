import type { ITask } from '@/types/task.types'
import {
	Edit2,
	Link,
	Image as LucideImage,
	MessageSquareMore,
	Plus
} from 'lucide-react'
import Image from 'next/image'
import { ProgressBar } from '../ProgressBar'

interface Props {
	task: ITask
}

export function Task({ task }: Props) {
	const completedCount = task.subTasks.filter(st => st.isCompleted).length
	const totalCount = task.subTasks.length
	const progress = Math.round((completedCount / totalCount) * 100)

	return (
		<div className='bg-card rounded-xl p-3.5'>
			<div className='mb-3 flex items-start justify-between'>
				<div className='flex items-start gap-3'>
					<div className='bg-primary/10 text-primary flex items-center justify-center rounded-full p-1.5'>
						<task.icon />
					</div>

					<div className='w-32'>
						<div className='leading-tight font-medium wrap-normal opacity-90'>
							{task.title}
						</div>

						<div>
							<span className='text-sm opacity-50'>
								Due:{' '}
								{Math.ceil(
									(+task.dueDate - Date.now()) / (1000 * 60 * 60 * 24)
								)}
								{''} days
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

			<div className='mb-4'>
				<ProgressBar progress={progress} />
			</div>

			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-4'>
					<span className='flex items-center gap-1 text-sm'>
						<MessageSquareMore
							size={16}
							className='opacity-40'
						/>{' '}
						{task.comments.length}
					</span>
					<span className='flex items-center gap-1 text-sm'>
						<LucideImage
							size={16}
							className='opacity-40'
						/>{' '}
						{task.resources.length}
					</span>
					<span className='flex items-center gap-1 text-sm'>
						<Link
							size={16}
							className='opacity-40'
						/>{' '}
						{task.links.length}
					</span>
				</div>

				<div className='flex items-center gap-2'>
					{/* TODO: Add animate icon */}
					<button className='bg-primary hover:bg-primary/90 rounded-full p-2 text-white transition-colors'>
						<Plus size={18} />
					</button>
					<button className='border-primary text-primary hover:bg-primary/10 rounded-full border bg-white p-2 transition-colors'>
						<Edit2 size={18} />
					</button>
				</div>
			</div>
		</div>
	)
}
