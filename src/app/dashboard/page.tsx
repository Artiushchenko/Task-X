import { taskServerGetAll } from '@/services/tasks/task-server.service'
import type { Metadata } from 'next'
import { Dashboard } from './Dashboard'

export const metadata: Metadata = {
	title: 'Dashboard'
}

export default async function Page() {
	const tasks = await taskServerGetAll()

	if (tasks.error) {
		return <div className='text-red-500'>Failed to load tasks</div>
	}

	return <Dashboard tasks={tasks.data} />
}
