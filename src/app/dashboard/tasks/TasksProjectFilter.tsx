import { cn } from '@/utils'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import type { TProjectsList } from '@/types/project/project.types'

interface Props {
	projects: TProjectsList
	currentProjectId: string | null
	setCurrentProjectId: (projectId: string | null) => void
}

export const TasksProjectFilter = ({
	projects,
	currentProjectId,
	setCurrentProjectId
}: Props) => {
	if (!projects || projects.length === 0) {
		return null
	}

	const currentProjectName =
		projects?.find(p => p.id === currentProjectId)?.name || 'All projects'

	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant='outline'
						className='capitalize'
					>
						{currentProjectName}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					{[{ id: 'all', name: 'All' }, ...projects].map(project => (
						<DropdownMenuItem
							key={project.id}
							onSelect={() =>
								setCurrentProjectId(project.id === 'all' ? null : project.id)
							}
							className={cn(
								currentProjectId === project.id ? 'font-bold' : '',
								'cursor-pointer capitalize'
							)}
						>
							{project.name}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
