import type { Metadata } from 'next'

import { ErrorState } from '@/components/ui/ErrorState'
import { PageHeader } from '@/components/ui/PageHeader'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { getServerProjects } from '@/services/projects/project-server.service'
import { getServerUserRole } from '@/utils/supabase/get-server-user-role'
import { ProjectList } from './ProjectList'

export const metadata: Metadata = {
	title: 'Projects',
	...NO_INDEX_PAGE
}

export default async function Page() {
	const [projectResult, role] = await Promise.all([
		getServerProjects(),
		getServerUserRole()
	])

	const { data: projects, error } = projectResult

	if (error || !projects) {
		return <ErrorState message='Failed to load projects' />
	}

	return (
		<div className='h-screen overflow-y-auto p-5'>
			<PageHeader
				title='Projects'
				description='Manage all your projects'
			/>

			<ProjectList
				projects={projects}
				userRole={role}
			/>
		</div>
	)
}
