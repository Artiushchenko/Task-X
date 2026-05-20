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
		<div className='flex items-center justify-between mb-6'>
			<h2 className='text-xl font-medium'>Projects Statistic</h2>

			<div
				ref={dropdownRef}
				className='relative'
			>
				<button
					onClick={() => setIsDropdownOpen(!isDropdownOpen)}
					className='flex items-center gap-2 px-3 py-1.5 text-sm rounded-2xl border border-neutral-200'
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
					<div className='absolute right-0 mt-2 w-32 rounded-2xl border border-neutral-200 bg-white py-1 z-10'>
						{timeRanges.map(range => (
							<button
								key={range.value}
								onClick={() => handleRangeChange(range)}
								className='w-full px-3 py-2 text-sm text-left transition-colors hover:text-primary'
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
