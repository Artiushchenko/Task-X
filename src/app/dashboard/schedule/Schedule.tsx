'use client'

import { PageHeader } from '@/components/ui/PageHeader'
import { scheduleService } from '@/services/schedule/schedule.service'
import type { TScheduleTask } from '@/types/schedule.types'
import { useMemo, useState } from 'react'
import { ScheduleCalendar } from './ScheduleCalendar'
import { ScheduleTaskList } from './ScheduleTaskList'

interface Props {
	tasks: TScheduleTask[]
}

export function Schedule({ tasks }: Props) {
	const [selectedDate, setSelectedDate] = useState<Date>(
		scheduleService.getStartOfDay()
	)

	const { tasksByDate, tasksForSelectedDate } = useMemo(() => {
		const tasksByDate = scheduleService.groupTasksByDate(tasks)
		const tasksForSelectedDate = scheduleService.getTasksForDate(
			selectedDate,
			tasksByDate
		)

		return {
			tasksByDate,
			tasksForSelectedDate
		}
	}, [tasks, selectedDate])

	return (
		<div className='h-screen overflow-y-auto p-5'>
			<PageHeader
				title='Schedule'
				description='View and manage your tasks by date'
			/>

			<div className='grid grid-cols-[400px_1fr] gap-4'>
				<ScheduleCalendar
					tasksByDate={tasksByDate}
					onDateSelect={setSelectedDate}
					selectedDate={selectedDate}
				/>

				<ScheduleTaskList
					tasks={tasksForSelectedDate}
					selectedDate={selectedDate}
				/>
			</div>
		</div>
	)
}
