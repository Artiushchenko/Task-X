import type { TTask } from '@/types/task.types'
import { parseTime } from '@/utils/parse-time'

export type TimelineTaskWithRow = TTask & {
	row: number
}

export function assignTaskRows(tasks: TTask[]): TimelineTaskWithRow[] {
	const rows: TTask[][] = []

	const sortedTasks = [...tasks]
		.filter(task => task.start_time && task.end_time)
		.sort((a, b) => {
			const aStart = parseTime(a.due_date, a.start_time!)
			const bStart = parseTime(b.due_date, b.start_time!)

			return aStart.getTime() - bStart.getTime()
		})

	return sortedTasks.map(task => {
		const start = parseTime(task.due_date, task.start_time!)

		let rowIndex = 0

		while (true) {
			const row = rows[rowIndex]

			if (!row) {
				rows[rowIndex] = [task]
				break
			}

			const lastTask = row[row.length - 1]
			const lastEnd = parseTime(lastTask.due_date, lastTask.end_time!)

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
