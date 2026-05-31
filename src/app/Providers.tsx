'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import dynamic from 'next/dynamic'
import type { PropsWithChildren } from 'react'
import { Toaster } from 'sonner'

const DynamicThemeToggle = dynamic(
	() => import('./ThemeToggle').then(mod => mod.ThemeToggle),
	{
		ssr: false
	}
)

const queryClient = new QueryClient()

export function Providers({ children }: PropsWithChildren<unknown>) {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider
				attribute='class'
				defaultTheme='system'
				enableSystem
			>
				{children}

				<Toaster />

				<DynamicThemeToggle />
			</ThemeProvider>
		</QueryClientProvider>
	)
}
