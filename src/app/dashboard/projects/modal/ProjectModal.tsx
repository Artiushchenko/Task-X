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
import { useProjectMutations } from '@/hooks/project/useProjectMutations'
import { useModalClose } from '@/hooks/task/edit-modal/useModalClose'
import type { TFormProject } from '@/types/project/form.types'
import { generateSlug } from '@/utils/generate-slug'
import { ProjectSchema } from '@/zod-schemes/project.zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { ProjectColorField } from './ProjectColorField'

interface Props {
	id: string | undefined
}

export function ProjectModal({ id }: Props) {
	const { closeModal } = useModalClose()

	const form = useForm<TFormProject>({
		resolver: zodResolver(ProjectSchema),
		defaultValues: {
			name: '',
			slug: '',
			color: null
		}
	})

	const { isPending, createProject, updateProject } = useProjectMutations({
		id,
		reset: form.reset,
		closeModal
	})

	const isEditingMode = !!id

	const onSubmit: SubmitHandler<TFormProject> = data => {
		if (isEditingMode) {
			updateProject({ id, data })
		} else {
			createProject(data)
		}
	}

	const handleNameChange = (name: string) => {
		if (!isEditingMode) {
			const slug = generateSlug(name)

			form.setValue('slug', slug)
		}
	}

	return (
		<div
			className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
			onClick={closeModal}
		>
			<div
				className='mx-4 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg bg-white p-6 dark:bg-neutral-800'
				onClick={e => e.stopPropagation()}
			>
				<div>
					<h2 className='mb-4 text-xl font-bold'>
						{isEditingMode ? 'Edit Project' : 'Create New Project'}
					</h2>

					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='space-y-6'
						>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												placeholder='My Awesome Project'
												{...field}
												onChange={e => {
													field.onChange(e)
													handleNameChange(e.target.value)
												}}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='slug'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Slug</FormLabel>
										<FormControl>
											<Input
												placeholder='my-awesome-project'
												{...field}
												disabled={isEditingMode}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<ProjectColorField control={form.control} />

							<div className='flex justify-end gap-2'>
								<Button
									type='button'
									variant='outline'
									onClick={closeModal}
									disabled={isPending}
								>
									Cancel
								</Button>

								<Button
									type='submit'
									disabled={isPending}
								>
									{isPending
										? isEditingMode
											? 'Updating...'
											: 'Creating...'
										: isEditingMode
											? 'Update'
											: 'Create'}
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</div>
	)
}
