import { TaskEditModalClient } from './TaskEditModalClient'

interface Props {
	params: Promise<{ id: string }>
}

export default async function TaskEditModal({ params }: Props) {
	const { id } = await params

	return <TaskEditModalClient id={id} />
}
