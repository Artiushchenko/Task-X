'use client'

import { AnimateIcon } from '@/components/animate-ui/icons/icon'
import { Search } from '@/components/animate-ui/icons/search'

interface Props {
	placeholder?: string
	onChange: (value: string) => void
	value: string
}

export function SearchField({
	placeholder = 'Search something...',
	onChange,
	value
}: Props) {
	return (
		<AnimateIcon animateOnHover>
			<div className='flex w-full max-w-sm items-center rounded-full bg-white px-4 py-2 shadow-sm dark:bg-white/10'>
				<Search
					size={20}
					className='mr-2 text-neutral-500'
				/>

				<input
					type='search'
					placeholder={placeholder}
					aria-label={placeholder}
					value={value}
					onChange={e => onChange(e.target.value)}
					className='w-full bg-transparent text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none dark:text-white'
				/>
			</div>
		</AnimateIcon>
	)
}
