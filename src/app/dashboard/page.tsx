import { getServerProfile } from '@/services/profile/profile-server.service'
import { getServerProjects } from '@/services/projects/project-server.service'
import { getServerProjectsChartData } from '@/services/statistics/chart/projects-chart-server.service'
import { getServerProjectsStats } from '@/services/statistics/projects-stats-server.service'
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
	const [tasks, todayTasks, projects, projectsStats, projectsChartData] =
		await Promise.all([
			getServerTasks(),
			getServerTodayTasks(),
			getServerProjects(),
			getServerProjectsStats(),
			getServerProjectsChartData('yearly')
		])

	const data = await getServerProfile()

	return (
		<Dashboard
			tasks={tasks.data || []}
			todayTasks={todayTasks.data || []}
			userId={data.id}
			projects={projects.data || []}
			projectsStats={projectsStats.data || []}
			projectsChartData={projectsChartData.data || []}
		/>
	)
}
