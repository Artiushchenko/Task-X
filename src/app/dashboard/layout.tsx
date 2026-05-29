import { Sidebar } from '@/components/layout/sidebar/Sidebar'
import { getServerAuth } from '@/utils/supabase/get-server-auth'
import type { ReactNode } from 'react'

interface Props {
	children: ReactNode
	modals: ReactNode
}

export default async function DashboardLayout({ children, modals }: Props) {
	await getServerAuth(true)

	return (
		<div className='grid min-h-screen grid-cols-[230px_1fr]'>
			<Sidebar />

			<main className='p-5'>{children}</main>

			{modals}
		</div>
	)
}
