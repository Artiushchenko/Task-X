import { SITE_NAME } from '@/constants'
import { cn } from '@/utils'
import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { Providers } from './Providers'

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
	icons: {
		icon: '/images/icons/favicon.svg',
		shortcut: '/images/icons/favicon.svg'
	},
	title: {
		absolute: SITE_NAME,
		template: `${SITE_NAME} | %s`
	},
	description: 'Your interactive workspace for tasks and productivity'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang='en'
			suppressHydrationWarning
			className={cn('font-sans', geist.variable)}
			// TODO: Fix theme error
		>
			<body className={`${geist.variable} antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
