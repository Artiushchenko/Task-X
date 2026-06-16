'use client'

import { Button } from '@/components/ui/button'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { useModalClose } from '@/hooks/task-edit-modal/useModalClose'
import { useTaskQueries } from '@/hooks/task-edit-modal/useTaskQueries'
import { TaskSchema } from '@/zod-schemes/task.zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { SelectTaskParticipants } from '@/app/dashboard/last-tasks/add-task-modal/SelectTaskParticipants'
import { Dialog } from '@/components/ui/dialog'
import { Modal } from '@/components/ui/modal'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { TaskDateField } from './TaskDateField'
import { TaskIconChooseField } from './TaskIconChooseField'

interface Props {
	id: string
}

export const TaskEditModalClient = ({ id }: Props) => {
	const { closeModal } = useModalClose()

	const form = useForm<z.infer<typeof TaskSchema>>({
		resolver: zodResolver(TaskSchema),
		defaultValues: {
			title: '',
			due_date: undefined,
			icon: undefined,
			participants: []
		}
	})

	const { isPending, mutate, data } = useTaskQueries({
		id,
		reset: form.reset,
		closeModal
	})

	const onSubmit: SubmitHandler<z.infer<typeof TaskSchema>> = data => {
		mutate({
			task: {
				title: data.title,
				due_date: data.due_date.toISOString(),
				icon: data.icon
			},
			participants: data.participants ?? []
		})
	}

	return (
		<Dialog
			open
			onOpenChange={open => {
				if (!open) closeModal()
			}}
		>
			<Modal
				title='Edit task'
				description={`Update the selected task "${data?.title}"`}
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
							{isPending ? 'Updating...' : 'Save'}
						</Button>
					</form>
				</Form>
			</Modal>
		</Dialog>
	)
}
