import type { TGetProjectsStatsResponse } from '@/types/statistics.types'
import { formatMinutes } from '@/utils/format-minutes'
import cn from 'clsx'
import Image from 'next/image'

interface Props {
	projectStatistics: TGetProjectsStatsResponse[0]
	isLast: boolean
}

export function ProjectStatisticsCard({ projectStatistics, isLast }: Props) {
	return (
		<div
			className={cn(
				projectStatistics.bg_color,
				'relative overflow-hidden rounded-2xl p-5'
			)}
		>
			<div className='relative z-10 flex items-center justify-between'>
				<div className='flex flex-col'>
					<span className='mb-1 text-4xl font-semibold'>
						{isLast
							? formatMinutes(projectStatistics.value)
							: projectStatistics.value}
					</span>
					<span className='text-sm'>{projectStatistics.label}</span>
				</div>

				<div className='ml-4 shrink-0'>
					<Image
						src={projectStatistics.icon || ''}
						alt={projectStatistics.label}
						width={80}
						height={80}
					/>
				</div>
			</div>
		</div>
	)
}
