'use client'

import { Search } from 'lucide-react'

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
		<div className='flex items-center w-full max-w-sm px-4 py-2 bg-white rounded-full shadow-sm dark:bg-white/10'>
			<Search
				size={20}
				className='text-neutral-500 mr-2'
			/>

			<input
				type='search'
				placeholder={placeholder}
				value={value}
				onChange={e => onChange(e.target.value)}
				className='w-full bg-transparent focus:outline-none text-sm placeholder:text-neutral-400 text-neutral-800 dark:text-white'
			/>
		</div>
	)
}
