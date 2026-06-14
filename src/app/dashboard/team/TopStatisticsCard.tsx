import type { LucideIcon } from 'lucide-react'

interface Props {
	title: string
	value: number
	icon: LucideIcon
	iconClassName?: string
}

export function TopStatisticsCard({
	title,
	value,
	icon: Icon,
	iconClassName
}: Props) {
	return (
		<div className='bg-card hover:bg-accent/30 rounded-2xl border p-5 transition-all duration-200'>
			<div className='flex items-center justify-between'>
				<div>
					<p className='text-muted-foreground text-sm'>{title}</p>

					<p className='mt-2 text-4xl font-bold tracking-tight'>{value}</p>
				</div>

				<div className='bg-muted flex h-12 w-12 items-center justify-center rounded-xl'>
					<Icon className={`h-6 w-6 ${iconClassName ?? ''}`} />
				</div>
			</div>
		</div>
	)
}
