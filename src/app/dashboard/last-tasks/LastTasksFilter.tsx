import type { TTaskStatus } from '@/types/task.types'

import cn from 'clsx'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

const statuses: Array<TTaskStatus | 'all'> = [
	'all',
	'not-started',
	'in-progress',
	'completed'
]

interface Props {
	status: TTaskStatus | undefined
	setStatus: (status: TTaskStatus | undefined) => void
}

export const LastTasksFilter = ({ status, setStatus }: Props) => {
	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant='outline'
						className='capitalize'
					>
						{status?.replace('-', ' ') || 'All'}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					{statuses.map(s => (
						<DropdownMenuItem
							key={s}
							onSelect={() => setStatus(s === 'all' ? undefined : s)}
							className={cn(
								status === s ? 'font-bold' : '',
								'cursor-pointer capitalize'
							)}
						>
							{s.replace('-', ' ')}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
