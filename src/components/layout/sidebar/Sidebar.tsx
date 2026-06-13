'use client'

import { AnimateIcon } from '@/components/animate-ui/icons/icon'
import { LogOut } from '@/components/animate-ui/icons/log-out'
import { Button } from '@/components/ui/button'
import { PublicPages } from '@/config/public-pages'
import type { TProfileResponse } from '@/types/profile.types'
import type { TProjectsList } from '@/types/project/project.types'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { SidebarHeading } from './SidebarHeading'
import { SidebarMenu } from './SidebarMenu'
import { SidebarProfile } from './SidebarProfile'
import { SidebarProjects } from './SidebarProjects'

interface Props {
	profile: TProfileResponse
	projects: TProjectsList
}

export const Sidebar = ({ profile, projects }: Props) => {
	const router = useRouter()

	async function signOut() {
		const { error } = await createClient().auth.signOut()

		if (!error) {
			router.push(PublicPages.LOGIN)
		}
	}

	return (
		<aside className='bg-white p-4 dark:bg-neutral-800'>
			<div className='flex items-center justify-between'>
				<SidebarHeading title='Account' />

				<AnimateIcon animateOnHover>
					<Button
						variant='ghost'
						className='p-0! opacity-30 transition-opacity hover:opacity-100'
						onClick={signOut}
						aria-label='Sign out'
					>
						<LogOut />
					</Button>
				</AnimateIcon>
			</div>

			<SidebarProfile profile={profile} />

			<SidebarHeading title='Main Menu' />

			<SidebarMenu />

			<SidebarHeading title='Projects' />

			<SidebarProjects projects={projects} />
		</aside>
	)
}
