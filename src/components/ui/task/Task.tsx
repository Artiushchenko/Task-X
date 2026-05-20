import type { ITask } from '@/types/task.types'
import {
	Edit2,
	Link,
	Image as LucideImage,
	MessageSquareMore,
	Plus
} from 'lucide-react'
import Image from 'next/image'

interface Props {
	task: ITask
}

export function Task({ task }: Props) {
	const completedCount = task.subTasks.filter(st => st.isCompleted).length
	const totalCount = task.subTasks.length
	const progress = Math.round((completedCount / totalCount) * 100)

	return (
		<div>
			<div className='flex items-center gap-2 mb-2'>
				<div className='p-1.5 rounded-full bg-primary/30 flex items-center justify-center'>
					<task.icon />
				</div>

				<span>{task.title}</span>

				<div className='flex items-center -space-x-1'>
					{task.users.map(user => (
						<div key={user.id}>
							<Image
								src={user.avatarPath || ''}
								alt={user.name}
								width={24}
								height={24}
							/>
						</div>
					))}
				</div>
			</div>

			<div>
				<span>
					Due: {Math.ceil((+task.dueDate - Date.now()) / (1000 * 60 * 60 * 24))}
					{''} days
				</span>
			</div>

			<div>
				<span>{progress}%</span>
			</div>

			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-2'>
					<span className='flex items-center gap-1'>
						<MessageSquareMore /> {task.comments.length}
					</span>
					<span className='flex items-center gap-1'>
						<LucideImage /> {task.resources.length}
					</span>
					<span className='flex items-center gap-1'>
						<Link /> {task.links.length}
					</span>
				</div>

				<div className='flex items-center gap-2'>
					<button>
						<Plus />
					</button>
					<button>
						<Edit2 />
					</button>
				</div>
			</div>
		</div>
	)
}
