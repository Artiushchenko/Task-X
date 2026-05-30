'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
	const { setTheme, theme } = useTheme()

	return (
		<div className='fixed top-3 right-7 z-50 mt-3.5'>
			<button
				onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
				className='rounded-full bg-neutral-200 p-2 text-neutral-800 transition-colors hover:bg-neutral-300 dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600'
			>
				{theme === 'dark' ? <Sun /> : <Moon />}
			</button>
		</div>
	)
}
