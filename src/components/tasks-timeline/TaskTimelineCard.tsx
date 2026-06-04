import { TIMELINE_CONFIG } from '@/config/timeline'
import type { TTask } from '@/types/task.types'
import { getTaskCardPercents } from '@/utils/timeline/task-card-percent'
import { memo, useMemo } from 'react'
import { Task } from '../ui/task/Task'

interface Props {
	task: TTask & {
		row: number
	}
}

function TaskTimelineCard({ task }: Props) {
	const ROW_HEIGHT = TIMELINE_CONFIG.TASK_HEIGHT + TIMELINE_CONFIG.ROW_GAP

	const percents = useMemo(() => getTaskCardPercents(task), [task])

	return (
		<div
			key={task.id}
			className='absolute z-10'
			style={{
				left: `${percents?.startPercent}%`,
				width: `${percents?.widthPercent}%`,
				top: `calc(${task.row * ROW_HEIGHT}px + 6px)`
			}}
		>
			<Task
				task={task}
				isColor
				isMinimal
			/>
		</div>
	)
}

export default memo(TaskTimelineCard)
