import { projectDelete } from '@/services/projects/project-client.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export function useProjectDelete() {
	const queryClient = useQueryClient()

	const { mutate: deleteProject, isPending: isDeleting } = useMutation({
		mutationFn: (id: string) => projectDelete(id),
		onSuccess: () => {
			toast.success('Project deleted successfully')

			queryClient.invalidateQueries({ queryKey: ['projects'] })
		},
		onError: error => {
			const message =
				error instanceof Error ? error.message : 'Failed to delete project'

			toast.error(message)
		}
	})

	return {
		deleteProject,
		isDeleting
	}
}
