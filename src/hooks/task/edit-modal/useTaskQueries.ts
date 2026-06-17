import {
	taskClientGetById,
	taskClientUpdate
} from '@/services/tasks/task-client.service'
import type { Database } from '@/types/db.types'
import type { ICON_MAP } from '@/utils/icon-map'
import type { TaskSchema } from '@/zod-schemes/task.zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import type { UseFormReset } from 'react-hook-form'
import { toast } from 'sonner'
import type z from 'zod'

interface Props {
	id: string
	reset: UseFormReset<z.infer<typeof TaskSchema>>
	closeModal: () => void
}

export function useTaskQueries({ id, reset, closeModal }: Props) {
	const { isSuccess, data } = useQuery({
		queryKey: ['task', id],
		queryFn: () => taskClientGetById(id),
		enabled: !!id
	})

	useEffect(() => {
		if (!data) {
			return
		}

		reset({
			title: data.title,
			due_date: new Date(data.due_date),
			icon: data.icon as keyof typeof ICON_MAP,
			participants: data.task_participants?.map(item => item.profiles.id) ?? []
		})
	}, [isSuccess])

	const { mutate, isPending } = useMutation({
		mutationKey: ['task', 'update', id],
		mutationFn: ({
			task,
			participants
		}: {
			task: Database['public']['Tables']['tasks']['Update']
			participants: string[]
		}) => taskClientUpdate(id, task, participants),
		onSuccess: () => {
			toast.success('Task updated successfully')
			closeModal()
		},
		onError: error => {
			toast.error('Failed to update task', {
				description: error as unknown as string
			})
		}
	})

	return {
		isPending,
		mutate,
		data
	}
}
