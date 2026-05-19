import type { IProjectStatistics } from '../project-statistics/project-statistics.types'

export const PROJECT_STATISTICS_DATA: IProjectStatistics[] = [
	{
		id: 1,
		number: 92,
		label: 'Active Projects',
		bgColor: 'bg-violet-300',
		icon: '/images/icons/project-statistics/active-projects.svg'
	},
	{
		id: 2,
		number: 35,
		label: 'On Going Projects',
		bgColor: 'bg-yellow-300',
		icon: '/images/icons/project-statistics/ongoing-projects.svg'
	},
	{
		id: 3,
		number: 1149,
		label: 'Working Hours',
		bgColor: 'bg-pink-300',
		icon: '/images/icons/project-statistics/working-hours.svg'
	}
]
