interface ITimeRange {
	label: string
	value: 'yearly' | 'monthly'
}

interface IChartDataPoint {
	period: string
	value: number
}
