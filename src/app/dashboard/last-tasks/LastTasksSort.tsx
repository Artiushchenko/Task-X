import type { TTaskSortBy } from '@/types/task.types'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { taskStore } from '@/stores/task.store'
import { observer } from 'mobx-react-lite'

const sortOptions: Array<TTaskSortBy> = ['asc', 'desc']

export const LastTasksSort = observer(() => {
	return (
		<div>
			<Select
				defaultValue={taskStore.sortByDueDate}
				onValueChange={(value: TTaskSortBy) =>
					taskStore.setSortByDueDate(value)
				}
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
})
