import { ACTIVITY_CONFIG } from '@/config/activity'
import type { IActivityItem } from '@/types/activity.types'
import { formatDistanceToNow } from 'date-fns'
import { useMemo } from 'react'

interface Props {
	activity: IActivityItem
}

export function ActivityItem({ activity }: Props) {
	const data = useMemo(() => {
		const config = ACTIVITY_CONFIG[activity.type]
		const Icon = config.icon
		const text = config.getTitle(activity.title)
		const timeAgo = activity.createdAt
			? formatDistanceToNow(new Date(activity.createdAt), {
					addSuffix: true
				})
			: ''

		return {
			Icon,
			text,
			timeAgo,
			classNameColor: config.classNameColor
		}
	}, [activity])

	return (
		<div className='flex items-start gap-3 rounded-lg border p-4'>
			<div
				className={`flex size-10 items-center justify-center rounded-lg ${data.classNameColor}`}
			>
				<data.Icon className='size-5' />
			</div>

			<div className='flex-1'>
				<p className='font-medium'>{data.text}</p>

				<p className='text-muted-foreground text-sm'>{data.timeAgo}</p>
			</div>
		</div>
	)
}
