import type { TTask } from '@/types/task.types'
import { parseTime } from '@/utils/parse-time'

export type TimelineTaskWithRow = TTask & {
	row: number
}

const getTaskStart = (task: TTask) => {
	if (task.start_time && task.due_date) {
		return parseTime(task.due_date, task.start_time)
	}

	return new Date(9999, 0, 1)
}

export function assignTaskRows(tasks: TTask[]): TimelineTaskWithRow[] {
	const rows: TTask[][] = []

	const sortedTasks = [...tasks].sort((a, b) => {
		return getTaskStart(a).getTime() - getTaskStart(b).getTime()
	})

	return sortedTasks.map(task => {
		const start = getTaskStart(task)

		let rowIndex = 0

		while (true) {
			const row = rows[rowIndex]

			if (!row) {
				rows[rowIndex] = [task]
				break
			}

			const lastTask = row[row.length - 1]
			const lastEnd =
				lastTask.start_time && lastTask.end_time
					? parseTime(lastTask.due_date, lastTask.end_time)
					: new Date(0)

			const isFree = start >= lastEnd

			if (isFree) {
				row.push(task)
				break
			}

			rowIndex++
		}

		return {
			...task,
			row: rowIndex
		}
	})
}
