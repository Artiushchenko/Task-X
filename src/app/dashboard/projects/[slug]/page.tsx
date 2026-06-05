import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { getServerProjectBySlug } from '@/services/projects/project-server.service'
import { ProjectDetails } from './ProjectDetails'

export const metadata: Metadata = {
	title: 'Project Details',
	...NO_INDEX_PAGE
}

export default async function Page(props: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await props.params

	const project = await getServerProjectBySlug(slug)

	if (!project.data?.length) {
		return <div className='p-5'>Project not found</div>
	}

	return <ProjectDetails project={project.data[0]} />
}
