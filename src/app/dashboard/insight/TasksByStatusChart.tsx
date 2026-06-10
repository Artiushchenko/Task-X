import { ProgressBar } from '@/components/ui/ProgressBar'
import type { ITasksByStatus } from '@/types/insights.types'
import { useMemo } from 'react'

interface Props {
	data: ITasksByStatus
}

export function TasksByStatusChart({ data }: Props) {
	const statuses = useMemo(() => {
		const total = data.completed + data.active + data.pending

		const statuses = [
			{
				label: 'Completed',
				value: data.completed,
				color: 'bg-green-500',
				bgColor: 'bg-green-100',
				percentage: total ? Math.round((data.completed / total) * 100) : 0
			},
			{
				label: 'Active',
				value: data.active,
				color: 'bg-blue-500',
				bgColor: 'bg-blue-100',
				percentage: total ? Math.round((data.active / total) * 100) : 0
			},
			{
				label: 'Pending',
				value: data.pending,
				color: 'bg-yellow-500',
				bgColor: 'bg-yellow-100',
				percentage: total ? Math.round((data.pending / total) * 100) : 0
			}
		]

		return statuses
	}, [data])

	return (
		<div className='bg-card rounded-2xl p-5'>
			<h2 className='mb-5 text-xl font-medium'>Tasks by Status</h2>

			<div className='space-y-6'>
				{statuses.map(status => (
					<div key={status.label}>
						<div className='mb-2 flex items-center justify-between'>
							<div className='flex items-center gap-2'>
								<div className={`h-3 w-3 rounded-full ${status.color}`} />
								<span className='text-sm font-medium'>{status.label}</span>
							</div>

							<div className='flex items-center gap-3'>
								<span className='text-muted-foreground text-sm'>
									{status.value} tasks
								</span>

								<span className='text-sm font-bold'>{status.percentage}%</span>
							</div>
						</div>

						<ProgressBar progress={status.percentage} />
					</div>
				))}
			</div>
		</div>
	)
}
