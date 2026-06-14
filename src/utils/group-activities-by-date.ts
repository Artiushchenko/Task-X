import type { IActivityGroup, IActivityItem } from '@/types/activity.types'
import { format, isToday, isYesterday } from 'date-fns'

export function groupActivitiesByDate(
	activities: IActivityItem[]
): IActivityGroup[] {
	const sortedActivities = activities.sort(
		(a, b) =>
			new Date(b.createdAt || '').getTime() -
			new Date(a.createdAt || '').getTime()
	)

	const groups = new Map<string, IActivityItem[]>()

	for (const activity of sortedActivities) {
		const dateKey = format(new Date(activity.createdAt || ''), 'yyyy-MM-dd')

		if (!groups.has(dateKey)) {
			groups.set(dateKey, [])
		}

		groups.get(dateKey)?.push(activity)
	}

	return Array.from(groups.entries()).map(([dateKey, items]) => {
		const date = new Date(dateKey)
		let label = format(date, 'MMM d, yyyy')

		if (isToday(date)) {
			label = 'Today'
		}

		if (isYesterday(date)) {
			label = 'Yesterday'
		}

		return {
			label,
			activities: items
		}
	})
}
