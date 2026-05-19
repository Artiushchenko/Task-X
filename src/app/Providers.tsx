'use client'

import { ThemeProvider } from 'next-themes'
import dynamic from 'next/dynamic'
import type { PropsWithChildren } from 'react'

const DynamicThemeToggle = dynamic(
	() => import('./ThemeToggle').then(mod => mod.ThemeToggle),
	{
		ssr: false
	}
)

export function Providers({ children }: PropsWithChildren<unknown>) {
	return (
		<ThemeProvider
			attribute='class'
			defaultTheme='system'
			enableSystem
		>
			{children}

			<DynamicThemeToggle />
		</ThemeProvider>
	)
}
