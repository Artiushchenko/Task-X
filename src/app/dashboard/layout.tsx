import { Sidebar } from '@/components/layout/sidebar/Sidebar'
import { getServerProfile } from '@/services/profile/profile-server.service'
import { getServerProjects } from '@/services/projects/project-server.service'
import { getServerAuth } from '@/utils/supabase/get-server-auth'
import type { ReactNode } from 'react'
import { DashboardMain } from './DashboardMain'

interface Props {
	children: ReactNode
	modals: ReactNode
}

export default async function DashboardLayout({ children, modals }: Props) {
	await getServerAuth(true)

	const [profile, projectsList] = await Promise.all([
		getServerProfile(),
		getServerProjects(true)
	])

	return (
		<div className='grid h-screen grid-cols-[230px_1fr]'>
			<Sidebar
				profile={profile}
				projects={projectsList.data || []}
			/>

			<DashboardMain>{children}</DashboardMain>

			{modals}
		</div>
	)
}
