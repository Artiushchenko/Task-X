import { Sidebar } from '@/components/layout/sidebar/Sidebar'
import { getServerProfile } from '@/services/profile/profile-server.service'
import { getServerAuth } from '@/utils/supabase/get-server-auth'
import type { ReactNode } from 'react'

interface Props {
	children: ReactNode
	modals: ReactNode
}

export default async function DashboardLayout({ children, modals }: Props) {
	await getServerAuth(true)

	const data = await getServerProfile()

	return (
		<div className='grid min-h-screen grid-cols-[230px_1fr]'>
			<Sidebar data={data} />

			<main>{children}</main>

			{modals}
		</div>
	)
}
