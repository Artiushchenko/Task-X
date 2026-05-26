import { useClickOutside } from '@/hooks/useClickOutside'
import { ChevronDown } from 'lucide-react'
import { useRef, useState } from 'react'
import { timeRanges } from '../data/project-chart.data'

interface Props {
	onRangeChange: (range: ITimeRange) => void
	selectedRange: ITimeRange
}

export function ProjectChartHeader({ onRangeChange, selectedRange }: Props) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement | null>(null)

	const handleRangeChange = (range: ITimeRange) => {
		onRangeChange(range)
		setIsDropdownOpen(false)
	}

	useClickOutside(dropdownRef, () => {
		setIsDropdownOpen(false)
	})

	return (
		<div className='mb-6 flex items-center justify-between'>
			<h2 className='text-xl font-medium'>Projects Statistic</h2>

			<div
				ref={dropdownRef}
				className='relative'
			>
				<button
					onClick={() => setIsDropdownOpen(!isDropdownOpen)}
					className='flex items-center gap-2 rounded-2xl border border-neutral-200 px-3 py-1.5 text-sm dark:border-neutral-200/20'
				>
					{selectedRange.label}

					<ChevronDown
						size={16}
						className={`transition-transform duration-300 ${
							isDropdownOpen ? 'rotate-180' : ''
						}`}
					/>
				</button>

				{isDropdownOpen && (
					<div className='bg-card absolute right-0 z-10 mt-2 w-32 rounded-2xl border border-neutral-200 py-1 dark:border-neutral-200/20'>
						{timeRanges.map(range => (
							<button
								key={range.value}
								onClick={() => handleRangeChange(range)}
								className='hover:text-primary w-full px-3 py-2 text-left text-sm transition-colors'
							>
								{range.label}
							</button>
						))}
					</div>
				)}
			</div>
		</div>
	)
}
