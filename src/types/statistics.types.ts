import type { getClientProjectsChartData } from '@/services/statistics/chart/projects-chart-client.service'
import type { getServerProjectsChartData } from '@/services/statistics/chart/projects-chart-server.service'
import type { getServerProjectsStats } from '@/services/statistics/projects-stats-server.service'

export type TGetProjectsStatsResponse = NonNullable<
	Awaited<ReturnType<typeof getServerProjectsStats>>['data']
>

export type TGetProjectsChartDataResponse = NonNullable<
	Awaited<ReturnType<typeof getServerProjectsChartData>>['data']
>
export type TClientProjectsChartDataResponse = Awaited<
	ReturnType<typeof getClientProjectsChartData>
>
