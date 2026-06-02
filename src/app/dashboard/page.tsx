import { getServerProfile } from '@/services/profile/profile-server.service'
import {
	getServerTasks,
	getServerTodayTasks
} from '@/services/tasks/task-server.service'
import type { Metadata } from 'next'
import { Dashboard } from './Dashboard'

export const metadata: Metadata = {
	title: 'Dashboard'
}

export default async function Page() {
	const [tasks, todayTasks] = await Promise.all([
		getServerTasks(),
		getServerTodayTasks()
	])

	const data = await getServerProfile()

	return (
		<Dashboard
			tasks={tasks.data || []}
			todayTasks={todayTasks.data || []}
			userId={data.id}
		/>
	)
}
