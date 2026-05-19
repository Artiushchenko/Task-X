import { SidebarHeading } from './SidebarHeading'
import { SidebarMenu } from './SidebarMenu'
import { SidebarProfile } from './SidebarProfile'
import { SidebarProjects } from './SidebarProjects'

export function Sidebar() {
	return (
		<aside className='p-5 bg-white dark:bg-neutral-800'>
			<SidebarHeading title='Account' />
			<SidebarProfile />

			<SidebarHeading title='Main Menu' />
			<SidebarMenu />

			<SidebarHeading title='Projects' />
			<SidebarProjects />
		</aside>
	)
}
