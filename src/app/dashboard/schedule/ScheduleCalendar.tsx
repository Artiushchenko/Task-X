import { Calendar } from '@/components/ui/calendar'
import { scheduleService } from '@/services/schedule/schedule.service'
import type { ITaskByDate } from '@/types/schedule.types'

interface Props {
	tasksByDate: ITaskByDate
	onDateSelect: (date: Date) => void
	selectedDate: Date
}

export function ScheduleCalendar({
	tasksByDate,
	onDateSelect,
	selectedDate
}: Props) {
	return (
		<div className='bg-card rounded-2xl p-5'>
			<Calendar
				mode='single'
				selected={selectedDate}
				onSelect={date => date && onDateSelect(date)}
				className='rounded-md [--cell-size:--spacing(12)]'
				modifiers={{
					hasTask: date => scheduleService.hasTasksOnDate(date, tasksByDate)
				}}
				modifiersClassNames={{
					hasTask:
						'relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-1 after:rounded-full after:bg-primary'
				}}
			/>
		</div>
	)
}
