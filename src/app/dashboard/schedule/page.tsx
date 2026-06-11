import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { getServerTasks } from '@/services/tasks/task-server.service'
import type { Metadata } from 'next'
import { Schedule } from './Schedule'

export const metadata: Metadata = {
	title: 'Schedule',
	...NO_INDEX_PAGE
}

export default async function Page() {
	const { data: tasks, error } = await getServerTasks()

	if (error || !tasks) {
		return (
			<div className='flex h-screen items-center justify-center p-5'>
				<p className='text-muted-foreground'>Failed to load schedule</p>
			</div>
		)
	}

	return <Schedule tasks={tasks} />
}
