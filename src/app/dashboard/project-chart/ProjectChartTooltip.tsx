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
		<div className='bg-primary rounded-2xl px-2.5 py-1.5 text-sm font-medium text-white shadow'>
			{payload[0].value} Projects
		</div>
	)
}
