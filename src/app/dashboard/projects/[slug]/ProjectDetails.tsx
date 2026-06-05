import { TaskList } from '@/components/elements/TaskList'
import { Heading } from '@/components/ui/Heading'
import type { TProjectWithSlug } from '@/types/project.types'

interface Props {
	project: TProjectWithSlug
}

export function ProjectDetails({ project }: Props) {
	return (
		<div className='overflow-y-auto p-5'>
			<Heading>{project.name}</Heading>

			<div className='mt-5'>
				<TaskList tasks={project.tasks} />
			</div>
		</div>
	)
}
