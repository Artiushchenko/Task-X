import { DashboardPages } from '@/config/dashboard-pages'
import type { TProjectsList } from '@/types/project.types'
import { cn } from '@/utils'
import Link from 'next/link'

interface Props {
	projects: TProjectsList
}

export function SidebarProjects({ projects }: Props) {
	if (!projects?.length) {
		return null
	}

	return (
		<div>
			<ul className='mt-2.5 space-y-3 pl-4'>
				{projects.map(project => (
					<li key={project.name}>
						<Link
							href={DashboardPages.PROJECT_DETAILS(project.slug)}
							className='flex items-center gap-2'
						>
							<div className={cn(project.color, 'h-3 w-3')} />

							<span className='text-neutral-500 dark:text-white'>
								{project.name}
							</span>
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
