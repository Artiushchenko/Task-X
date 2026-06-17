import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { getServerProjectBySlug } from '@/services/projects/project-server.service'
import { getServerUserRole } from '@/utils/supabase/get-server-user-role'
import { ProjectDetails } from './ProjectDetails'

export const metadata: Metadata = {
	title: 'Project Details',
	...NO_INDEX_PAGE
}

export default async function Page(props: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await props.params

	const [project, userRole] = await Promise.all([
		getServerProjectBySlug(slug),
		getServerUserRole()
	])

	if (!project.data?.length) {
		return <div className='p-5'>Project not found</div>
	}

	return (
		<ProjectDetails
			project={project.data[0]}
			userRole={userRole}
		/>
	)
}
