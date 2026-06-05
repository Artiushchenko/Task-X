'use client'

import { AnimateIcon } from '@/components/animate-ui/icons/icon'
import { Plus } from '@/components/animate-ui/icons/plus'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { createSubTask } from '@/services/tasks/task-client.service'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

interface Props {
	taskId: string
}

export const SubTaskCreateModal = ({ taskId }: Props) => {
	const [title, setTitle] = useState('')
	const [isOpenModal, setIsOpenModal] = useState(false)

	const { mutate, isPending } = useMutation({
		mutationKey: ['addSubTask', taskId],
		mutationFn: () => createSubTask(taskId, { title }),
		onSuccess() {
			toast.success('Subtask created successfully')

			setTitle('')

			setIsOpenModal(false)
		},
		onError(error) {
			toast.error('Failed to add subtask', {
				id: 'subtask-add-error',
				description: error as unknown as string
			})
		}
	})

	const handleAdd = () => {
		if (!title.trim()) {
			toast.error('Title cannot be empty', {
				id: 'subtask-empty-title'
			})

			return
		}

		mutate()
	}

	return (
		<Dialog
			open={isOpenModal}
			onOpenChange={setIsOpenModal}
		>
			<AnimateIcon animateOnHover>
				<DialogTrigger className='bg-primary hover:bg-primary/90 rounded-full p-2 text-white transition-colors dark:text-neutral-800'>
					<Plus
						size={18}
						animateOnHover
					/>
				</DialogTrigger>
			</AnimateIcon>
			<DialogContent className='max-w-sm!'>
				<DialogHeader>
					<DialogTitle className='mb-4'>Create subtask</DialogTitle>
					<DialogDescription>
						<Input
							placeholder='Title'
							value={title}
							onChange={e => setTitle(e.target.value)}
							className='mb-4'
						/>

						<Button
							onClick={handleAdd}
							disabled={isPending}
						>
							{isPending ? 'Creating...' : 'Create'}
						</Button>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}
