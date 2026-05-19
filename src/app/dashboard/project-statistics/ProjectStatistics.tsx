import { PROJECT_STATISTICS_DATA } from '../data/project-statistics.data'
import { ProjectStatisticsCard } from './ProjectStatisticsCard'

export function ProjectStatistics() {
	return (
		<div className='space-y-4'>
			{PROJECT_STATISTICS_DATA.map(projectStatistics => (
				<ProjectStatisticsCard
					key={projectStatistics.id}
					projectStatistics={projectStatistics}
				/>
			))}
		</div>
	)
}
