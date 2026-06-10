import type { IMetricItem } from '@/types/insights.types'

interface Props {
	item: IMetricItem
}

export function MetricCard({ item }: Props) {
	return (
		<div className='bg-card rounded-2xl border border-white/10 p-5'>
			<div className='flex items-center justify-between'>
				<div>
					<p className='text-muted-foreground text-sm'>{item.label}</p>

					<p className='mt-2 text-4xl font-bold'>{item.value}</p>
				</div>

				<div className={`rounded-xl p-3 ${item.bgColor}`}>
					<item.icon size={22} />
				</div>
			</div>
		</div>
	)
}
