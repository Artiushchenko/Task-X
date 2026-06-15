'use client'

import { AnimateIcon } from '@/components/animate-ui/icons/icon'
import { Plus } from '@/components/animate-ui/icons/plus'
import { DashboardPages } from '@/config/dashboard-pages'
import { getProjects } from '@/services/projects/project-client.service'
import type { TProjectsList } from '@/types/project/project.types'
import type { TRole } from '@/types/role.types'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ProjectModal } from './modal/ProjectModal'
import { ProjectListCard } from './ProjectListCard'

interface Props {
	projects: TProjectsList
	userRole: TRole | null
}

export function ProjectList({ projects, userRole }: Props) {
	const searchParams = useSearchParams()

	const editId = searchParams.get('edit')
	const isCreating = searchParams.get('create') === 'true'

	const { data } = useQuery({
		queryKey: ['projects'],
		queryFn: () => getProjects(),
		initialData: projects
	})

	return (
		<>
			<div className='grid grid-cols-4 gap-4'>
				{data?.map(project => (
					<ProjectListCard
						key={project.id}
						project={project}
						userRole={userRole}
					/>
				))}

				<AnimateIcon animateOnHover>
					<Link href={DashboardPages.PROJECT_CREATE}>
						<div className='border-muted-foreground/25 hover:border-primary hover:bg-muted/50 flex h-full min-h-50 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-6 transition-all'>
							<div className='bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full'>
								<Plus className='text-primary h-6 w-6' />
							</div>

							<p className='text-sm font-medium'>Create New Project</p>
						</div>
					</Link>
				</AnimateIcon>
			</div>

			{(isCreating || editId) && <ProjectModal id={editId || undefined} />}
		</>
	)
}
