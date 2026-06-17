import type { TTaskSortBy } from '@/types/task.types'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'

const sortOptions: Array<TTaskSortBy> = ['asc', 'desc']

interface Props {
	sort: TTaskSortBy
	setSort: (sort: TTaskSortBy) => void
}

export const TasksSort = ({ sort, setSort }: Props) => {
	return (
		<div>
			<Select
				defaultValue={sort}
				onValueChange={(value: TTaskSortBy) => setSort(value)}
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
