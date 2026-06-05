import type {
	getServerProjectBySlug,
	getServerProjects
} from '@/services/projects/project-server.service'

export interface IProject {
	color: string
	name: string
}

export type TProjectWithSlug = NonNullable<
	Awaited<ReturnType<typeof getServerProjectBySlug>>['data']
>[0]
export type TProjectsList = Awaited<
	ReturnType<typeof getServerProjects>
>['data']
