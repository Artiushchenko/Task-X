'use client'

import { Moon } from '@/components/animate-ui/icons/moon'
import { Sun } from '@/components/animate-ui/icons/sun'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
	const { setTheme, theme } = useTheme()

	return (
		<div className='fixed top-3 right-7 z-50 mt-3.5'>
			<button
				onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
				className='rounded-full bg-neutral-200 p-2 text-neutral-800 transition-colors hover:bg-neutral-300 dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600'
			>
				{theme === 'dark' ? <Sun animateOnHover /> : <Moon animateOnHover />}
			</button>
		</div>
	)
}
