import { DashboardPages } from '@/config/dashboard-pages'
import type { TProjectsList } from '@/types/project/project.types'
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
							className='group flex items-center gap-2'
						>
							<div
								style={{
									backgroundColor: project.color || '#737373'
								}}
								className='h-3 w-3 transition-all duration-450 ease-in-out group-hover:rounded-md'
							/>

							<span className='text-neutral-500 group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-white'>
								{project.name}
							</span>
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
