import { taskClientCreate } from '@/services/tasks/task-client.service'
import type { ICreateTaskWithParticipants } from '@/types/task.types'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

interface Props {
	closeModal: () => void
}

export function useAddTask({ closeModal }: Props) {
	const { mutate, isPending } = useMutation({
		mutationKey: ['task', 'create'],
		mutationFn: (data: ICreateTaskWithParticipants) => taskClientCreate(data),
		onSuccess: () => {
			toast.success('Task created successfully')
			closeModal()
		},
		onError: error => {
			toast.error('Failed to create task', {
				description: error as unknown as string
			})
		}
	})

	return {
		mutate,
		isPending
	}
}
