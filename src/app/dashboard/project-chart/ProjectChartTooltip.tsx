interface Props {
	active?: boolean
	payload?: Array<{
		value: number
	}>
}

export function ProjectChartTooltip({ active, payload }: Props) {
	if (!active || !payload || payload.length === 0) {
		return null
	}

	return (
		<div className='bg-primary text-white py-1.5 px-2.5 rounded-2xl text-sm font-medium shadow'>
			{payload[0].value} Projects
		</div>
	)
}
