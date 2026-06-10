import { ProgressBar } from '@/components/ui/ProgressBar'
import { DashboardPages } from '@/config/dashboard-pages'
import type { ITopProject } from '@/types/insights.types'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface Props {
	projects: ITopProject[]
}

export function TopProjectsTable({ projects }: Props) {
	if (projects.length === 0) {
		return (
			<div className='bg-card rounded-2xl p-5'>
				<h2 className='mb-6 text-xl font-medium'>Tasks by Status</h2>

				<p className='text-muted-foreground text-sm'>
					No projects with tasks yet
				</p>
			</div>
		)
	}

	return (
		<div className='bg-card rounded-2xl p-5'>
			<h2 className='mb-5 text-xl font-medium'>
				Top Projects by Tasks ({projects.length})
			</h2>

			<div className='space-y-4'>
				{projects.map((project, index) => (
					<Link
						key={project.id}
						href={DashboardPages.PROJECT_DETAILS(project.slug)}
						className='group block'
					>
						<div className='hover:border-border hover:bg-muted/50 rounded-xl border border-transparent p-4 transition-all'>
							<div className='mb-3 flex items-center justify-between'>
								<div className='flex items-center gap-3'>
									<div className='bg-muted flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold'>
										#{index + 1}
									</div>

									<div>
										<h4 className='group-hover:text-primary text-sm font-semibold transition-colors'>
											{project.name}
										</h4>

										<p className='text-muted-foreground text-xs'>
											{project.completedTasks} / {project.totalTasks} tasks
										</p>
									</div>
								</div>

								<div className='flex items-center gap-3'>
									<span className='text-sm font-bold'>{project.progress}%</span>

									<ChevronRight className='text-muted-foreground h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100' />
								</div>
							</div>

							<ProgressBar progress={project.progress} />
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}
