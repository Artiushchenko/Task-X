import { cn } from '@/utils'
import { PROJECTS } from './data/projects.data'

export function SidebarProjects() {
	return (
		<div>
			<ul className='mt-2.5 space-y-3 pl-4'>
				{PROJECTS.map(project => (
					<li
						key={project.name}
						className='flex items-center gap-2'
					>
						<div className={cn(project.color, 'h-3 w-3')} />
						<span className='text-neutral-500 dark:text-white'>
							{project.name}
						</span>
					</li>
				))}
			</ul>
		</div>
	)
}
