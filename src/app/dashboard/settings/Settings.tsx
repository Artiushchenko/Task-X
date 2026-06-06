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
import { Heading } from '@/components/ui/Heading'
import { Input } from '@/components/ui/input'
import { useSettingsQueries } from '@/hooks/useSettingsQueries'
import type { TProfileResponse } from '@/types/profile.types'
import { ProfileSchema } from '@/zod-schemes/profile.zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import type z from 'zod'

interface Props {
	profile: TProfileResponse
}

export function Settings({ profile }: Props) {
	const form = useForm<z.infer<typeof ProfileSchema>>({
		resolver: zodResolver(ProfileSchema),
		defaultValues: {
			name: profile?.name || '',
			avatar_path: profile?.avatar_path || ''
		}
	})

	const { mutate, isPending } = useSettingsQueries()

	const onSubmit: SubmitHandler<z.infer<typeof ProfileSchema>> = data => {
		mutate({
			...data,
			id: profile.id
		})
	}

	return (
		<div className='max-w-xl p-5'>
			<Heading className='mb-6'>Settings</Heading>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-8'
				>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
										placeholder='Enter name'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Upload avatar path */}

					<Button
						type='submit'
						disabled={isPending}
					>
						{isPending ? 'Updating...' : 'Save'}
					</Button>
				</form>
			</Form>
		</div>
	)
}
