import type { Metadata } from 'next'

import { Heading } from '@/components/ui/Heading'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { getServerProjects } from '@/services/projects/project-server.service'
import { ProjectList } from './ProjectList'

export const metadata: Metadata = {
	title: 'Projects',
	...NO_INDEX_PAGE
}

export default async function Page() {
	const { data: projects, error } = await getServerProjects()

	if (error || !projects) {
		return (
			// TODO: Refactor
			<div className='flex h-screen items-center justify-center p-5'>
				<p className='text-muted-foreground'>Failed to load projects</p>
			</div>
		)
	}

	return (
		<div className='h-screen overflow-y-auto p-5'>
			<div className='mb-6'>
				<Heading>Projects</Heading>

				<p className='text-muted-foreground mt-1 text-sm'>
					Manage all your projects
				</p>
			</div>

			<ProjectList projects={projects} />
		</div>
	)
}
