import type { IMetricItem } from '@/types/insights.types'
import { MetricCard } from './MetricCard'

interface Props {
	metricItems: IMetricItem[]
}

export function InsightsMetrics({ metricItems }: Props) {
	return (
		<div className='grid grid-cols-5 gap-4'>
			{metricItems.map(item => (
				<MetricCard
					key={item.id}
					item={item}
				/>
			))}
		</div>
	)
}
