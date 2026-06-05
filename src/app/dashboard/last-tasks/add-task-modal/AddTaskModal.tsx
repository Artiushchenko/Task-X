import { AnimateIcon } from '@/components/animate-ui/icons/icon'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAddTask } from '@/hooks/task-add-modal/useAddTask'
import { TaskSchema } from '@/zod-schemes/task.zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm, type SubmitHandler } from 'react-hook-form'
import type z from 'zod'
import { TaskDateField } from '../../@modals/(.)task/[id]/edit/TaskDateField'
import { TaskIconChooseField } from '../../@modals/(.)task/[id]/edit/TaskIconChooseField'
import { TaskProjectSelect } from './TaskProjectSelect'

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
			project_id: undefined
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
			title: data.title,
			due_date: data.due_date.toISOString(),
			icon: data.icon,
			project_id: data.project_id
		})
	}

	return (
		<Dialog
			open={isOpenModal}
			onOpenChange={setIsOpenModal}
		>
			<AnimateIcon animateOnHover>
				<DialogTrigger asChild>
					<Button variant='outline'>Add task</Button>
				</DialogTrigger>
			</AnimateIcon>
			<DialogContent className='max-w-sm!'>
				<DialogHeader>
					<DialogTitle className='mb-4'>Create new task</DialogTitle>

					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='space-y-8'
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

							<Controller
								name='project_id'
								control={form.control}
								render={({ field }) => (
									<TaskProjectSelect
										value={field.value}
										onChange={field.onChange}
									/>
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
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}
