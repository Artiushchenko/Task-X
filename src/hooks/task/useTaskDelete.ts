import { taskClientDelete } from '@/services/tasks/task-client.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export function useTaskDelete() {
	const queryClient = useQueryClient()

	const { mutate: deleteTask, isPending: isDeleting } = useMutation({
		mutationFn: (id: string) => taskClientDelete(id),
		onSuccess: () => {
			toast.success('Task deleted successfully')

			queryClient.invalidateQueries({ queryKey: ['tasks'] })
		},
		onError: error => {
			const message =
				error instanceof Error ? error.message : 'Failed to delete task'

			toast.error(message)
		}
	})

	return {
		deleteTask,
		isDeleting
	}
}
