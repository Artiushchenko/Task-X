import { formatMinutes } from '@/utils/format-minutes'
import cn from 'clsx'
import Image from 'next/image'
import type { IProjectStatistics } from './project-statistics.types'

interface Props {
	projectStatistics: IProjectStatistics
}

export function ProjectStatisticsCard({ projectStatistics }: Props) {
	return (
		<div
			className={cn(
				projectStatistics.bgColor,
				'rounded-2xl p-5 relative overflow-hidden'
			)}
		>
			<div className='flex items-center justify-between relative z-10'>
				<div className='flex flex-col'>
					<span className='text-4xl font-semibold mb-1'>
						{projectStatistics.id === 3
							? formatMinutes(projectStatistics.number)
							: projectStatistics.number}
					</span>
					<span className='text-sm'>{projectStatistics.label}</span>
				</div>

				<div className='shrink-0 ml-4'>
					<Image
						src={projectStatistics.icon}
						alt={projectStatistics.label}
						width={80}
						height={80}
					/>
				</div>
			</div>
		</div>
	)
}
