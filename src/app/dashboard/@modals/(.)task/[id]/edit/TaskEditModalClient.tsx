'use client'

import { TASKS } from '@/app/dashboard/data/last-tasks.data'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import type { TTaskFormData } from '@/types/task.types'
import { ICON_MAP, ICON_NAMES } from '@/utils/icon-map'
import { TaskSchema } from '@/zod-schemes/task.zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

interface Props {
	id: string
}

export function TaskEditModalClient({ id }: Props) {
	const router = useRouter()

	const closeModal = () => {
		router.back()
	}

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				closeModal()
			}
		}

		document.addEventListener('keydown', handleEscape)

		return () => document.removeEventListener('keydown', handleEscape)
	}, [])

	useEffect(() => {
		form.reset(TASKS.find(task => task.id === id) || {})
	}, [id])

	const form = useForm<TTaskFormData>({
		resolver: zodResolver(TaskSchema)
	})

	const onSubmit = (data: TTaskFormData) => {
		// TODO: Add Sonner
		// TODO: Add state manager
	}

	return (
		<div
			className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
			onClick={closeModal}
		>
			<div
				className='mx-4 max-h-[90vh] w-full max-w-sm overflow-y-auto rounded-lg bg-white p-6 dark:bg-neutral-800'
				onClick={e => e.stopPropagation()}
			>
				<div>
					<h2 className='mb-4 text-xl font-bold'>Edit Task {id}</h2>

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
								control={form.control}
								name='dueDate'
								render={({ field: { onChange, value } }) => (
									<FormItem>
										<FormLabel>Due Date</FormLabel>
										<FormControl>
											<Popover>
												<PopoverTrigger asChild>
													<Button
														variant='outline'
														data-empty={!value}
														className='data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal'
													>
														<CalendarIcon />
														{value ? (
															format(value, 'PPP')
														) : (
															<span>Pick a date</span>
														)}
													</Button>
												</PopoverTrigger>
												<PopoverContent className='w-auto p-0'>
													<Calendar
														mode='single'
														selected={value}
														onSelect={onChange}
													/>
												</PopoverContent>
											</Popover>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Controller
								control={form.control}
								name='icon'
								render={({ field: { onChange, value } }) => (
									<FormItem>
										<FormLabel>Icon</FormLabel>
										<FormControl>
											<div className='flex flex-wrap gap-2'>
												{ICON_NAMES.map(name => {
													const Icon = ICON_MAP[name]

													return (
														<Button
															type='button'
															key={name}
															variant={value === name ? 'default' : 'outline'}
															onClick={() => onChange(name)}
															className='h-10 w-10 p-0'
														>
															<Icon size={18} />
														</Button>
													)
												})}
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button type='submit'>Save</Button>
						</form>
					</Form>
				</div>
			</div>
		</div>
	)
}
