import type { Metadata } from 'next'

import { PageHeader } from '@/components/ui/PageHeader'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { getServerProjects } from '@/services/projects/project-server.service'
import { getServerTasks } from '@/services/tasks/task-server.service'
import { getServerUserRole } from '@/utils/supabase/get-server-user-role'
import { Tasks } from './Tasks'

export const metadata: Metadata = {
	title: 'Tasks',
	...NO_INDEX_PAGE
}

export default async function Page() {
	const [tasks, projects, userRole] = await Promise.all([
		getServerTasks(),
		getServerProjects(),
		getServerUserRole()
	])

	return (
		<div className='h-screen overflow-y-auto p-5'>
			<PageHeader
				title='Tasks'
				description='Track and manage all your tasks'
			/>

			<Tasks
				userRole={userRole}
				tasks={tasks.data || []}
				projects={projects.data || []}
			/>
		</div>
	)
}
