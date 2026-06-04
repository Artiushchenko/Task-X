import { SITE_NAME } from '@/constants'
import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { Providers } from './Providers'

const font = Geist({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
	icons: {
		icon: '/images/favicon.svg',
		shortcut: '/images/favicon.svg'
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
		>
			<body className={`${font.variable} antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
