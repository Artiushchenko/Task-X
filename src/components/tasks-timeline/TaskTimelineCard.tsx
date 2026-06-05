import { TIMELINE_CONFIG } from '@/config/timeline'
import type { TTask } from '@/types/task.types'
import { getTaskCardPercents } from '@/utils/timeline/task-card-percent'
import { memo, useMemo } from 'react'
import { Task } from '../ui/task/Task'

interface Props {
	task: TTask & {
		row: number
	}
	variant?: 'timeline' | 'floating'
}

function TaskTimelineCard({ task, variant = 'timeline' }: Props) {
	const ROW_HEIGHT = TIMELINE_CONFIG.TASK_HEIGHT + TIMELINE_CONFIG.ROW_GAP

	const percents = useMemo(
		() => (variant === 'timeline' ? getTaskCardPercents(task) : null),
		[task, variant]
	)

	if (variant === 'floating') {
		return (
			<Task
				task={task}
				isColor
				isMinimal
			/>
		)
	}

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
