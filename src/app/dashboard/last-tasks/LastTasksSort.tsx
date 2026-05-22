import type { TTaskSortBy } from '@/types/task.types'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'

interface Props {
	sortByDueDate: TTaskSortBy
	setSortByDueDate: (sort: TTaskSortBy) => void
}

const sortOptions: Array<TTaskSortBy> = ['asc', 'desc']

export function LastTasksSort({ sortByDueDate, setSortByDueDate }: Props) {
	return (
		<div>
			<Select
				value={sortByDueDate}
				onValueChange={setSortByDueDate}
			>
				<SelectTrigger>
					<SelectValue placeholder='Sort by due date' />
				</SelectTrigger>
				<SelectContent>
					{sortOptions.map(option => (
						<SelectItem
							key={option}
							value={option}
						>
							{option === 'asc' ? 'Ascending' : 'Descending'}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	)
}
