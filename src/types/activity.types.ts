import type { getServerUserEntities } from '@/services/user/user-activity-server.service'

export type TActivityType =
	| 'PROJECT_CREATED'
	| 'TASK_CREATED'
	| 'TASK_COMPLETED'
	| 'TASK_UPDATED'

export interface IActivityItem {
	id: string
	type: TActivityType
	title: string
	createdAt?: string
}

export interface IActivityGroup {
	label: string
	activities: IActivityItem[]
}

export type TServerUserEntitiesResponse = Awaited<
	ReturnType<typeof getServerUserEntities>
>
