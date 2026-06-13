import type { getServerInsightsData } from '@/services/insights/insights-server.service'
import type {
	getServerProjectBySlug,
	getServerProjects
} from '@/services/projects/project-server.service'
import type { Database } from '../db.types'

export interface IProject {
	color: string
	name: string
}

export type TProjectWithSlug = NonNullable<
	Awaited<ReturnType<typeof getServerProjectBySlug>>['data']
>[0]

export type TProjectInsight = NonNullable<
	Awaited<ReturnType<typeof getServerInsightsData>>['data']
>[0]

export type TProjectsList = Awaited<
	ReturnType<typeof getServerProjects>
>['data']

export type TProject = NonNullable<TProjectsList>[0]

export type TProjectInsert = Database['public']['Tables']['projects']['Insert']
export type TProjectUpdate = Database['public']['Tables']['projects']['Update']
