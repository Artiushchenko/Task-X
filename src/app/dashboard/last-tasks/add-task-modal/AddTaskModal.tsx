import { AnimateIcon } from '@/components/animate-ui/icons/icon'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Modal } from '@/components/ui/modal'
import { useAddTask } from '@/hooks/useAddTask'
import { TaskSchema } from '@/zod-schemes/task.zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import type z from 'zod'
import { TaskDateField } from '../../@modals/(.)task/[id]/edit/TaskDateField'
import { TaskIconChooseField } from '../../@modals/(.)task/[id]/edit/TaskIconChooseField'
import { SelectTaskParticipants } from './SelectTaskParticipants'
import { SelectTaskProject } from './SelectTaskProject'

interface Props {
	refetch: () => void
}

export function AddTaskModal({ refetch }: Props) {
	const [isOpenModal, setIsOpenModal] = useState(false)

	const form = useForm<z.infer<typeof TaskSchema>>({
		resolver: zodResolver(TaskSchema),
		defaultValues: {
			title: '',
			due_date: undefined,
			icon: undefined,
			project_id: undefined,
			participants: []
		}
	})

	const { isPending, mutate } = useAddTask({
		closeModal: () => {
			setIsOpenModal(false)
			form.reset()
			refetch()
		}
	})

	const onSubmit: SubmitHandler<z.infer<typeof TaskSchema>> = data => {
		mutate({
			task: {
				title: data.title,
				due_date: data.due_date.toISOString(),
				icon: data.icon,
				project_id: data.project_id
			},
			participants: data.participants || []
		})
	}

	const handleOpenChange = (open: boolean) => {
		setIsOpenModal(open)

		if (!open) {
			form.reset()
		}
	}

	return (
		<Dialog
			open={isOpenModal}
			onOpenChange={handleOpenChange}
		>
			<AnimateIcon animateOnHover>
				<DialogTrigger asChild>
					<Button variant='outline'>Add task</Button>
				</DialogTrigger>
			</AnimateIcon>

			<Modal
				title='Create task'
				description='Fill in the details to create a new task'
			>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-6'
					>
						<FormField
							control={form.control}
							name='title'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input
											placeholder='Enter task title'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='project_id'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Project</FormLabel>

									<FormControl>
										<SelectTaskProject
											value={field.value}
											onChange={field.onChange}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='participants'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Participants</FormLabel>

									<FormControl>
										<SelectTaskParticipants
											value={field.value}
											onChange={field.onChange}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						<TaskDateField control={form.control} />

						<TaskIconChooseField control={form.control} />

						<Button
							type='submit'
							disabled={isPending}
						>
							{isPending ? 'Creating...' : 'Add'}
						</Button>
					</form>
				</Form>
			</Modal>
		</Dialog>
	)
}
