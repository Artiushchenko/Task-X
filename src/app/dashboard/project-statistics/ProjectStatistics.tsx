import type { TGetProjectsStatsResponse } from '@/types/statistics.types'
import { ProjectStatisticsCard } from './ProjectStatisticsCard'

interface Props {
	projectsStats: TGetProjectsStatsResponse
}

export function ProjectStatistics({ projectsStats }: Props) {
	return (
		<div className='space-y-4'>
			{projectsStats.map((projectStatistics, index) => (
				<ProjectStatisticsCard
					key={projectStatistics.id}
					projectStatistics={projectStatistics}
					isLast={index === projectsStats.length - 1}
				/>
			))}
		</div>
	)
}
