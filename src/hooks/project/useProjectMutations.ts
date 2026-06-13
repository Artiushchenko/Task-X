import {
	getProjectById,
	projectCreate,
	projectUpdate
} from '@/services/projects/project-client.service'
import type { TFormProject } from '@/types/project/form.types'
import type {
	TProjectInsert,
	TProjectUpdate
} from '@/types/project/project.types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import type { UseFormReset } from 'react-hook-form'
import { toast } from 'sonner'

interface Props {
	id?: string
	reset: UseFormReset<TFormProject>
	closeModal: () => void
}

export function useProjectMutations({ id, reset, closeModal }: Props) {
	const queryClient = useQueryClient()

	const { data, isSuccess } = useQuery({
		queryKey: ['project', id],
		queryFn: async () => getProjectById(id),
		enabled: !!id
	})

	useEffect(() => {
		if (!data) {
			return
		}

		reset({
			name: data.name,
			color: data.color,
			slug: data.slug
		})
	}, [isSuccess, data, reset])

	const { mutate: createProject, isPending: isCreating } = useMutation({
		mutationFn: (data: TProjectInsert) => projectCreate(data),
		onSuccess: () => {
			toast.success('Project created successfully')

			queryClient.invalidateQueries({ queryKey: ['projects'] })

			closeModal()
		},
		onError: error => {
			const message =
				error instanceof Error ? error.message : 'Failed to create project'

			toast.error(message)
		}
	})

	const { mutate: updateProject, isPending: isUpdating } = useMutation({
		mutationFn: ({ id, data }: { id: string; data: TProjectUpdate }) =>
			projectUpdate(id, data),
		onSuccess: () => {
			toast.success('Project updated successfully')

			queryClient.invalidateQueries({ queryKey: ['projects'] })

			closeModal()
		},
		onError: error => {
			const message =
				error instanceof Error ? error.message : 'Failed to update project'

			toast.error(message)
		}
	})

	return {
		createProject,
		updateProject,
		isPending: isCreating || isUpdating
	}
}
