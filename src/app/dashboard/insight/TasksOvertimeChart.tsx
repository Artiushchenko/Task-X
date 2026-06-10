import type { ITasksByDay } from '@/types/insights.types'
import { useMemo } from 'react'
import {
	Area,
	AreaChart,
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
	const formattedData = useMemo(
		() =>
			data.reverse().map((item, index) => ({
				...item,
				displayDate:
					index % 15 === 0
						? new Date(item.date).toLocaleDateString('en-US', {
								month: 'short',
								day: 'numeric'
							})
						: ''
			})),
		[data]
	)

	return (
		<div className='bg-card rounded-2xl p-5'>
			<h2 className='mb-5 text-xl font-medium'>Tasks Overtime (90 days)</h2>

			<ResponsiveContainer
				width='100%'
				height={300}
			>
				<AreaChart
					data={formattedData}
					margin={{ left: -20, right: 10 }}
				>
					<defs>
						<linearGradient
							id='colorTasks'
							x1='0'
							y1='0'
							x2='0'
							y2='1'
						>
							<stop
								offset='5%'
								stopColor='#6366F1'
								stopOpacity={0.3}
							/>
							<stop
								offset='95%'
								stopColor='#6366F1'
								stopOpacity={0}
							/>
						</linearGradient>
					</defs>

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

							return (
								<div className='bg-primary rounded-lg px-3 py-2 text-sm text-white shadow-lg'>
									<p className='font-semibold'>{payload[0].value} tasks</p>

									<p className='text-xs opacity-80'>
										{new Date(payload[0].payload.date).toLocaleDateString()}
									</p>
								</div>
							)
						}}
						cursor={{
							stroke: '#6366F1',
							strokeWidth: 1,
							strokeDasharray: '5 5'
						}}
					/>

					<Area
						type='monotone'
						dataKey='count'
						stroke='#6366f1'
						strokeWidth={2}
						fill='url(#colorTasks)'
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	)
}
