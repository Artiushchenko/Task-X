import type { ITasksByDay } from '@/types/insights.types'
import { useMemo } from 'react'
import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts'

interface Props {
	data: ITasksByDay[]
}

export function TasksOvertimeChart({ data }: Props) {
	const formattedData = useMemo(() => {
		return data.map(item => {
			const [year, month, day] = item.date.split('-').map(Number)
			const date = new Date(year, month - 1, day)

			const displayDate = date.toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric'
			})

			return {
				...item,
				displayDate,
				formattedDate: date.toLocaleDateString('en-US', {
					month: 'long',
					day: 'numeric',
					year: 'numeric'
				})
			}
		})
	}, [data])

	return (
		<div className='bg-card rounded-2xl p-5'>
			<h2 className='mb-5 text-xl font-medium'>
				Tasks Creation Activity (Last 90 days)
			</h2>

			<ResponsiveContainer
				width='100%'
				height={300}
			>
				<BarChart
					data={formattedData}
					margin={{ left: -20, right: 10 }}
				>
					<CartesianGrid
						strokeDasharray='3 3'
						vertical={false}
						opacity={0.1}
					/>

					<XAxis
						dataKey='displayDate'
						axisLine={false}
						tickLine={false}
						tick={{ fontSize: 12, fill: '#9ca3af' }}
					/>

					<YAxis
						axisLine={false}
						tickLine={false}
						tick={{ fontSize: 12, fill: '#9ca3af' }}
					/>

					<Tooltip
						content={({ active, payload }) => {
							if (!active || !payload?.length) {
								return null
							}

							const count = payload[0].payload.count
							const formattedDate = payload[0].payload.formattedDate

							return (
								<div className='bg-primary rounded-lg px-3 py-2 text-sm text-white shadow-lg dark:text-neutral-800'>
									<p className='font-semibold'>
										{count} task{count !== 1 ? 's' : ''} created
									</p>

									<p className='text-xs opacity-80'>{formattedDate}</p>
								</div>
							)
						}}
						cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }}
					/>

					<Bar
						dataKey='count'
						fill='#6366f1'
						radius={[8, 8, 0, 0]}
						maxBarSize={60}
					/>
				</BarChart>
			</ResponsiveContainer>
		</div>
	)
}
