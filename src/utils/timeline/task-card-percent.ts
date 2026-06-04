import type { TTask } from '@/types/task.types'
import { parseTime } from '../parse-time'
import { timeToPercent } from './time-to-percent'

export function getTaskCardPercents(task: TTask) {
	if (!task.start_time || !task.end_time) {
		return null
	}

	const startTime = parseTime(task.due_date, task.start_time)
	const endTime = parseTime(task.due_date, task.end_time)

	const startPercent = timeToPercent(startTime)
	const endPercent = timeToPercent(endTime)

	const widthPercent = endPercent - startPercent

	return {
		startPercent,
		widthPercent
	}
}
