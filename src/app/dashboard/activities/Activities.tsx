'use client'

import { Heading } from '@/components/ui/Heading'
import type {
	IActivityItem,
	TServerUserEntitiesResponse
} from '@/types/activity.types'
import { groupActivitiesByDate } from '@/utils/group-activities-by-date'
import { useMemo } from 'react'
import { ActivityMapper } from './activity-mapper'
import { ActivityItem } from './ActivityItem'

interface Props {
	data: TServerUserEntitiesResponse
}

export function Activities({ data }: Props) {
	const activities = useMemo(() => {
		const items: IActivityItem[] = []

		for (const project of data.projects) {
			items.push(ActivityMapper.fromProject(project))
		}

		for (const task of data.tasks) {
			items.push(ActivityMapper.fromTask(task, 'TASK_CREATED'))

			if (ActivityMapper.isTaskCompleted(task)) {
				items.push(ActivityMapper.fromTask(task, 'TASK_COMPLETED'))
			}
		}

		return items
	}, [data])

	const groups = useMemo(() => groupActivitiesByDate(activities), [activities])

	return (
		<div className='overflow-y-auto p-5'>
			<div className='mb-6'>
				<Heading>Activities</Heading>

				<p className='text-muted-foreground mt-1 text-sm'>
					Recent activities will be displayed here
				</p>
			</div>

			{groups.length === 0 ? (
				<div className='flex h-64 items-center justify-center'>
					<p className='text-muted-foreground'>No activity yet</p>
				</div>
			) : (
				<div className='space-y-6'>
					{groups.map((group, i) => (
						<div key={i}>
							<h3 className='text-muted-foreground mb-3 text-sm font-semibold'>
								{group.label}
							</h3>

							<div className='space-y-3'>
								{group.activities.map(item => (
									<ActivityItem
										key={item.id}
										activity={item}
									/>
								))}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}
