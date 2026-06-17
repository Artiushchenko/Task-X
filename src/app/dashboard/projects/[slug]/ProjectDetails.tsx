import { TaskList } from '@/components/elements/TaskList'
import { Heading } from '@/components/ui/Heading'
import type { TProjectWithSlug } from '@/types/project/project.types'
import type { TRole } from '@/types/role.types'

interface Props {
	project: TProjectWithSlug
	userRole: TRole | null
}

export function ProjectDetails({ project, userRole }: Props) {
	return (
		<div className='overflow-y-auto p-5'>
			<Heading>{project.name}</Heading>

			<div className='mt-5'>
				<TaskList
					tasks={project.tasks}
					userRole={userRole}
				/>
			</div>
		</div>
	)
}
